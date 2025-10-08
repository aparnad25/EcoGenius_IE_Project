import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { motion } from "framer-motion";
import { Map, Pin } from "lucide-react";

// Fix for default marker icon issue with webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const councilCenters = {
  melbourne: { lat: -37.8136, lng: 144.9631 },
  monash: { lat: -37.9149, lng: 145.1633 },
  "port-phillip": { lat: -37.8659, lng: 144.9788 },
  yarra: { lat: -37.811, lng: 144.9969 },
};

export default function RecyclingMap({ councilId }) {
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mapCenter, setMapCenter] = useState([-37.8136, 144.9631]);
  const [mapKey, setMapKey] = useState(councilId);

  useEffect(() => {
    const fetchCenters = async () => {
      setLoading(true);
      try {
        // 临时 mock 数据 — 可后续替换为 CSV 或 API
        const mockCenters = {
          melbourne: [
            {
              id: 1,
              name: "Melbourne Recycling Hub",
              type: "Drop-off Centre",
              latitude: -37.8136,
              longitude: 144.9631,
              address: "123 Collins Street, Melbourne",
              accepted_items: ["Glass bottles", "E-waste", "Plastic bottles"],
            },
          ],
          monash: [
            {
              id: 2,
              name: "Monash Resource Recovery Centre",
              type: "Drop-off Centre",
              latitude: -37.9149,
              longitude: 145.1633,
              address: "2 Ferntree Gully Road, Clayton",
              accepted_items: ["Paper", "Cardboard", "Metal cans"],
            },
          ],
          "port-phillip": [
            {
              id: 3,
              name: "Port Phillip Recycle Depot",
              type: "Transfer Station",
              latitude: -37.8659,
              longitude: 144.9788,
              address: "St Kilda Road, South Melbourne",
              accepted_items: ["Plastic containers", "Old furniture"],
            },
          ],
          yarra: [
            {
              id: 4,
              name: "Yarra Recycling Facility",
              type: "Transfer Station",
              latitude: -37.811,
              longitude: 144.9969,
              address: "Smith Street, Collingwood",
              accepted_items: ["Paper", "Glass", "Plastic"],
            },
          ],
        };

        const data = mockCenters[councilId] || [];


        setCenters(data);
        if (data.length > 0) {
          const councilLocation = councilCenters[councilId];
          setMapCenter([councilLocation.lat, councilLocation.lng]);
        } else {
          const councilLocation =
            councilCenters[councilId] || councilCenters.melbourne;
          setMapCenter([councilLocation.lat, councilLocation.lng]);
        }
        setMapKey(councilId + Date.now()); // Force re-render of map
      } catch (error) {
        console.error("Error fetching recycling centers:", error);
      }
      setLoading(false);
    };

    if (councilId) {
      fetchCenters();
    }
  }, [councilId]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto mb-4"></div>
        <p className="text-slate-600">Loading map of recycling centers...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold text-slate-900 mb-3">
          Recycling & Disposal Centers
        </h2>
        <p className="text-lg text-slate-600">
          Find facilities near you for special waste items
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="shadow-lg bg-white/90 backdrop-blur-sm overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-teal-50 to-cyan-50">
            <CardTitle className="flex items-center gap-2 text-teal-800">
              <Map className="w-5 h-5" />
              Map of Local Facilities
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <MapContainer
              key={mapKey}
              center={mapCenter}
              zoom={12}
              scrollWheelZoom={false}
              style={{ height: "400px", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {centers.map((center) => (
                <Marker
                  key={center.id}
                  position={[center.latitude, center.longitude]}
                >
                  <Popup>
                    <div className="font-sans">
                      <h3 className="font-bold text-base mb-1">
                        {center.name}
                      </h3>
                      <Badge variant="secondary" className="mb-2">
                        {center.type}
                      </Badge>
                      <p className="text-sm text-slate-600 mb-1 flex items-start gap-1">
                        <Pin className="w-3 h-3 mt-0.5 flex-shrink-0" />
                        {center.address}
                      </p>
                      <p className="text-sm font-medium">Accepts:</p>
                      <ul className="list-disc list-inside text-xs">
                        {center.accepted_items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
