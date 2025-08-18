import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';
import RoleRoute from './routes/RoleRoute';
import DashboardRedirect from './pages/DashboardRedirect';
import DashboardLayout from './components/DashboardLayout';

// Customer pages
import CustomerDashboard from './pages/customer/CustomerDashboard';
import CustomerOrders from './pages/customer/CustomerOrders';

// Vendor pages
import VendorDashboard from './pages/vendor/VendorDashboard';
import VendorOrders from './pages/vendor/VendorOrders';

// Admin pages
//import AdminDashboard from './pages/admin/AdminDashboard';
//import AdminUsers from './pages/admin/Users';

// Auth pages (yours)
import Login from './pages/Login';
import Signup from './pages/Signup';
import CustomerMap from './pages/customer/CustomerMap';
import VendorHotspots from './pages/vendor/VendorHotspots';

function CustomerShell() {
  const menu = [
    { to: '/dashboard/customer', label: 'Overview' },
    { to: '/dashboard/customer/orders', label: 'My Orders' },
    { to: '/dashboard/customer/map', label: 'Map' },
  ];
  return <DashboardLayout menu={menu} />;
}


function VendorShell() {
  const menu = [
    { to: '/dashboard/vendor', label: 'Overview' },
    { to: '/dashboard/vendor/orders', label: 'Orders' },
  ];
  return <DashboardLayout menu={menu} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Private */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardRedirect />} />

          {/* Customer routes */}
          <Route element={<RoleRoute allow={['customer']} />}>
            <Route element={<CustomerShell />}>
              <Route path="/dashboard/customer" element={<CustomerDashboard />} />
              <Route path="/dashboard/customer/orders" element={<CustomerOrders />} />
              <Route path="/dashboard/customer/map" element={<CustomerMap />} />
            </Route>
          </Route>

          {/* Vendor routes */}
          <Route element={<RoleRoute allow={['vendor']} />}>
            <Route element={<VendorShell />}>
              <Route path="/dashboard/vendor" element={<VendorDashboard />} />
              <Route path="/dashboard/vendor/orders" element={<VendorOrders />} />
              <Route path="/dashboard/vendor" element={<VendorHotspots />} />
            </Route>
          </Route>

          {/* Admin routes */}
        </Route>

        {/* Default */}
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
