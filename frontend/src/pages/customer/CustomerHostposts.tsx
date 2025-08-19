// frontend/src/pages/customer/CustomerHotspots.tsx
import { useEffect, useState } from "react";
import { api } from "../../api/axios";
import type { Hotspot } from "@/types";
import CustomerMap from "./CustomerMap";

export default function CustomerHotspots() {
  const [hotspots, setHotspots] = useState<Hotspot[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await api.get<Hotspot[]>("/hotspots");
      const normalized = data.map(h => ({ ...h, price: Number(h.price) }));
      setHotspots(normalized);
    };
    load();
  }, []);

  return (
    <div className="flex h-[85vh]">
      {/* Map Section */}
      <div className="flex-1 border-r">
        <CustomerMap hotspots={[]} />
      </div>

      {/* List Section */}
      <div className="flex-1 overflow-y-auto p-4">
        <h2 className="text-xl font-semibold mb-3">Available Hotspots</h2>
        {hotspots.length === 0 ? (
          <p className="text-gray-500">No hotspots available right now.</p>
        ) : (
          <ul className="space-y-4">
            {hotspots.map(h => (
              <li
                key={h.hid}
                className="border rounded-lg p-3 shadow-sm hover:shadow-md transition"
              >
                <div className="font-semibold">{h.shopName}</div>
                <div className="text-sm">{h.shopAddress}</div>
                <div className="text-sm">{h.area}, {h.city}</div>
                <div className="text-sm capitalize">{h.veg_nonveg}</div>
                <div className="text-sm">
                  {h.mealName} — ₹{h.price} (Left: {h.mealCount})
                </div>
                <div className="text-xs text-gray-500">
                  Window: {h.duration} min
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
