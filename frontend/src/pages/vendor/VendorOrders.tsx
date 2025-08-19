// src/pages/vendor/VendorOrders.tsx
import { useEffect, useState } from 'react';
import { api } from '../../api/axios';
import type { Order } from '@/types';

export default function VendorOrders() {
  const [orders, setOrders] = useState<Order[]>([]);

  const loadOrders = async () => {
    try {
      const { data } = await api.get<Order[]>('/vendor/orders');
      setOrders(data);
    } catch (err) {
      console.error('Error fetching vendor orders', err);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Customer Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders yet.</p>
      ) : (
        <div className="grid gap-4">
          {orders.map(o => (
            <div key={o.oid} className="p-4 border rounded flex justify-between items-center">
              <div>
                <p className="font-semibold">{o.mealName}</p>
                <p className="text-sm">Qty: {o.mealCount} • ₹{o.price}</p>
                <p className="text-sm">Customer ID: {o.cid}</p>
                <p className="text-xs text-gray-500">Ordered at: {new Date(o.otime).toLocaleString()}</p>
              </div>
              <div className="text-green-600 font-medium">Pending</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
