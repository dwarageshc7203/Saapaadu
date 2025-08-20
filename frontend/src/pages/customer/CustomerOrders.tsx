// src/pages/customer/CustomerOrders.tsx
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/api/axios";
import { Clock, CheckCircle, XCircle, AlertCircle, Package, MapPin, Calendar } from "lucide-react";
import type { Order } from "@/types";

interface OrderStats {
  total: number;
  pending: number;
  confirmed: number;
  completed: number;
  cancelled: number;
}

export default function CustomerOrders() {
  const { user: _user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<OrderStats>({
    total: 0,
    pending: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const response = await api.get("/orders/my");
      const ordersData = response.data;
      
      // Calculate stats
      const total = ordersData.length;
      const pending = ordersData.filter((order: Order) => order.status === 'pending').length;
      const confirmed = ordersData.filter((order: Order) => order.status === 'confirmed').length;
      const completed = ordersData.filter((order: Order) => order.status === 'completed').length;
      const cancelled = ordersData.filter((order: Order) => order.status === 'cancelled').length;
      
      setStats({ total, pending, confirmed, completed, cancelled });
      setOrders(ordersData);
    } catch (err: any) {
      setError("Failed to load orders");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'confirmed':
        return <CheckCircle className="w-4 h-4 text-blue-600" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'badge-warning';
      case 'confirmed':
        return 'badge-info';
      case 'completed':
        return 'badge-success';
      case 'cancelled':
        return 'badge-error';
      default:
        return 'badge-info';
    }
  };

  const filteredOrders = statusFilter === "all" 
    ? orders 
    : orders.filter(order => order.status === statusFilter);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading orders...</p>
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
        <h1 className="text-3xl font-bold text-dark mb-2">My Orders</h1>
        <p className="text-gray-600">Track your food orders and their current status</p>
      </div>

      {/* Stats Summary */}
      <div className="grid md:grid-cols-5 gap-4 mb-8">
        <div className="card">
          <div className="card-body text-center">
            <div className="text-2xl font-bold text-dark mb-1">{stats.total}</div>
            <p className="text-gray-600 text-sm">Total Orders</p>
          </div>
        </div>
        <div className="card">
          <div className="card-body text-center">
            <div className="text-2xl font-bold text-yellow-600 mb-1">{stats.pending}</div>
            <p className="text-gray-600 text-sm">Pending</p>
          </div>
        </div>
        <div className="card">
          <div className="card-body text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">{stats.confirmed}</div>
            <p className="text-gray-600 text-sm">Confirmed</p>
          </div>
        </div>
        <div className="card">
          <div className="card-body text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">{stats.completed}</div>
            <p className="text-gray-600 text-sm">Completed</p>
          </div>
        </div>
        <div className="card">
          <div className="card-body text-center">
            <div className="text-2xl font-bold text-red-600 mb-1">{stats.cancelled}</div>
            <p className="text-gray-600 text-sm">Cancelled</p>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setStatusFilter("all")}
          className={`btn ${statusFilter === "all" ? "btn-primary" : "btn-outline"}`}
        >
          All ({stats.total})
        </button>
        <button
          onClick={() => setStatusFilter("pending")}
          className={`btn ${statusFilter === "pending" ? "btn-primary" : "btn-outline"}`}
        >
          Pending ({stats.pending})
        </button>
        <button
          onClick={() => setStatusFilter("confirmed")}
          className={`btn ${statusFilter === "confirmed" ? "btn-primary" : "btn-outline"}`}
        >
          Confirmed ({stats.confirmed})
        </button>
        <button
          onClick={() => setStatusFilter("completed")}
          className={`btn ${statusFilter === "completed" ? "btn-primary" : "btn-outline"}`}
        >
          Completed ({stats.completed})
        </button>
        <button
          onClick={() => setStatusFilter("cancelled")}
          className={`btn ${statusFilter === "cancelled" ? "btn-primary" : "btn-outline"}`}
        >
          Cancelled ({stats.cancelled})
        </button>
      </div>

      {/* Orders List */}
      {filteredOrders.length > 0 ? (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div key={order.oid} className="card">
              <div className="card-body">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Package className="w-8 h-8 text-primary" />
                    <div>
                      <h3 className="text-lg font-semibold text-dark">Order #{order.oid}</h3>
                      <p className="text-gray-600">{order.mealName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(order.status)}
                    <span className={`badge ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {order.hotspot?.shopName || "Shop Name"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {new Date(order.otime).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      Qty: {order.mealCount}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-500">
                    Order placed at {new Date(order.otime).toLocaleTimeString()}
                  </div>
                  <div className="text-lg font-bold text-primary">
                    ₹{order.totalPrice}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card">
          <div className="card-body text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              {statusFilter === "all" ? "No orders yet" : `No ${statusFilter} orders`}
            </h3>
            <p className="text-gray-500">
              {statusFilter === "all" 
                ? "Start ordering from hotspots to see your orders here."
                : `You don't have any ${statusFilter} orders at the moment.`
              }
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
