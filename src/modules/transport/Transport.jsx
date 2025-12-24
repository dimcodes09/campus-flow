import { useState, useEffect } from "react";
import { useTransport } from "../../context/TransportContext";
import BusList from "./BusList";
import MapView from "./MapView";
import SimulationControl from "./SimulationControl";
import BusDetails from "./BusDetails";
import StudentSearch from "./StudentSearch";

import {
  FiMapPin,
  FiNavigation,
  FiActivity,
  FiTruck
} from "react-icons/fi";

export default function Transport() {
  const { buses } = useTransport();

  const [selectedBusId, setSelectedBusId] = useState(null);
  const [from, setFrom] = useState(
    () => localStorage.getItem("from") || ""
  );
  const [to, setTo] = useState(
    () => localStorage.getItem("to") || ""
  );

  const busArray = Object.entries(buses).map(([id, bus]) => ({
    id,
    ...bus
  }));

  // 🔥 REAL FILTER LOGIC
  const filteredBuses = busArray.filter(bus => {
    if (!from && !to) return true;

    const route = bus.route.toLowerCase();
    return (
      route.includes(from.toLowerCase()) &&
      route.includes(to.toLowerCase())
    );
  });

  // ✅ AUTO-SELECT FIRST MATCHING BUS
  useEffect(() => {
    if (filteredBuses.length === 0) {
      setSelectedBusId(null);
      return;
    }

    // auto-select first bus if none selected OR selected bus not in results
    if (
      !selectedBusId ||
      !filteredBuses.some(b => b.id === selectedBusId)
    ) {
      setSelectedBusId(filteredBuses[0].id);
    }
  }, [filteredBuses, selectedBusId]);

  // ✅ SAVE SEARCH (UX MEMORY)
  useEffect(() => {
    localStorage.setItem("from", from);
    localStorage.setItem("to", to);
  }, [from, to]);

  const selectedBus = selectedBusId
    ? buses[selectedBusId]
    : null;

  return (
    <div className="max-w-6xl mx-auto space-y-6">

      {/* Header */}
{/* Header */}
<div className="flex items-center justify-between">
  <div className="space-y-1">
    <h1 className="text-3xl font-semibold tracking-wide flex items-center gap-2">
      <FiTruck className="text-cyan-400" />
      Campus Transport
    </h1>

    <p className="text-white/50 text-sm flex items-center gap-2">
      <FiMapPin className="text-white/40" />
      Simulated bus movement for campus transport visualization
    </p>
  </div>

  <div
    className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full
               bg-blue-500/10 text-blue-400 border border-blue-500/30"
  >
    <FiActivity className="text-blue-400" />
    Demo Simulation
  </div>
</div>

      {/* Search */}
      <StudentSearch
        from={from}
        to={to}
        setFrom={setFrom}
        setTo={setTo}
      />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <BusList
          buses={filteredBuses}
          selectedBusId={selectedBusId}
          setSelectedBusId={setSelectedBusId}
        />

        <MapView
          selectedBusId={selectedBusId}
          visibleBusIds={filteredBuses.map(b => b.id)}
        />

        <BusDetails bus={selectedBus} />
      </div>

      <SimulationControl />
    </div>
  );
}
