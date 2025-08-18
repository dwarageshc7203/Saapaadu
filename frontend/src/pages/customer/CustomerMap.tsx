import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import axios from "axios";

interface Hotspot {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  vendor: { name: string };
}

export default function CustomerMap() {
  const [hotspots, setHotspots] = useState<Hotspot[]>([]);
  const [position, setPosition] = useState<LatLngExpression>([13.0827, 80.2707]); // Chennai default

  useEffect(() => {
    axios.get("/hotspots").then((res) => setHotspots(res.data));

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
      },
      () => console.warn("Could not get location")
    );
  }, []);

  return (
    <MapContainer center={position} zoom={13} style={{ height: "100vh", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {hotspots.map((hs) => (
        <Marker key={hs.id} position={[hs.latitude, hs.longitude]}>
          <Popup>
            {hs.name} <br /> Vendor: {hs.vendor?.name}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
