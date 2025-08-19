// src/pages/vendor/VendorHotspots.tsx
import { useEffect, useState } from 'react';
import { api } from '../../api/axios';
import type { Hotspot } from '@/types';

export default function VendorHotspots() {
  const [hotspots, setHotspots] = useState<Hotspot[]>([]);
  const [form, setForm] = useState<Partial<Hotspot>>({
    mealName: '',
    mealCount: 0,
    price: 0,
    duration: 30,
    veg_nonveg: 'veg',
  });
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<number | null>(null);

  const loadHotspots = async () => {
    try {
      const { data } = await api.get<Hotspot[]>('/vendor/hotspots');
      setHotspots(data);
    } catch (err) {
      console.error('Error fetching hotspots', err);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editing) {
        await api.put(`/vendor/hotspots/${editing}`, form);
      } else {
        await api.post('/vendor/hotspots', form);
      }
      setForm({ mealName: '', mealCount: 0, price: 0, duration: 30, veg_nonveg: 'veg' });
      setEditing(null);
      await loadHotspots();
    } catch (err) {
      console.error('Failed to save hotspot', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (hid: number) => {
    try {
      await api.delete(`/vendor/hotspots/${hid}`);
      setHotspots(hotspots.filter(h => h.hid !== hid));
    } catch (err) {
      console.error('Failed to delete hotspot', err);
    }
  };

  const handleEdit = (h: Hotspot) => {
    setEditing(h.hid);
    setForm(h);
  };

  useEffect(() => {
    loadHotspots();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Manage Hotspots</h1>

      {/* Add/Edit Hotspot Form */}
      <form onSubmit={handleSave} className="space-y-3 bg-gray-100 p-4 rounded-lg mb-6">
        <input
          className="border p-2 rounded w-full"
          placeholder="Meal Name"
          value={form.mealName || ''}
          onChange={e => setForm({ ...form, mealName: e.target.value })}
        />
        <input
          className="border p-2 rounded w-full"
          type="number"
          placeholder="Meal Count"
          value={form.mealCount || 0}
          onChange={e => setForm({ ...form, mealCount: Number(e.target.value) })}
        />
        <input
          className="border p-2 rounded w-full"
          type="number"
          placeholder="Price (₹)"
          value={form.price || 0}
          onChange={e => setForm({ ...form, price: Number(e.target.value) })}
        />
        <input
          className="border p-2 rounded w-full"
          type="number"
          placeholder="Duration (min)"
          value={form.duration || 30}
          onChange={e => setForm({ ...form, duration: Number(e.target.value) })}
        />
        <select
          className="border p-2 rounded w-full"
          value={form.veg_nonveg}
          onChange={e => setForm({ ...form, veg_nonveg: e.target.value as 'veg' | 'nonveg' })}
        >
          <option value="veg">Veg</option>
          <option value="nonveg">Non-Veg</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? 'Saving...' : editing ? 'Update Hotspot' : 'Add Hotspot'}
        </button>
        {editing && (
          <button
            type="button"
            onClick={() => {
              setEditing(null);
              setForm({ mealName: '', mealCount: 0, price: 0, duration: 30, veg_nonveg: 'veg' });
            }}
            className="ml-2 text-gray-600 underline"
          >
            Cancel
          </button>
        )}
      </form>

      {/* List of Hotspots */}
      <div className="grid gap-4">
        {hotspots.map(h => (
          <div key={h.hid} className="p-4 border rounded flex justify-between items-center">
            <div>
              <p className="font-semibold">{h.mealName}</p>
              <p className="text-sm">{h.shopName} — {h.area}, {h.city}</p>
              <p className="text-sm">₹{h.price} • {h.veg_nonveg} • Left: {h.mealCount}</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => handleEdit(h)} className="text-blue-600 hover:underline">
                Edit
              </button>
              <button onClick={() => handleDelete(h.hid)} className="text-red-600 hover:underline">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
