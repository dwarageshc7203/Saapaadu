import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import type { Hotspot } from "@/types";

interface Props {
  hotspots: Hotspot[];
}

export default function CustomerMap({ hotspots }: Props) {
  const center: LatLngExpression = [13.0827, 80.2707]; // Chennai default

  return (
    <MapContainer center={center} zoom={12} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {hotspots.map((h) => {
        const position: LatLngExpression =
          h.latitude && h.longitude
            ? [Number(h.latitude), Number(h.longitude)]
            : center;
        return (
          <Marker key={h.hid} position={position}>
            <Popup>
              <div className="space-y-1">
                <div className="font-semibold">{h.shopName}</div>
                <div className="text-sm">{h.shopAddress}</div>
                <div className="text-sm">
                  {h.area}, {h.city}
                </div>
                <div className="text-sm capitalize">{h.veg_nonveg}</div>
                <div className="text-sm">
                  {h.mealName} — ₹{h.price}
                </div>
                <div className="text-xs">
                  Window: {h.duration} min • Left: {h.mealCount}
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
