import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/api/axios";
import { User, Mail, Phone, MapPin, Edit, Save, X } from "lucide-react";

interface CustomerProfile {
  cid: number;
  username: string;
  phoneNumber: string;
  veg_nonveg: string;
  address: string;
  area: string;
  city: string;
  state: string;
}

export default function CustomerProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<CustomerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<CustomerProfile>>({});

  useEffect(() => {
    if (user?.id) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/customer/profile`);
      setProfile(response.data);
      setEditForm(response.data);
    } catch (err) {
      setError("Failed to load profile");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditForm(profile || {});
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditForm(profile || {});
  };

  const handleSave = async () => {
    try {
      const response = await api.put(`/customer/profile`, editForm);
      setProfile(response.data);
      setIsEditing(false);
      setSuccess("Profile updated successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to update profile");
      console.error(err);
    }
  };

  const handleInputChange = (field: keyof CustomerProfile, value: string) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="card">
        <div className="card-body text-center py-12">
          <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Profile not found</h3>
          <p className="text-gray-500">Unable to load your profile information.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark mb-2">My Profile</h1>
        <p className="text-gray-600">Manage your account information and preferences</p>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="card bg-green-50 border-green-200">
          <div className="card-body">
            <p className="text-green-600 text-center">{success}</p>
          </div>
        </div>
      )}

      {error && (
        <div className="card bg-red-50 border-red-200">
          <div className="card-body">
            <p className="text-red-600 text-center">{error}</p>
          </div>
        </div>
      )}

      {/* Profile Card */}
      <div className="card">
        <div className="card-header">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-dark">Personal Information</h2>
            {!isEditing ? (
              <button
                onClick={handleEdit}
                className="btn btn-outline btn-sm flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="btn btn-primary btn-sm flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
                <button
                  onClick={handleCancel}
                  className="btn btn-outline btn-sm flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="card-body">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <div className="form-group">
                <label className="form-label flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Username
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.username || ""}
                    onChange={(e) => handleInputChange("username", e.target.value)}
                    className="form-input"
                    placeholder="Enter username"
                  />
                ) : (
                  <div className="p-3 bg-gray-50 rounded-lg border">
                    {profile.username}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </label>
                <div className="p-3 bg-gray-50 rounded-lg border text-gray-600">
                  {user?.email} (cannot be changed)
                </div>
              </div>

              <div className="form-group">
                <label className="form-label flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editForm.phoneNumber || ""}
                    onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                    className="form-input"
                    placeholder="Enter phone number"
                  />
                ) : (
                  <div className="p-3 bg-gray-50 rounded-lg border">
                    {profile.phoneNumber || "Not provided"}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Dietary Preference</label>
                {isEditing ? (
                  <select
                    value={editForm.veg_nonveg || ""}
                    onChange={(e) => handleInputChange("veg_nonveg", e.target.value)}
                    className="form-input"
                  >
                    <option value="veg">Vegetarian</option>
                    <option value="nonveg">Non-Vegetarian</option>
                    <option value="both">Both</option>
                  </select>
                ) : (
                  <div className="p-3 bg-gray-50 rounded-lg border">
                    <span className={`badge ${
                      profile.veg_nonveg === 'veg' ? 'badge-success' : 
                      profile.veg_nonveg === 'nonveg' ? 'badge-error' : 'badge-info'
                    }`}>
                      {profile.veg_nonveg === 'veg' ? 'Vegetarian' : 
                       profile.veg_nonveg === 'nonveg' ? 'Non-Vegetarian' : 'Both'}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Address Information */}
            <div className="space-y-4">
              <div className="form-group">
                <label className="form-label flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Address
                </label>
                {isEditing ? (
                  <textarea
                    value={editForm.address || ""}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    className="form-input"
                    rows={3}
                    placeholder="Enter your address"
                  />
                ) : (
                  <div className="p-3 bg-gray-50 rounded-lg border">
                    {profile.address || "Not provided"}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">Area</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.area || ""}
                      onChange={(e) => handleInputChange("area", e.target.value)}
                      className="form-input"
                      placeholder="Enter area"
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-lg border">
                      {profile.area || "Not provided"}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">City</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.city || ""}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      className="form-input"
                      placeholder="Enter city"
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-lg border">
                      {profile.city || "Not provided"}
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">State</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.state || ""}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                    className="form-input"
                    placeholder="Enter state"
                  />
                ) : (
                  <div className="p-3 bg-gray-50 rounded-lg border">
                    {profile.state || "Not provided"}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Account Information */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-xl font-semibold text-dark">Account Information</h2>
        </div>
        <div className="card-body">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="form-label">Customer ID</label>
              <div className="p-3 bg-gray-50 rounded-lg border">
                {profile.cid}
              </div>
            </div>
            <div>
              <label className="form-label">Account Type</label>
              <div className="p-3 bg-gray-50 rounded-lg border">
                <span className="badge badge-info">Customer</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="card">
        <div className="card-body">
          <h3 className="text-lg font-semibold text-dark mb-4">💡 Profile Tips</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-dark mb-2">Keep Information Updated</h4>
              <p className="text-gray-600 text-sm">
                Regularly update your contact information and address to ensure smooth order delivery and communication.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-dark mb-2">Dietary Preferences</h4>
              <p className="text-gray-600 text-sm">
                Set your dietary preferences to receive personalized hotspot recommendations and better meal options.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
