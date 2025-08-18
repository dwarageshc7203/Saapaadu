import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const VendorHotspots = () => {
  const { token } = useAuth();
  const [hotspots, setHotspots] = useState<any[]>([]);
  const [position, setPosition] = useState<[number, number]>([12.9716, 77.5946]); // default Bangalore
  const [newHotspot, setNewHotspot] = useState<[number, number] | null>(null);

  // custom icon
  const hotspotIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [30, 30],
  });

  useEffect(() => {
    axios
      .get("/hotspots")
      .then((res) => setHotspots(res.data))
      .catch((err) => console.error(err));
  }, []);

  const addHotspot = async (name: string) => {
    if (!newHotspot) return;
    try {
      const res = await axios.post(
        "/hotspots",
        { name, latitude: newHotspot[0], longitude: newHotspot[1] },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setHotspots([...hotspots, res.data]);
      setNewHotspot(null);
    } catch (err) {
      console.error(err);
    }
  };

  // click handler for map
  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        setNewHotspot([e.latlng.lat, e.latlng.lng]);
      },
    });
    return null;
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Hotspots</h1>

      <MapContainer center={position} zoom={13} style={{ height: "500px", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapClickHandler />

        {hotspots.map((h) => (
          <Marker key={h.id} position={[h.latitude, h.longitude]} icon={hotspotIcon}>
            <Popup>{h.name}</Popup>
          </Marker>
        ))}

        {newHotspot && (
          <Marker position={newHotspot} icon={hotspotIcon}>
            <Popup>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const name = (e.currentTarget.elements.namedItem("name") as HTMLInputElement).value;
                  addHotspot(name);
                }}
              >
                <input
                  name="name"
                  type="text"
                  placeholder="Hotspot name"
                  className="border p-1 mb-2 w-full"
                  required
                />
                <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded">
                  Save
                </button>
              </form>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default VendorHotspots;
