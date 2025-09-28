import { serve } from 'https://deno.land/std@0.192.0/http/server.ts';
import { RRuleSet, rrulestr } from 'https://esm.sh/rrule@2';
import { sb } from '../_shared/db.ts';

serve(async (req) => {
  const u = new URL(req.url);
  const from = u.searchParams.get('from')!;
  const to = u.searchParams.get('to')!;
  const calendarId = u.searchParams.get('calendar_id');
  const { client } = sb();

  let q = client.from('events').select('*').gte('start', from).lte('end', to);
  if (calendarId) q = q.eq('calendar_id', calendarId);
  const { data, error } = await q;
  if (error) return new Response(error.message, { status: 500 });

  const expanded: any[] = [];
  for (const ev of data ?? []) {
    if (!ev.rrule) { expanded.push(ev); continue; }
    const set = new RRuleSet();
    set.rrule(rrulestr(ev.rrule));
    for (const d of (ev.exdates || [])) set.exdate(new Date(d));
    const between = set.between(new Date(from), new Date(to), true);
    const dur = new Date(ev.end).getTime() - new Date(ev.start).getTime();
    for (const dt of between) expanded.push({ ...ev, start: dt, end: new Date(dt.getTime() + dur) });
  }
  return new Response(JSON.stringify(expanded.length ? expanded : data), { headers: { 'Content-Type': 'application/json' } });
});
