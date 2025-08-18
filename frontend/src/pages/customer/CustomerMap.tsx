import { useEffect, useMemo, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import type { LatLngExpression } from 'leaflet';
import { api } from '../../api/axios';
import type { Hotspot } from '@/types';

export default function CustomerMap() {
  const [hotspots, setHotspots] = useState<Hotspot[]>([]);
  const [vegFilter, setVegFilter] = useState<'all' | 'veg' | 'nonveg'>('all');
  const [areaQuery, setAreaQuery] = useState('');

  useEffect(() => {
    const load = async () => {
      const { data } = await api.get<Hotspot[]>('/hotspots');
      // if decimals arrive as strings, normalize here:
      const normalized = data.map(h => ({ ...h, price: Number(h.price) }));
      setHotspots(normalized);
    };
    load();
    const id = setInterval(load, 45000); // light polling
    return () => clearInterval(id);
  }, []);

  const filtered = useMemo(() => {
    return hotspots.filter(h => {
      const vegOk = vegFilter === 'all' ? true : h.veg_nonveg === vegFilter;
      const areaOk = areaQuery ? h.area.toLowerCase().includes(areaQuery.toLowerCase()) : true;
      return vegOk && areaOk;
    });
  }, [hotspots, vegFilter, areaQuery]);

  const center: LatLngExpression = [13.0827, 80.2707]; // Chennai default; optionally use geolocation

  return (
    <div className="flex flex-col gap-3 p-4">
      <div className="flex gap-2">
        <select value={vegFilter} onChange={(e) => setVegFilter(e.target.value as any)} className="border p-2 rounded">
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

      <MapContainer center={center} zoom={12} style={{ height: '70vh', width: '100%' }}>
        <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {filtered.map(h => {
          const position: LatLngExpression = (h.latitude && h.longitude)
            ? [Number(h.latitude), Number(h.longitude)]
            : center; // fallback center if no coords
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
  );
}
