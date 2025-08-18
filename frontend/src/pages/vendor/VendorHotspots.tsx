import { useEffect, useState } from 'react';
import { api } from '../../api/axios';
import type { Hotspot, VegType } from '../../types';

type FormState = {
  mealName: string;
  mealCount: number;
  price: number;
  duration: number;
  veg_nonveg: VegType;
};

const initialForm: FormState = {
  mealName: '',
  mealCount: 10,
  price: 100,
  duration: 60,
  veg_nonveg: 'veg',
};

export default function VendorHotspots() {
  const [items, setItems] = useState<Hotspot[]>([]);
  const [form, setForm] = useState<FormState>(initialForm);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    const { data } = await api.get<Hotspot[]>('/hotspots'); // You may expose /hotspots/my for vendor-owned
    setItems(data);
  };

  useEffect(() => { load(); }, []);

  const createHotspot = async () => {
    try {
      setLoading(true);
      // Backend will fill shop/vendor details from vendor profile.
      await api.post('/hotspots', form);
      await load();
      setForm(initialForm);
    } finally {
      setLoading(false);
    }
  };

  const removeHotspot = async (hid: number) => {
    await api.delete(`/hotspots/${hid}`);
    await load();
  };

  return (
    <div className="p-4 space-y-4">
      <div className="font-semibold text-lg">Your Hotspots</div>

      {/* Create form */}
      <div className="grid gap-2 max-w-md">
        <input className="border p-2 rounded" placeholder="Meal name" value={form.mealName}
               onChange={(e) => setForm(f => ({ ...f, mealName: e.target.value }))} />
        <input className="border p-2 rounded" placeholder="Meal count" type="number" value={form.mealCount}
               onChange={(e) => setForm(f => ({ ...f, mealCount: Number(e.target.value) }))} />
        <input className="border p-2 rounded" placeholder="Price (₹)" type="number" value={form.price}
               onChange={(e) => setForm(f => ({ ...f, price: Number(e.target.value) }))} />
        <input className="border p-2 rounded" placeholder="Duration (min)" type="number" value={form.duration}
               onChange={(e) => setForm(f => ({ ...f, duration: Number(e.target.value) }))} />
        <select className="border p-2 rounded" value={form.veg_nonveg}
                onChange={(e) => setForm(f => ({ ...f, veg_nonveg: e.target.value as VegType }))}>
          <option value="veg">Veg</option>
          <option value="nonveg">Non-Veg</option>
        </select>
        <button disabled={loading} onClick={createHotspot} className="bg-black text-white px-4 py-2 rounded">
          {loading ? 'Creating…' : 'Create Hotspot'}
        </button>
      </div>

      {/* List */}
      <div className="grid gap-2">
        {items.map(h => (
          <div key={h.hid} className="border rounded p-3 flex justify-between items-center">
            <div>
              <div className="font-medium">{h.mealName} — ₹{h.price}</div>
              <div className="text-sm">{h.shopName} • {h.area}, {h.city} • {h.veg_nonveg}</div>
              <div className="text-xs">Window: {h.duration} min • Count: {h.mealCount}</div>
            </div>
            <button onClick={() => removeHotspot(h.hid)} className="text-red-600">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
