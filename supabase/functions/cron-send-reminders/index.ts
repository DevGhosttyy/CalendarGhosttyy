import { serve } from 'https://deno.land/std@0.192.0/http/server.ts';
serve((_req) => new Response('ok'));
