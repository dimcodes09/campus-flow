import BusCard from "./BusCard";

export default function BusList({ buses, selectedBusId, setSelectedBusId }) {

  if (buses.length === 0) {
  return (
    <div className="p-6 rounded-xl bg-white/5 border border-white/10 text-center text-white/50">
      No buses found for this route
    </div>
  );
}

  return (
    <div className="space-y-3">
      {buses.map(bus => (
        <BusCard
          key={bus.id}
          bus={bus}
          isSelected={selectedBusId === bus.id}
          onClick={() => setSelectedBusId(bus.id)}
        />
      ))}
    </div>
  );
}
