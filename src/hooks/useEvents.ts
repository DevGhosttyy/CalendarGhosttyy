import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api';
import { expandRecurrences } from '@/lib/rrule';

export function useEvents(){
  const [range, setRange] = useState<{start: Date; end: Date} | null>(null);
  const eventsQuery = useQuery({
    queryKey: ['events', range],
    queryFn: async () => {
      if(!range) return [];
      const data = await apiFetch(`/events?from=${range.start.toISOString()}&to=${range.end.toISOString()}`);
      return expandRecurrences(data);
    },
    enabled: !!range
  });
  return { events: eventsQuery.data ?? [], setRange };
}
