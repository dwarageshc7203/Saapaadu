import { useEffect, useState } from "react";
import { api } from "@/api/axios";

export default function CustomerProfile() {
    type Customer = {
  cid: number;
  uid: number;
  username: string;
  phoneNumber?: string;
  veg_nonveg?: "veg" | "nonveg";
  address?: string;
  area?: string;
  city?: string;
  state?: string;
};

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // TODO: Replace with real customer id from auth context / localStorage
  const customerId = 1;

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get<Customer>(`/customers/${customerId}`);
        setCustomer(data);
      } catch (err) {
        console.error("Failed to load profile", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!customer) return;
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleSave = async () => {
    if (!customer) return;
    setSaving(true);
    try {
      await api.put(`/customers/${customerId}`, customer);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Failed to update profile", err);
      alert("Error updating profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;
  if (!customer) return <p className="p-4">Customer not found</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-semibold mb-4">My Profile</h1>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Username</label>
          <input
            name="username"
            value={customer.username || ""}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Phone Number</label>
          <input
            name="phoneNumber"
            value={customer.phoneNumber || ""}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Diet Preference</label>
          <select
            name="veg_nonveg"
            value={customer.veg_nonveg || ""}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="">Select</option>
            <option value="veg">Veg</option>
            <option value="nonveg">Non-Veg</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Address</label>
          <input
            name="address"
            value={customer.address || ""}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Area</label>
          <input
            name="area"
            value={customer.area || ""}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">City</label>
          <input
            name="city"
            value={customer.city || ""}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">State</label>
          <input
            name="state"
            value={customer.state || ""}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}
