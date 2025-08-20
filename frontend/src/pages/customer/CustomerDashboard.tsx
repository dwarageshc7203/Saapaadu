import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/api/axios";
import { ShoppingCart, MapPin, TrendingUp, Package, Map } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { Hotspot } from "@/types";

interface DashboardStats {
  totalOrders: number;
  activeHotspots: number;
  totalSpent: number;
  averageOrderValue: number;
}

export default function CustomerDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalOrders: 0,
    activeHotspots: 0,
    totalSpent: 0,
    averageOrderValue: 0,
  });
  const [hotspots, setHotspots] = useState<Hotspot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Load orders for stats
      const ordersResponse = await api.get("/orders/my");
      const orders = ordersResponse.data;
      
      // Load nearby hotspots
      const hotspotsResponse = await api.get("/hotspots");
      const hotspotsData = hotspotsResponse.data;
      
      // Calculate stats from live data
      const totalOrders = orders.length;
      const totalSpent = orders.reduce((sum: number, order: any) => sum + (order.totalPrice || 0), 0);
      const averageOrderValue = totalOrders > 0 ? totalSpent / totalOrders : 0;
      
      setStats({
        totalOrders,
        activeHotspots: hotspotsData.length,
        totalSpent,
        averageOrderValue: Math.round(averageOrderValue * 100) / 100,
      });
      
      setHotspots(hotspotsData);
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
        <h1 className="text-3xl font-bold text-dark mb-2">Welcome back, {user?.email}!</h1>
        <p className="text-gray-600">Here's what's happening with your food orders today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="card-body text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-dark mb-1">{stats.totalOrders}</h3>
            <p className="text-gray-600">Total Orders</p>
          </div>
        </div>

        <div className="card">
          <div className="card-body text-center">
            <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="text-2xl font-bold text-dark mb-1">{stats.activeHotspots}</h3>
            <p className="text-gray-600">Active Hotspots</p>
          </div>
        </div>

        <div className="card">
          <div className="card-body text-center">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-2xl font-bold text-dark mb-1">₹{stats.totalSpent}</h3>
            <p className="text-gray-600">Total Spent</p>
          </div>
        </div>

        <div className="card">
          <div className="card-body text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-dark mb-1">₹{stats.averageOrderValue}</h3>
            <p className="text-gray-600">Avg. Order Value</p>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="card">
        <div className="card-body">
          <h3 className="text-xl font-semibold text-dark mb-4 flex items-center gap-2">
            <Map className="w-5 h-5 text-primary" />
            Nearby Hotspots
          </h3>
          <div className="h-96 rounded-lg overflow-hidden">
            <MapContainer
              center={[12.9716, 77.5946]} // Default to Bangalore coordinates
              zoom={13}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {hotspots.map((hotspot) => (
                <Marker
                  key={hotspot.hid}
                  position={[hotspot.latitude || 12.9716, hotspot.longitude || 77.5946]}
                >
                  <Popup>
                    <div className="text-center">
                      <h4 className="font-semibold text-dark">{hotspot.mealName}</h4>
                      <p className="text-gray-600">{hotspot.shopName}</p>
                      <p className="text-primary font-medium">₹{hotspot.price}</p>
                      <p className="text-sm text-gray-500">{hotspot.mealCount} meals available</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
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
                href="/customer/hotspots"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <MapPin className="w-5 h-5 text-primary" />
                <span>Browse Hotspots</span>
              </a>
              <a
                href="/customer/orders"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <ShoppingCart className="w-5 h-5 text-primary" />
                <span>View Orders</span>
              </a>
              <a
                href="/customer/profile"
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
            <h3 className="text-xl font-semibold text-dark mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {hotspots.slice(0, 3).map((hotspot) => (
                <div key={hotspot.hid} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-dark">{hotspot.mealName}</p>
                    <p className="text-xs text-gray-500">{hotspot.shopName}</p>
                  </div>
                  <span className="text-sm font-medium text-primary">₹{hotspot.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
