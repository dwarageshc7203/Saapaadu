import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import L from "leaflet";
import type { Hotspot } from "@/types";

interface Props {
  hotspots: Hotspot[];
}

const UserLocationMarker = () => {
  const map = useMap();
  const [position, setPosition] = useState<LatLngExpression | null>(null);

  useEffect(() => {
    map.locate().on("locationfound", (e) => {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    });

    return () => {
      map.stopLocate();
    };
  }, [map]);

  if (!position) return null;

  const userIcon = new L.Icon({
    iconUrl: "/user-pin.png", // add your user pointer icon in public folder
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  return (
    <Marker position={position} icon={userIcon}>
      <Popup>You are here</Popup>
    </Marker>
  );
};

export default function CustomerMap({ hotspots }: Props) {
  const center: LatLngExpression = [13.0827, 80.2707]; // Chennai default

  const vegPin = new L.Icon({
    iconUrl: "/pin-green.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  const nonVegPin = new L.Icon({
    iconUrl: "/pin-red.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  return (
    <MapContainer center={center} zoom={12} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <UserLocationMarker />

      {hotspots.map((h) => {
        const position: LatLngExpression =
          h.latitude && h.longitude
            ? [Number(h.latitude), Number(h.longitude)]
            : center;
        const icon = h.veg_nonveg === "veg" ? vegPin : nonVegPin;

        return (
          <Marker key={h.hid} position={position} icon={icon}>
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
