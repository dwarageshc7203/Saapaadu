// src/pages/customer/CustomerOrders.tsx
import { useEffect, useState } from 'react';
import { api } from '../../api/axios';

interface Order {
  oid: number;
  mealName: string;
  mealCount: number;
  otime: string;
  price: number;
}

export default function CustomerOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get<Order[]>('/orders/my'); 
        // 👆 adjust endpoint to match backend (e.g. /orders/customer/:cid)
        setOrders(data);
      } catch (err) {
        console.error('Failed to fetch orders', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return <p className="p-4">Loading orders...</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-3">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">You haven’t placed any orders yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">#</th>
                <th className="p-2 text-left">Meal</th>
                <th className="p-2 text-left">Qty</th>
                <th className="p-2 text-left">Price</th>
                <th className="p-2 text-left">Time</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o, idx) => (
                <tr key={o.oid} className="border-t hover:bg-gray-50">
                  <td className="p-2">{idx + 1}</td>
                  <td className="p-2">{o.mealName}</td>
                  <td className="p-2">{o.mealCount}</td>
                  <td className="p-2">₹{o.price}</td>
                  <td className="p-2 text-sm text-gray-600">
                    {new Date(o.otime).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
