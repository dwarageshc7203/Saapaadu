import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function DashboardLayout({ menu }: { menu: Array<{ to: string; label: string }> }) {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen grid grid-cols-[240px_1fr]">
      <aside className="border-r p-4">
        <Link to="/" className="font-bold text-xl block mb-6">Saapaadu</Link>
        <div className="text-sm text-gray-500 mb-2">Signed in as</div>
        <div className="mb-6">
          <div className="font-medium">{user?.email}</div>
          <div className="text-xs uppercase tracking-wide text-gray-500">{user?.role}</div>
        </div>
        <nav className="flex flex-col gap-2">
          {menu.map((m) => (
            <NavLink
              key={m.to}
              to={m.to}
              className={({ isActive }) =>
                `px-3 py-2 rounded-md ${isActive ? 'bg-gray-200' : 'hover:bg-gray-100'}`
              }
            >
              {m.label}
            </NavLink>
          ))}
          <button onClick={logout} className="mt-4 text-left px-3 py-2 rounded-md hover:bg-gray-100">Logout</button>
        </nav>
      </aside>

      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
