import { calculateETA } from "../../utils/eta";

export default function BusDetails({ bus }) {
  if (!bus) {
    return (
      <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-white/50">
        Select a bus to view details
      </div>
    );
  }

  const stopsWithETA = calculateETA(bus);

  return (
    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
      <h2 className="text-xl font-semibold mb-1">{bus.name}</h2>
      <p className="text-sm text-white/50 mb-4">{bus.route}</p>

      <div className="space-y-2">
        {stopsWithETA.map((stop, i) => (
          <div
            key={i}
            className="flex justify-between items-center px-3 py-2 rounded-lg
                       bg-black/30 border border-white/5 text-sm"
          >
            <span>{stop.name}</span>

            <span
              className={
                stop.eta === "Arriving"
                  ? "text-emerald-400 font-medium"
                  : "text-blue-400"
              }
            >
              {stop.eta}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
