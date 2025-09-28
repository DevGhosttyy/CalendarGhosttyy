import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
export function sb() {
  const url = Deno.env.get('SUPABASE_URL')!;
  const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const client = createClient(url, key, { auth: { persistSession: false } });
  return { client };
}
