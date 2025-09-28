import { z } from 'zod';
export const eventSchema = z.object({
  id: z.string().uuid().optional(),
  calendar_id: z.string().uuid(),
  title: z.string().min(1),
  description: z.string().optional(),
  location: z.string().optional(),
  start: z.coerce.date(),
  end: z.coerce.date(),
  all_day: z.boolean().default(false),
  timezone: z.string().default('Europe/Madrid'),
  rrule: z.string().optional(),
  exdates: z.array(z.string()).optional(),
  attendees: z.array(z.string().email()).optional(),
  color: z.string().optional(),
  visibility: z.enum(['public','private']).default('private'),
  reminders: z.array(z.number().int().nonnegative()).default([]),
});
export default function EventDialog(){ return null; }
