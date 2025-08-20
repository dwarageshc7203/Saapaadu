// src/pages/vendor/VendorDashboard.tsx
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/api/axios";
import { MapPin, ShoppingCart, TrendingUp, Package, Clock, DollarSign, AlertCircle } from "lucide-react";
import type { Order, Hotspot } from "@/types";

interface VendorStats {
  totalHotspots: number;
  activeHotspots: number;
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  pendingOrders: number;
}

export default function VendorDashboard() {
  const { user: _user } = useAuth();
  const [stats, setStats] = useState<VendorStats>({
    totalHotspots: 0,
    activeHotspots: 0,
    totalOrders: 0,
    totalRevenue: 0,
    averageOrderValue: 0,
    pendingOrders: 0,
  });
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [recentHotspots, setRecentHotspots] = useState<Hotspot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Load vendor's hotspots
      const hotspotsResponse = await api.get("/hotspots/my");
      const hotspots = hotspotsResponse.data;
      
      // Load vendor's orders
      const ordersResponse = await api.get("/orders/vendor/my");
      const orders = ordersResponse.data;
      
      // Calculate stats from live data
      const totalHotspots = hotspots.length;
      const activeHotspots = hotspots.filter((h: Hotspot) => h.mealCount > 0).length;
      const totalOrders = orders.length;
      const totalRevenue = orders.reduce((sum: number, order: Order) => sum + (order.totalPrice || 0), 0);
      const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
      const pendingOrders = orders.filter((order: Order) => order.status === 'pending').length;
      
      setStats({
        totalHotspots,
        activeHotspots,
        totalOrders,
        totalRevenue,
        averageOrderValue: Math.round(averageOrderValue * 100) / 100,
        pendingOrders,
      });
      
      setRecentOrders(orders.slice(0, 5));
      setRecentHotspots(hotspots.slice(0, 3));
    } catch (err: any) {
      setError("Failed to load dashboard data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card bg-red-50 border-red-200">
        <div className="card-body">
          <p className="text-red-600 text-center">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark mb-2">Welcome back, {_user?.email}!</h1>
        <p className="text-gray-600">Here's your business overview and performance metrics.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <div className="card-body text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-dark mb-1">{stats.totalHotspots}</h3>
            <p className="text-gray-600">Total Hotspots</p>
          </div>
        </div>

        <div className="card">
          <div className="card-body text-center">
            <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="text-2xl font-bold text-dark mb-1">{stats.totalOrders}</h3>
            <p className="text-gray-600">Total Orders</p>
          </div>
        </div>

        <div className="card">
          <div className="card-body text-center">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-2xl font-bold text-dark mb-1">₹{stats.totalRevenue}</h3>
            <p className="text-gray-600">Total Revenue</p>
          </div>
        </div>

        <div className="card">
          <div className="card-body text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-dark mb-1">{stats.activeHotspots}</h3>
            <p className="text-gray-600">Active Hotspots</p>
          </div>
        </div>

        <div className="card">
          <div className="card-body text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="text-2xl font-bold text-dark mb-1">{stats.pendingOrders}</h3>
            <p className="text-gray-600">Pending Orders</p>
          </div>
        </div>

        <div className="card">
          <div className="card-body text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-dark mb-1">₹{stats.averageOrderValue}</h3>
            <p className="text-gray-600">Avg. Order Value</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="card">
          <div className="card-body">
            <h3 className="text-xl font-semibold text-dark mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <a
                href="/vendor/hotspots"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <MapPin className="w-5 h-5 text-primary" />
                <span>Manage Hotspots</span>
              </a>
              <a
                href="/vendor/orders"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <ShoppingCart className="w-5 h-5 text-primary" />
                <span>View Orders</span>
              </a>
              <a
                href="/vendor/profile"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Package className="w-5 h-5 text-primary" />
                <span>Update Profile</span>
              </a>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <h3 className="text-xl font-semibold text-dark mb-4">Recent Hotspots</h3>
            <div className="space-y-3">
              {recentHotspots.length > 0 ? (
                recentHotspots.map((hotspot) => (
                  <div key={hotspot.hid} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-dark">{hotspot.mealName}</p>
                      <p className="text-xs text-gray-500">{hotspot.mealCount} meals available</p>
                    </div>
                    <span className="text-sm font-medium text-primary">₹{hotspot.price}</span>
                  </div>
                ))
              ) : (
                <div className="text-center py-4">
                  <AlertCircle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">No hotspots created yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="card">
        <div className="card-body">
          <h3 className="text-xl font-semibold text-dark mb-4">Recent Orders</h3>
          {recentOrders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Order ID</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Meal</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Quantity</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Total</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.oid} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-900">#{order.oid}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{order.mealName}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{order.mealCount}</td>
                      <td className="py-3 px-4 text-sm font-medium text-primary">₹{order.totalPrice}</td>
                      <td className="py-3 px-4">
                        <span className={`badge badge-${order.status === 'pending' ? 'warning' : order.status === 'completed' ? 'success' : 'info'}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No orders received yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
