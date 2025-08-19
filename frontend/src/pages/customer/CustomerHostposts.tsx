// src/pages/customer/CustomerHotspots.tsx
import { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import type { LatLngExpression } from 'leaflet';
import { api } from '../../api/axios';
import type { Hotspot } from '@/types';

export default function CustomerHotspots() {
  const [hotspots, setHotspots] = useState<Hotspot[]>([]);
  const [vegFilter, setVegFilter] = useState<'all' | 'veg' | 'nonveg'>('all');
  const [areaQuery, setAreaQuery] = useState('');

  useEffect(() => {
    const load = async () => {
      const { data } = await api.get<Hotspot[]>('/hotspots');
      const normalized = data.map(h => ({ ...h, price: Number(h.price) }));
      setHotspots(normalized);
    };
    load();
    const id = setInterval(load, 45000);
    return () => clearInterval(id);
  }, []);

  const filtered = useMemo(() => {
    return hotspots.filter(h => {
      const vegOk = vegFilter === 'all' ? true : h.veg_nonveg === vegFilter;
      const areaOk = areaQuery ? h.area.toLowerCase().includes(areaQuery.toLowerCase()) : true;
      return vegOk && areaOk;
    });
  }, [hotspots, vegFilter, areaQuery]);

  const center: LatLngExpression = [13.0827, 80.2707]; // Chennai default

  return (
    <div className="flex h-[80vh]">
      {/* Sidebar list */}
      <div className="w-1/3 border-r p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-3">Hotspots</h2>
        <div className="flex gap-2 mb-3">
          <select
            value={vegFilter}
            onChange={(e) => setVegFilter(e.target.value as any)}
            className="border p-2 rounded"
          >
            <option value="all">All</option>
            <option value="veg">Veg</option>
            <option value="nonveg">Non-Veg</option>
          </select>
          <input
            className="border p-2 rounded"
            placeholder="Filter by area"
            value={areaQuery}
            onChange={(e) => setAreaQuery(e.target.value)}
          />
        </div>
        {filtered.length === 0 && (
          <p className="text-sm text-gray-500">No hotspots found.</p>
        )}
        <ul className="space-y-3">
          {filtered.map(h => (
            <li key={h.hid} className="border p-3 rounded shadow-sm">
              <div className="font-semibold">{h.shopName}</div>
              <div className="text-sm text-gray-600">{h.shopAddress}</div>
              <div className="text-sm">{h.area}, {h.city}</div>
              <div className="text-sm capitalize">{h.veg_nonveg}</div>
              <div className="text-sm">{h.mealName} — ₹{h.price}</div>
              <div className="text-xs">Window: {h.duration} min • Left: {h.mealCount}</div>
            </li>
          ))}
        </ul>
      </div>

      {/* Map */}
      <div className="flex-1">
        <MapContainer center={center} zoom={12} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {filtered.map(h => {
            const position: LatLngExpression = (h.latitude && h.longitude)
              ? [Number(h.latitude), Number(h.longitude)]
              : center;
            return (
              <Marker key={h.hid} position={position}>
                <Popup>
                  <div className="space-y-1">
                    <div className="font-semibold">{h.shopName}</div>
                    <div className="text-sm">{h.shopAddress}</div>
                    <div className="text-sm">{h.area}, {h.city}</div>
                    <div className="text-sm capitalize">{h.veg_nonveg}</div>
                    <div className="text-sm">{h.mealName} — ₹{h.price}</div>
                    <div className="text-xs">Window: {h.duration} min • Left: {h.mealCount}</div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
}
