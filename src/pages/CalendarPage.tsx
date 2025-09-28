import Toolbar from '@/components/Toolbar';
import CalendarSidebar from '@/components/CalendarSidebar';
import CalendarBoard from '@/components/CalendarBoard';

export default function CalendarPage(){
  return (
    <div className="h-full flex flex-col">
      <Toolbar />
      <div className="flex flex-1 min-h-0">
        <CalendarSidebar />
        <main className="flex-1 min-h-0">
          <CalendarBoard />
        </main>
      </div>
    </div>
  );
}
