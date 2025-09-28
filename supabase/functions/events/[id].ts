import { serve } from 'https://deno.land/std@0.192.0/http/server.ts';
import { sb } from '../_shared/db.ts';

serve(async (req) => {
  const { client } = sb();
  const url = new URL(req.url);
  const id = url.pathname.split('/').pop()!;

  if (req.method === 'GET') {
    const { data, error } = await client.from('events').select('*').eq('id', id).single();
    if (error) return new Response(error.message, { status: 500 });
    return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
  }
  if (req.method === 'PATCH') {
    const body = await req.json();
    const { data, error } = await client.from('events').update(body).eq('id', id).select().single();
    if (error) return new Response(error.message, { status: 500 });
    return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
  }
  if (req.method === 'DELETE') {
    const { error } = await client.from('events').delete().eq('id', id);
    if (error) return new Response(error.message, { status: 500 });
    return new Response('ok');
  }
  return new Response('Method not allowed', { status: 405 });
});
