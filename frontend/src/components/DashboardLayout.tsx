import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Home, User, ShoppingCart, MapPin, LogOut, Settings } from 'lucide-react';

export default function DashboardLayout({ menu }: { menu: Array<{ to: string; label: string }> }) {
  const { user, logout } = useAuth();

  const getIcon = (label: string) => {
    switch (label.toLowerCase()) {
      case 'overview':
        return <Home size={20} />;
      case 'my orders':
        return <ShoppingCart size={20} />;
      case 'orders':
        return <ShoppingCart size={20} />;
      case 'hotspots':
        return <MapPin size={20} />;
      case 'profile':
        return <User size={20} />;
      default:
        return <Settings size={20} />;
    }
  };

  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <div className="mb-8">
          <Link to="/" className="text-2xl font-bold text-primary">
            Saapaadu
          </Link>
          <p className="text-sm text-gray-500 mt-2">Food Redistribution Platform</p>
        </div>

        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-500 mb-1">Signed in as</div>
          <div className="font-medium text-dark">{user?.email}</div>
          <div className="text-xs uppercase tracking-wide text-gray-500 mt-1">
            {user?.role}
          </div>
        </div>

        <nav className="dashboard-nav">
          {menu.map((m) => (
            <NavLink
              key={m.to}
              to={m.to}
              className={({ isActive }) =>
                `dashboard-nav-item ${isActive ? 'active' : ''}`
              }
            >
              {getIcon(m.label)}
              {m.label}
            </NavLink>
          ))}
          
          <button 
            onClick={logout} 
            className="dashboard-nav-item text-red-600 hover:text-red-700 hover:bg-red-50 mt-4"
          >
            <LogOut size={20} />
            Logout
          </button>
        </nav>
      </aside>

      <main className="dashboard-main">
        <Outlet />
      </main>
    </div>
  );
}
