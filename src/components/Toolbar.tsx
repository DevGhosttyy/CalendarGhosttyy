import { Link } from 'react-router-dom';
export default function Toolbar() {
  return (
    <div className="flex items-center justify-between p-3 border-b">
      <div className="flex gap-2 items-center">
        <button className="px-3 py-1 rounded border">Hoy</button>
        <div className="flex gap-1">
          <button className="px-2 py-1 rounded border">&lt;</button>
          <button className="px-2 py-1 rounded border">&gt;</button>
        </div>
      </div>
      <div className="flex gap-3 items-center">
        <input placeholder="Buscar..." className="px-2 py-1 border rounded" />
        <Link to="/settings" className="px-3 py-1 border rounded">Ajustes</Link>
      </div>
    </div>
  );
}
