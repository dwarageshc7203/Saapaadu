// frontend/src/pages/customer/CustomerHotspots.tsx
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/api/axios";
import { Search, Filter, MapPin, Clock, Package, ShoppingCart } from "lucide-react";
import type { Hotspot } from "@/types";

export default function CustomerHotspots() {
  const { user: _user } = useAuth();
  const [hotspots, setHotspots] = useState<Hotspot[]>([]);
  const [filteredHotspots, setFilteredHotspots] = useState<Hotspot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [areaFilter, setAreaFilter] = useState("");
  const [vegFilter, setVegFilter] = useState<string>("all");
  const [orderModal, setOrderModal] = useState<{ hotspot: Hotspot | null; quantity: number }>({
    hotspot: null,
    quantity: 1,
  });

  useEffect(() => {
    loadHotspots();
  }, []);

  useEffect(() => {
    filterHotspots();
  }, [hotspots, searchTerm, areaFilter, vegFilter]);

  const loadHotspots = async () => {
    try {
      setLoading(true);
      const response = await api.get("/hotspots");
      setHotspots(response.data);
    } catch (err: any) {
      setError("Failed to load hotspots");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filterHotspots = () => {
    let filtered = [...hotspots];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(hotspot =>
        hotspot.mealName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hotspot.shopName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hotspot.area.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Area filter
    if (areaFilter) {
      filtered = filtered.filter(hotspot =>
        hotspot.area.toLowerCase().includes(areaFilter.toLowerCase()) ||
        hotspot.city.toLowerCase().includes(areaFilter.toLowerCase())
      );
    }

    // Veg/Non-veg filter
    if (vegFilter !== "all") {
      filtered = filtered.filter(hotspot => hotspot.veg_nonveg === vegFilter);
    }

    setFilteredHotspots(filtered);
  };

  const handleOrder = async (hotspot: Hotspot, quantity: number) => {
    try {
      const response = await api.post("/orders", {
        hid: hotspot.hid,
        quantity: quantity,
      });
      
      alert(`Order placed successfully! Order ID: ${response.data.oid}`);
      setOrderModal({ hotspot: null, quantity: 1 });
      
      // Reload hotspots to update meal count
      await loadHotspots();
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to place order");
    }
  };

  const openOrderModal = (hotspot: Hotspot) => {
    setOrderModal({ hotspot, quantity: 1 });
  };

  const closeOrderModal = () => {
    setOrderModal({ hotspot: null, quantity: 1 });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading hotspots...</p>
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
        <h1 className="text-3xl font-bold text-dark mb-2">Browse Hotspots</h1>
        <p className="text-gray-600">Discover nearby food hotspots and place orders</p>
      </div>

      {/* Search and Filters */}
      <div className="card">
        <div className="card-body">
          <div className="grid md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search meals, shops..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input pl-10"
              />
            </div>

            {/* Area Filter */}
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Filter by area..."
                value={areaFilter}
                onChange={(e) => setAreaFilter(e.target.value)}
                className="form-input pl-10"
              />
            </div>

            {/* Veg/Non-veg Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={vegFilter}
                onChange={(e) => setVegFilter(e.target.value)}
                className="form-input pl-10"
              >
                <option value="all">All Types</option>
                <option value="veg">Vegetarian</option>
                <option value="nonveg">Non-Vegetarian</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-end">
              <span className="text-sm text-gray-600">
                {filteredHotspots.length} hotspot{filteredHotspots.length !== 1 ? 's' : ''} found
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Hotspots Grid */}
      {filteredHotspots.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotspots.map((hotspot) => (
            <div key={hotspot.hid} className="card hover:shadow-lg transition-shadow">
              <div className="card-body">
                {/* Hotspot Image */}
                <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                  {hotspot.shopImage ? (
                    <img
                      src={hotspot.shopImage}
                      alt={hotspot.mealName}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <Package className="w-16 h-16 text-gray-400" />
                  )}
                </div>

                {/* Hotspot Info */}
                <div className="space-y-3">
                  <div>
                    <h3 className="text-lg font-semibold text-dark mb-1">{hotspot.mealName}</h3>
                    <p className="text-gray-600 text-sm">{hotspot.shopName}</p>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{hotspot.area}, {hotspot.city}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{hotspot.duration}h</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`badge ${hotspot.veg_nonveg === 'veg' ? 'badge-success' : 'badge-warning'}`}>
                        {hotspot.veg_nonveg}
                      </span>
                      <span className="text-sm text-gray-600">
                        {hotspot.mealCount} meals left
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-primary">₹{hotspot.price}</div>
                      <div className="text-xs text-gray-500">per meal</div>
                    </div>
                  </div>

                  {/* Order Button */}
                  <button
                    onClick={() => openOrderModal(hotspot)}
                    disabled={hotspot.mealCount === 0}
                    className={`btn w-full ${
                      hotspot.mealCount > 0 
                        ? 'btn-primary' 
                        : 'btn-outline cursor-not-allowed opacity-50'
                    }`}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {hotspot.mealCount > 0 ? 'Place Order' : 'Out of Stock'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card">
          <div className="card-body text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No hotspots found</h3>
            <p className="text-gray-500">
              {searchTerm || areaFilter || vegFilter !== "all"
                ? "Try adjusting your search criteria or filters."
                : "No hotspots are available at the moment. Check back later!"
              }
            </p>
          </div>
        </div>
      )}

      {/* Order Modal */}
      {orderModal.hotspot && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-dark mb-4">
              Place Order - {orderModal.hotspot.mealName}
            </h3>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="form-label">Quantity</label>
                <input
                  type="number"
                  min="1"
                  max={orderModal.hotspot.mealCount}
                  value={orderModal.quantity}
                  onChange={(e) => setOrderModal(prev => ({ ...prev, quantity: parseInt(e.target.value) || 1 }))}
                  className="form-input"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Available: {orderModal.hotspot.mealCount} meals
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  Total: ₹{orderModal.hotspot.price * orderModal.quantity}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={closeOrderModal}
                className="btn btn-outline flex-1"
              >
                Cancel
              </button>
              <button
                onClick={() => handleOrder(orderModal.hotspot!, orderModal.quantity)}
                className="btn btn-primary flex-1"
              >
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
