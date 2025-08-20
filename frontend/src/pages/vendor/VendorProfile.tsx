import { useEffect, useState } from "react";
import { api } from "@/api/axios";
import { useAuth } from "@/context/AuthContext";
import type { Vendor } from "@/types";

interface VendorFormState {
  username: string;
  phoneNumber: string;
  veg_nonveg: "veg" | "nonveg" | "";
  shopName: string;
  shopAddress: string;
  area: string;
  city: string;
  state: string;
  latitude: string;
  longitude: string;
  shopImage: string;
}

export default function VendorProfile() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [form, setForm] = useState<VendorFormState>({
    username: "",
    phoneNumber: "",
    veg_nonveg: "",
    shopName: "",
    shopAddress: "",
    area: "",
    city: "",
    state: "",
    latitude: "",
    longitude: "",
    shopImage: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const { data } = await api.get<Vendor>("/vendor/profile");
        setForm({
          username: data.username ?? "",
          phoneNumber: data.phoneNumber ?? "",
          veg_nonveg: data.veg_nonveg ?? "",
          shopName: data.shopName ?? "",
          shopAddress: data.shopAddress ?? "",
          area: data.area ?? "",
          city: data.city ?? "",
          state: data.state ?? "",
          latitude: data.latitude != null ? String(data.latitude) : "",
          longitude: data.longitude != null ? String(data.longitude) : "",
          shopImage: data.shopImage ?? "",
        });
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);
    try {
      const payload = {
        username: form.username || undefined,
        phoneNumber: form.phoneNumber || undefined,
        veg_nonveg: (form.veg_nonveg || undefined) as "veg" | "nonveg" | undefined,
        shopName: form.shopName || undefined,
        shopAddress: form.shopAddress || undefined,
        area: form.area || undefined,
        city: form.city || undefined,
        state: form.state || undefined,
        latitude:
          form.latitude !== "" && !isNaN(Number(form.latitude))
            ? Number(form.latitude)
            : undefined,
        longitude:
          form.longitude !== "" && !isNaN(Number(form.longitude))
            ? Number(form.longitude)
            : undefined,
        shopImage: form.shopImage || undefined,
      };
      await api.put("/vendor/profile", payload);
      setSuccess("Profile updated successfully");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-6">Loading profile...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Vendor Profile</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4 text-red-700">{error}</div>
      )}
      {success && (
        <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-4 text-green-700">{success}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card">
          <div className="card-body space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label className="form-label" htmlFor="username">Display Name</label>
                <input id="username" name="username" className="form-input" value={form.username} onChange={onChange} />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="phoneNumber">Phone Number</label>
                <input id="phoneNumber" name="phoneNumber" className="form-input" value={form.phoneNumber} onChange={onChange} />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="veg_nonveg">Dietary Type</label>
                <select id="veg_nonveg" name="veg_nonveg" className="form-input" value={form.veg_nonveg} onChange={onChange}>
                  <option value="">Select</option>
                  <option value="veg">Veg</option>
                  <option value="nonveg">Non-Veg</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="shopName">Shop Name</label>
                <input id="shopName" name="shopName" className="form-input" value={form.shopName} onChange={onChange} />
              </div>

              <div className="form-group md:col-span-2">
                <label className="form-label" htmlFor="shopAddress">Shop Address</label>
                <textarea id="shopAddress" name="shopAddress" className="form-input" rows={2} value={form.shopAddress} onChange={onChange} />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="area">Area</label>
                <input id="area" name="area" className="form-input" value={form.area} onChange={onChange} />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="city">City</label>
                <input id="city" name="city" className="form-input" value={form.city} onChange={onChange} />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="state">State</label>
                <input id="state" name="state" className="form-input" value={form.state} onChange={onChange} />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="latitude">Latitude</label>
                <input id="latitude" name="latitude" className="form-input" value={form.latitude} onChange={onChange} placeholder="e.g. 13.0827" />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="longitude">Longitude</label>
                <input id="longitude" name="longitude" className="form-input" value={form.longitude} onChange={onChange} placeholder="e.g. 80.2707" />
              </div>

              <div className="form-group md:col-span-2">
                <label className="form-label" htmlFor="shopImage">Shop Image URL</label>
                <input id="shopImage" name="shopImage" className="form-input" value={form.shopImage} onChange={onChange} placeholder="https://..." />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button type="submit" disabled={saving} className="btn btn-primary">
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>

      <div className="mt-6 text-sm text-gray-600">
        <p><span className="font-medium">Email:</span> {user?.email}</p>
        <p><span className="font-medium">User ID:</span> {user?.id}</p>
      </div>
    </div>
  );
}


