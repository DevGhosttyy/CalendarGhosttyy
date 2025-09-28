export default function CalendarSidebar() {
  return (
    <aside className="w-64 border-r p-3 hidden md:block">
      <h2 className="font-semibold mb-2">Calendarios</h2>
      <ul className="space-y-2">
        <li className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-sky-500 inline-block" /> Personal</li>
      </ul>
    </aside>
  );
}
