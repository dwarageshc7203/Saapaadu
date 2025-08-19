// src/pages/vendor/VendorDashboard.tsx
import { useEffect, useState } from 'react';
import { api } from '../../api/axios';

interface VendorStats {
  totalOrders: number;
  activeHotspots: number;
  revenue: number;
}

export default function VendorDashboard() {
  const [stats, setStats] = useState<VendorStats | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get<VendorStats>('/vendor/stats'); 
        // 👆 adjust endpoint to match backend, e.g. /vendors/:vid/stats
        setStats(data);
      } catch (err) {
        console.error('Failed to fetch vendor stats', err);
      }
    };
    load();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Vendor Dashboard</h1>

      {!stats ? (
        <p className="text-gray-500">Loading your stats...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-green-100 p-4 rounded-xl shadow">
            <p className="text-lg font-medium">Total Orders</p>
            <p className="text-2xl font-bold">{stats.totalOrders}</p>
          </div>
          <div className="bg-blue-100 p-4 rounded-xl shadow">
            <p className="text-lg font-medium">Active Hotspots</p>
            <p className="text-2xl font-bold">{stats.activeHotspots}</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-xl shadow">
            <p className="text-lg font-medium">Revenue</p>
            <p className="text-2xl font-bold">₹{stats.revenue}</p>
          </div>
        </div>
      )}
    </div>
  );
}
