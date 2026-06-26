import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import Stripe from 'https://esm.sh/stripe@13.3.0?target=deno';

serve(async (req) => {
  const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
    apiVersion: '2023-10-16',
    httpClient: Stripe.createFetchHttpClient(),
  });

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return new Response('Missing stripe-signature header', { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEventAsync
      ? await stripe.webhooks.constructEventAsync(body, signature, Deno.env.get('STRIPE_WEBHOOK_SECRET')!)
      : stripe.webhooks.constructEvent(body, signature, Deno.env.get('STRIPE_WEBHOOK_SECRET')!);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const meta = session.metadata!;

    const sessionsPerMonth = parseInt(meta.sessionsPerMonth);
    const category = meta.category;

    const startDate = new Date();
    const endDate = new Date(startDate);
    if (category === 'quarterly') {
      endDate.setMonth(endDate.getMonth() + 3);
    } else {
      endDate.setMonth(endDate.getMonth() + 1);
    }

    const totalSessions = category === 'quarterly'
      ? sessionsPerMonth * 3
      : sessionsPerMonth;

    const { error } = await supabase.from('subscriptions').insert({
      student_id:          meta.userId,
      plan_id:             meta.planId,
      status:              'active',
      start_date:          startDate.toISOString().split('T')[0],
      end_date:            endDate.toISOString().split('T')[0],
      sessions_remaining:  totalSessions,
      total_sessions:      totalSessions,
      stripe_payment_id:   session.payment_intent as string,
      preferred_times:     JSON.parse(meta.preferredTimes ?? '[]'),
    });

    if (error) {
      console.error('Failed to create subscription:', error.message);
      return new Response('DB insert failed', { status: 500 });
    }

    console.log(`Subscription created for user ${meta.userId}, plan ${meta.planId}`);
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
});
