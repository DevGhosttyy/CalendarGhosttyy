import { serve } from 'https://deno.land/std@0.192.0/http/server.ts';
import { sb } from '../_shared/db.ts';

serve(async (req) => {
  // TODO: parse .ics from multipart and insert events
  return new Response('not-implemented');
});
