import { supabase } from '../lib/supabaseClient';

export const useCheckout = () => {
  const startCheckout = async (planId, preferredTimes = []) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      window.location.href = '/login';
      return;
    }

    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-checkout-session`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ planId, preferredTimes }),
      }
    );

    const { url, error } = await response.json();
    if (error) {
      console.error('Checkout error:', error);
      return { error };
    }

    window.location.href = url;
  };

  return { startCheckout };
};
