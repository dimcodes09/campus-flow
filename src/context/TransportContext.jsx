import { createContext, useContext, useEffect, useState } from "react";
import { busData as rawBusData } from "../data/busData";

const TransportContext = createContext();

/* ================================
   🔒 HARD DUMMY COORDINATES (BHOPAL)
   NEVER 0,0
================================ */
const DUMMY_COORDS = [
  [23.249142916394486, 77.50429863655651],
  [23.25255760217168, 77.47113582599407]
];

/* ================================
   🧠 SANITIZE STOPS (SINGLE SOURCE)
================================ */
function sanitizeStops(stops) {
  // 🚑 No stops or garbage → inject dummy route
  if (!Array.isArray(stops) || stops.length < 2) {
    return [
      { name: "Start", coordinates: DUMMY_COORDS[0] },
      { name: "End", coordinates: DUMMY_COORDS[1] }
    ];
  }

  return stops.map((s, i) => {
    const lat = Number(s.coordinates?.[0] ?? s.lat);
    const lng = Number(s.coordinates?.[1] ?? s.lng);

    return {
      name: s.name || `Stop ${i + 1}`,
      coordinates:
        isFinite(lat) && isFinite(lng)
          ? [lat, lng]
          : DUMMY_COORDS[i % DUMMY_COORDS.length]
    };
  });
}

/* ================================
   🔒 NORMALIZE ANY BUS (RAW / ADMIN / RESTORED)
================================ */
function normalizeBus(bus) {
  const safeStops = sanitizeStops(bus.stops);

  return {
    ...bus,
    speed: Number(bus.speed) || 30,
    capacity: Number(bus.capacity) || 30,
    stops: safeStops,
    currentStopIndex: bus.currentStopIndex ?? 0,
    currentLocation: safeStops[0].coordinates,
    progress: bus.progress ?? 0
  };
}

/* ================================
   PROVIDER
================================ */
export const TransportProvider = ({ children }) => {
  const [buses, setBuses] = useState(() => {
    try {
      const saved = localStorage.getItem("campus_buses");
      if (saved) {
        const parsed = JSON.parse(saved);
        const fixed = {};
        Object.entries(parsed).forEach(([id, bus]) => {
          fixed[id] = normalizeBus(bus);
        });
        return fixed;
      }
    } catch {
      console.warn("Failed to load buses from storage");
    }

    const initial = {};
    Object.entries(rawBusData).forEach(([id, bus]) => {
      initial[id] = normalizeBus(bus);
    });
    return initial;
  });

  const [isSimulating, setIsSimulating] = useState(false);

  /* 💾 Persist ALWAYS */
  useEffect(() => {
    localStorage.setItem("campus_buses", JSON.stringify(buses));
  }, [buses]);

  /* ================================
     ADMIN ACTIONS
  ================================ */

  const addBus = bus => {
    if (!bus?.id) return;

    setBuses(prev => ({
      ...prev,
      [bus.id]: normalizeBus(bus)
    }));
  };

  const updateBus = (id, updates) => {
    setBuses(prev => ({
      ...prev,
      [id]: normalizeBus({
        ...prev[id],
        ...updates
      })
    }));
  };

  const removeBus = id => {
    setBuses(prev => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  const updateStatus = (id, status) => {
    setBuses(prev => ({
      ...prev,
      [id]: { ...prev[id], status }
    }));
  };

  /* ================================
     ⏱ SIMULATION LOOP
  ================================ */
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setBuses(prev => {
        const updated = {};

        Object.entries(prev).forEach(([id, bus]) => {
          const next =
            (bus.currentStopIndex + 1) % bus.stops.length;

          updated[id] = {
            ...bus,
            currentStopIndex: next,
            currentLocation: bus.stops[next].coordinates
          };
        });

        return updated;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isSimulating]);

  return (
    <TransportContext.Provider
      value={{
        buses,
        isSimulating,
        setIsSimulating,
        addBus,
        updateBus,
        removeBus,
        updateStatus
      }}
    >
      {children}
    </TransportContext.Provider>
  );
};

export const useTransport = () => useContext(TransportContext);
