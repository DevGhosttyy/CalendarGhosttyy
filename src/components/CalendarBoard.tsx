import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import rrulePlugin from '@fullcalendar/rrule';
import { useEvents } from '@/hooks/useEvents';

export default function CalendarBoard() {
  const { events, setRange } = useEvents();
  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin, rrulePlugin]}
      initialView="timeGridWeek"
      headerToolbar={false}
      events={events}
      datesSet={(arg) => setRange({ start: arg.start, end: arg.end })}
      editable
      selectable
      slotLabelFormat={{ hour: '2-digit', minute: '2-digit', hour12: false }}
      firstDay={1}
      weekNumbers={true}
      locale="es"
    />
  );
}
