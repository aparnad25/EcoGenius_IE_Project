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

// Default map centers for supported councils
const councilCenters = {
  melbourne: { lat: -37.8136, lng: 144.9631 },
  monash: { lat: -37.9149, lng: 145.1633 },
  "port-phillip": { lat: -37.8659, lng: 144.9788 },
  yarra: { lat: -37.811, lng: 144.9969 },
};

// Mapping between councilId (router parameter) 与 CSV 文件里的 Council 名称
const councilNameMap = {
  melbourne: "Melbourne",
  monash: "Monash",
  "port-phillip": "Port Phillip",
  yarra: "Yarra",
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
        const res = await fetch(
          encodeURI(
            "/Victoria's-waste-and-resource-recovery-infrastructure-map-data-March-2025.csv"
          )
        );
        const text = await res.text();

        // parse CSV data
        const rows = text.split("\n").map((r) => r.split(","));
        const header = rows[0].map((h) => h.trim());
        const data = rows
          .slice(1)
          .filter((r) => r.length > 1)
          .map((r) =>
            Object.fromEntries(r.map((v, i) => [header[i], v.trim()]))
          );

        // filter by selected council
        const targetCouncil = councilNameMap[councilId];
        const filtered = data.filter((item) => {
          const name = item["Council"]?.toLowerCase();
          return (
            (name?.includes("melbourne") ||
              name?.includes("monash") ||
              name?.includes("port phillip") ||
              name?.includes("yarra")) &&
            name?.includes(targetCouncil.toLowerCase())
          );
        });

        // format data for map
        const formatted = filtered.map((item, index) => ({
          id: index,
          name: item["Facility Name"] || "Unknown Facility",
          type:
            item["Infrastructure Type"] || item["Facility Type"] || "Facility",
          latitude: parseFloat(item["Latitude"]),
          longitude: parseFloat(item["Longitude"]),
          address: item["Address"],
          accepted_items: [
            "General recycling",
            "Organic waste",
            "Hazardous waste",
          ],
        }));

        setCenters(formatted);

        // Set map center
        const councilLocation =
          councilCenters[councilId] || councilCenters.melbourne;
        setMapCenter([councilLocation.lat, councilLocation.lng]);
        setMapKey(councilId + Date.now());
      } catch (error) {
        console.error("Error loading CSV recycling centers:", error);
      }
      setLoading(false);
    };

    if (councilId) fetchCenters();
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
          Facilities in {councilNameMap[councilId]}
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
              bounds={
                centers.length > 0
                  ? L.latLngBounds(
                      centers.map((c) => [c.latitude, c.longitude])
                    )
                  : L.latLngBounds([[mapCenter[0], mapCenter[1]]])
              }
              boundsOptions={{ padding: [80, 80], maxZoom: 13 }}
              scrollWheelZoom={false}
              style={{ height: "420px", width: "100%" }}
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
                      {/* Route button */}
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                          `${center.latitude},${center.longitude}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open directions to ${center.name} in Google Maps`}
                        className="inline-flex items-center mt-3 px-4 py-2 text-sm font-medium
             border border-emerald-600 !text-emerald-700 no-underline 
             bg-emerald-50/60 rounded-lg shadow-sm
             hover:bg-emerald-500 hover:!text-white hover:shadow-md
             transition-all duration-200"
                      >
                        <Map className="w-4 h-4 mr-2" />
                        <span>Open in Google Maps</span>
                      </a>
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
