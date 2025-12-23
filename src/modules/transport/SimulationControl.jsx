import { useTransport } from "../../context/TransportContext";

export default function SimulationControl() {
  const { isSimulating, setIsSimulating } = useTransport();

  return (
    <div className="flex items-center justify-between rounded-xl border border-white/10 p-4 bg-white/5">
      <div className="flex items-center gap-2 text-sm">
        <span
          className={`h-2 w-2 rounded-full ${
            isSimulating ? "bg-emerald-400 animate-pulse" : "bg-white/30"
          }`}
        />
        <span className="text-white/70">
          {isSimulating ? "Live Simulation Running" : "Simulation Paused"}
        </span>
      </div>

      <button
        onClick={() => setIsSimulating(prev => !prev)}
        className={`px-4 py-2 rounded-lg text-sm font-semibold transition
          ${
            isSimulating
              ? "bg-red-600 hover:bg-red-700"
              : "bg-emerald-600 hover:bg-emerald-700"
          }`}
      >
        {isSimulating ? "Stop" : "Start"}
      </button>
    </div>
  );
}
