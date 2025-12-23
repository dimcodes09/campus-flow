import { useEffect, useRef } from "react";
import { useTransport } from "../../context/TransportContext";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const BUS_COLORS = {
  "101": "#22c55e",
  "102": "#facc15",
  "103": "#3b82f6",
};

export default function MapView({ selectedBusId, visibleBusIds = [] }) {
  const { buses } = useTransport();

  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef({});
  const routesRef = useRef({});
  const animFromRef = useRef({});

  /* ================= MAP INIT ================= */
  useEffect(() => {
    if (mapRef.current || !mapContainerRef.current) return;

    mapRef.current = L.map(mapContainerRef.current, {
      zoomControl: false,
      attributionControl: false,
    }).setView([23.2599, 77.4126], 12);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
      mapRef.current
    );

    // 🔥 CRITICAL: force resize after mount
    setTimeout(() => {
      mapRef.current.invalidateSize();
    }, 200);
  }, []);

  /* ================= RESIZE FIX ================= */
  useEffect(() => {
    if (!mapRef.current) return;

    const handleResize = () => {
      mapRef.current.invalidateSize();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ================= SMOOTH ANIMATION ================= */
  function animateMarker(marker, from, to, duration = 700) {
    const start = performance.now();

    function frame(now) {
      const t = Math.min((now - start) / duration, 1);

      const lat = from[0] + (to[0] - from[0]) * t;
      const lng = from[1] + (to[1] - from[1]) * t;

      marker.setLatLng([lat, lng]);
      if (t < 1) requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  }

  /* ================= MAIN UPDATE LOOP ================= */
  useEffect(() => {
    if (!mapRef.current) return;

    Object.entries(buses).forEach(([id, bus]) => {
      if (!bus?.currentLocation || !bus.stops) return;

      // FILTER
      if (visibleBusIds.length && !visibleBusIds.includes(id)) {
        if (markersRef.current[id]) {
          mapRef.current.removeLayer(markersRef.current[id]);
          delete markersRef.current[id];
        }
        if (routesRef.current[id]) {
          mapRef.current.removeLayer(routesRef.current[id]);
          delete routesRef.current[id];
        }
        return;
      }

      const color = BUS_COLORS[id] || "#38bdf8";

      // ROUTE
      if (!routesRef.current[id]) {
        routesRef.current[id] = L.polyline(
          bus.stops.map(s => s.coordinates),
          {
            color,
            weight: 4,
            opacity: 0.4,
            dashArray: "6 10",
          }
        ).addTo(mapRef.current);
      }

      // MARKER
      if (!markersRef.current[id]) {
        markersRef.current[id] = L.circleMarker(bus.currentLocation, {
          radius: 8,
          color,
          fillColor: color,
          fillOpacity: 1,
          weight: 3,
        }).addTo(mapRef.current);

        markersRef.current[id].bindPopup(
          `<strong>${bus.name}</strong><br/>${bus.route}<br/>Status: ${bus.status}`
        );

        animFromRef.current[id] = bus.currentLocation;
        return;
      }

      animateMarker(
        markersRef.current[id],
        animFromRef.current[id],
        bus.currentLocation
      );

      animFromRef.current[id] = bus.currentLocation;

      // SELECTED BUS
      if (selectedBusId === id) {
        mapRef.current.setView(bus.currentLocation, 14, { animate: true });
        markersRef.current[id].openPopup();
        routesRef.current[id].setStyle({ opacity: 0.9, dashArray: null });
      } else {
        routesRef.current[id].setStyle({ opacity: 0.35, dashArray: "6 10" });
      }
    });
  }, [buses, selectedBusId, visibleBusIds]);

  return (
    <div
      className="
        relative w-full rounded-2xl overflow-hidden
        border border-white/10 bg-black/30 backdrop-blur
        min-h-[260px] sm:min-h-[320px] lg:min-h-[420px]
      "
    >
      <div ref={mapContainerRef} className="absolute inset-0" />

      {/* LEGEND */}
      <div className="absolute bottom-3 left-3 bg-black/70 px-3 py-2 rounded-lg text-xs space-y-1">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-green-500" /> Express
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-yellow-400" /> City
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-blue-500" /> Rapid
        </div>
      </div>
    </div>
  );
}
