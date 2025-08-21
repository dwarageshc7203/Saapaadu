// src/pages/vendor/VendorHotspots.tsx
import { useEffect, useState } from "react";
import { api } from "@/api/axios";
import { MapPin, Clock, Plus, Edit, Trash2, Filter, Search } from "lucide-react";

interface Hotspot {
  hid: number;
  shopName: string;
  shopAddress: string;
  area: string;
  city: string;
  state: string;
  mealName: string;
  mealCount: number;
  price: number;
  duration: number;
  veg_nonveg: string;
  shopImage?: string;
}

interface CreateHotspotForm {
  mealName: string;
  mealCount: number;
  price: number;
  duration: number;
  veg_nonveg: string;
}

export default function VendorHotspots() {
  const [hotspots, setHotspots] = useState<Hotspot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterVeg, setFilterVeg] = useState("all");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingHotspot, setEditingHotspot] = useState<Hotspot | null>(null);
  const [formData, setFormData] = useState<CreateHotspotForm>({
    mealName: "",
    mealCount: 0,
    price: 0,
    duration: 0,
    veg_nonveg: "veg",
  });

  useEffect(() => {
    loadHotspots();
  }, []);

  const loadHotspots = async () => {
    try {
      setLoading(true);
      const response = await api.get("/hotspots/my");
      setHotspots(response.data);
    } catch (err) {
      setError("Failed to load hotspots");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/hotspots", formData);
      setShowCreateForm(false);
      setFormData({
        mealName: "",
        mealCount: 0,
        price: 0,
        duration: 0,
        veg_nonveg: "veg",
      });
      loadHotspots();
      alert("Hotspot created successfully!");
    } catch (err) {
      alert("Failed to create hotspot");
      console.error(err);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingHotspot) return;

    try {
      await api.patch(`/hotspots/${editingHotspot.hid}`, formData);
      setEditingHotspot(null);
      setFormData({
        mealName: "",
        mealCount: 0,
        price: 0,
        duration: 0,
        veg_nonveg: "veg",
      });
      loadHotspots();
      alert("Hotspot updated successfully!");
    } catch (err) {
      alert("Failed to update hotspot");
      console.error(err);
    }
  };

  const handleDelete = async (hotspotId: number) => {
    if (!confirm("Are you sure you want to delete this hotspot?")) return;

    try {
      await api.delete(`/hotspots/${hotspotId}`);
      loadHotspots();
      alert("Hotspot deleted successfully!");
    } catch (err) {
      alert("Failed to delete hotspot");
      console.error(err);
    }
  };

  const startEdit = (hotspot: Hotspot) => {
    setEditingHotspot(hotspot);
    setFormData({
      mealName: hotspot.mealName,
      mealCount: hotspot.mealCount,
      price: hotspot.price,
      duration: hotspot.duration,
      veg_nonveg: hotspot.veg_nonveg,
    });
  };

  const cancelEdit = () => {
    setEditingHotspot(null);
    setFormData({
      mealName: "",
      mealCount: 0,
      price: 0,
      duration: 0,
      veg_nonveg: "veg",
    });
  };

  const filteredHotspots = hotspots.filter((hotspot) => {
    const matchesSearch = hotspot.mealName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hotspot.shopName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesVeg = filterVeg === "all" || hotspot.veg_nonveg === filterVeg;
    return matchesSearch && matchesVeg;
  });

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark mb-2">Manage Hotspots</h1>
        <p className="text-gray-600">Create and manage your food hotspots to reach more customers</p>
      </div>

      {/* Create Hotspot Button */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => setShowCreateForm(true)}
          className="btn btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create New Hotspot
        </button>
      </div>

      {/* Search and Filters */}
      <div className="card">
        <div className="card-body">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search hotspots..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input pl-10 w-full"
              />
            </div>

            <select
              value={filterVeg}
              onChange={(e) => setFilterVeg(e.target.value)}
              className="form-input"
            >
              <option value="all">All Dietary Options</option>
              <option value="veg">Vegetarian Only</option>
              <option value="nonveg">Non-Vegetarian Only</option>
              <option value="both">Both</option>
            </select>

            <div className="flex items-center justify-end text-gray-600">
              <Filter className="w-5 h-5 mr-2" />
              {filteredHotspots.length} hotspots found
            </div>
          </div>
        </div>
      </div>

      {/* Create/Edit Form Modal */}
      {(showCreateForm || editingHotspot) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="card w-full max-w-md">
            <div className="card-header">
              <h3 className="text-lg font-semibold">
                {editingHotspot ? 'Edit Hotspot' : 'Create New Hotspot'}
              </h3>
            </div>
            <div className="card-body">
              <form onSubmit={editingHotspot ? handleUpdate : handleCreate} className="space-y-4">
                <div className="form-group">
                  <label htmlFor="mealName" className="form-label">Meal Name</label>
                  <input
                    id="mealName"
                    type="text"
                    value={formData.mealName}
                    onChange={(e) => setFormData({ ...formData, mealName: e.target.value })}
                    className="form-input"
                    placeholder="e.g., Biryani, Pizza"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label htmlFor="mealCount" className="form-label">Available Meals</label>
                    <input
                      id="mealCount"
                      type="number"
                      min="1"
                      value={formData.mealCount}
                      onChange={(e) => setFormData({ ...formData, mealCount: parseInt(e.target.value) || 0 })}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="price" className="form-label">Price (₹)</label>
                    <input
                      id="price"
                      type="number"
                      min="1"
                      step="0.5"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label htmlFor="duration" className="form-label">Duration (hours)</label>
                    <input
                      id="duration"
                      type="number"
                      min="1"
                      max="24"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || 0 })}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="veg_nonveg" className="form-label">Dietary Option</label>
                    <select
                      id="veg_nonveg"
                      value={formData.veg_nonveg}
                      onChange={(e) => setFormData({ ...formData, veg_nonveg: e.target.value })}
                      className="form-input"
                      required
                    >
                      <option value="veg">Vegetarian</option>
                      <option value="nonveg">Non-Vegetarian</option>
                      <option value="both">Both</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button type="submit" className="btn btn-primary flex-1">
                    {editingHotspot ? 'Update' : 'Create'}
                  </button>
                  <button
                    type="button"
                    onClick={editingHotspot ? cancelEdit : () => setShowCreateForm(false)}
                    className="btn btn-outline flex-1"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="card bg-red-50 border-red-200">
          <div className="card-body">
            <p className="text-red-600 text-center">{error}</p>
          </div>
        </div>
      )}

      {/* Hotspots Grid */}
      {filteredHotspots.length === 0 ? (
        <div className="card">
          <div className="card-body text-center py-12">
            <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No hotspots found</h3>
            <p className="text-gray-500">
              {filterVeg === "all" 
                ? "You haven't created any hotspots yet. Create your first one to get started!" 
                : `No hotspots with dietary option "${filterVeg}" found.`}
            </p>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotspots.map((hotspot) => (
            <div key={hotspot.hid} className="card hover:shadow-lg transition-shadow">
              {/* Hotspot Image */}
              <div className="h-48 bg-gray-200 rounded-t-lg overflow-hidden">
                {hotspot.shopImage ? (
                  <img
                    src={hotspot.shopImage}
                    alt={hotspot.shopName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <MapPin className="w-12 h-12 text-gray-400" />
                  </div>
                )}
              </div>

              <div className="card-body">
                {/* Hotspot Info */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-dark mb-1">{hotspot.mealName}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{hotspot.area}, {hotspot.city}</span>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-semibold text-primary">₹{hotspot.price}</div>
                    <div className="text-xs text-gray-600">Price</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-semibold text-secondary">{hotspot.mealCount}</div>
                    <div className="text-xs text-gray-600">Available</div>
                  </div>
                </div>

                {/* Dietary and Duration */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`badge ${
                    hotspot.veg_nonveg === 'veg' ? 'badge-success' : 
                    hotspot.veg_nonveg === 'nonveg' ? 'badge-error' : 'badge-info'
                  }`}>
                    {hotspot.veg_nonveg === 'veg' ? 'Vegetarian' : 
                     hotspot.veg_nonveg === 'nonveg' ? 'Non-Vegetarian' : 'Both'}
                  </span>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
  <Clock className="w-4 h-4" />
  <span>
    {Math.floor(hotspot.duration / 60)}h {hotspot.duration % 60}m left
  </span>
</div>

                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(hotspot)}
                    className="btn btn-outline btn-sm flex-1 flex items-center justify-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(hotspot.hid)}
                    className="btn btn-outline btn-sm text-red-600 border-red-600 hover:bg-red-50 flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
