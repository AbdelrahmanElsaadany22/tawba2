import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import Stripe from 'https://esm.sh/stripe@13.3.0?target=deno';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
      apiVersion: '2023-10-16',
      httpClient: Stripe.createFetchHttpClient(),
    });

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) throw new Error('Missing authorization header');

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) throw new Error('Invalid session');

    const { planId, preferredTimes } = await req.json();
    if (!planId) throw new Error('planId is required');

    const { data: plan, error: planError } = await supabase
      .from('plans')
      .select('*')
      .eq('id', planId)
      .eq('is_active', true)
      .single();

    if (planError || !plan) throw new Error('Plan not found or inactive');

    const categoryLabel = plan.category === 'quarterly' ? '3 أشهر' : 'شهري';
    const planName = `أكاديمية توبة — ${plan.sessions_per_month} حصة/شهر × ${plan.duration_minutes} دقيقة (${categoryLabel})`;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'sar',
          product_data: { name: planName },
          unit_amount: Math.round(plan.discounted_price * 100),
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/dashboard?payment=success`,
      cancel_url: `${req.headers.get('origin')}/#plans`,
      metadata: {
        planId: plan.id,
        userId: user.id,
        category: plan.category,
        sessionsPerMonth: String(plan.sessions_per_month),
        durationMinutes: String(plan.duration_minutes),
        preferredTimes: JSON.stringify(preferredTimes ?? []),
      },
    });

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (err) {
    console.error('create-checkout-session error:', err.message);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
