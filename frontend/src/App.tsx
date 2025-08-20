import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';
import RoleRoute from './routes/RoleRoute';
import DashboardRedirect from './pages/DashboardRedirect';
import DashboardLayout from './components/DashboardLayout';

// Customer pages
import CustomerDashboard from './pages/customer/CustomerDashboard';
import CustomerOrders from './pages/customer/CustomerOrders';
import CustomerHotspots from './pages/customer/CustomerHotspots';
import CustomerProfile from './pages/customer/CustomerProfile';

// Vendor pages
import VendorDashboard from './pages/vendor/VendorDashboard';
import VendorOrders from './pages/vendor/VendorOrders';
import VendorHotspots from './pages/vendor/VendorHotspots';
import VendorProfile from './pages/vendor/VendorProfile';

// Admin pages (later)
// import AdminDashboard from './pages/admin/AdminDashboard';
// import AdminUsers from './pages/admin/Users';

// Auth pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import Homepage from './pages/Homepage';
import NotFound from './pages/NotFound';


function CustomerShell() {
  const menu = [
    { to: '/dashboard/customer', label: 'Overview' },
    { to: '/dashboard/customer/orders', label: 'My Orders' },
    { to: '/customer/hotspots', label: 'Hotspots' },
    { to: '/customer/profile', label: 'Profile' },
  ];
  return <DashboardLayout menu={menu} />;
}

function VendorShell() {
  const menu = [
    { to: '/dashboard/vendor', label: 'Overview' },
    { to: '/dashboard/vendor/orders', label: 'Orders' },
    { to: '/dashboard/vendor/hotspots', label: 'Hotspots' },
    { to: '/vendor/profile', label: 'Profile' },
  ];
  return <DashboardLayout menu={menu} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />

        {/* Private */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardRedirect />} />

          {/* Customer routes */}
          <Route element={<RoleRoute allow={['customer']} />}>
            <Route element={<CustomerShell />}>
              <Route path="/dashboard/customer" element={<CustomerDashboard />} />
              <Route path="/dashboard/customer/orders" element={<CustomerOrders />} />
              <Route path="/customer/profile" element={<CustomerProfile />} />
              <Route path="/customer/hotspots" element={<CustomerHotspots />} />
            </Route>
          </Route>

          {/* Vendor routes */}
          <Route element={<RoleRoute allow={['vendor']} />}>
            <Route element={<VendorShell />}>
              <Route path="/dashboard/vendor" element={<VendorDashboard />} />
              <Route path="/dashboard/vendor/orders" element={<VendorOrders />} />
              <Route path="/dashboard/vendor/hotspots" element={<VendorHotspots />} />
              <Route path="/vendor/profile" element={<VendorProfile />} />
            </Route>
          </Route>

          {/* Admin routes (later) */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
