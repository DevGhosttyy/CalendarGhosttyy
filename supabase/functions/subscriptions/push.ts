import { serve } from 'https://deno.land/std@0.192.0/http/server.ts';
serve(async (req) => {
  // TODO: store push subscription per user
  return new Response('ok');
});
