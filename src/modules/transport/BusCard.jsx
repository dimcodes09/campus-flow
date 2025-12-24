import {
  FiTruck,
  FiUsers,
  FiActivity
} from "react-icons/fi";

export default function BusCard({ bus, isSelected, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`
        cursor-pointer rounded-xl p-4 border transition
        ${isSelected
          ? "bg-cyan-500/10 border-cyan-400/60 shadow-[0_0_20px_rgba(34,211,238,0.25)]"
          : "bg-black/40 border-white/10 hover:bg-black/50 hover:border-cyan-400/40"}
      `}
    >
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h3 className="font-medium tracking-wide flex items-center gap-2">
          <FiTruck className="text-cyan-400 text-sm" />
          {bus.name}
        </h3>

        <span
          className={`text-xs px-2 py-1 rounded-md flex items-center gap-1
            ${bus.status === "on-time"
              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
              : "bg-red-500/10 text-red-400 border border-red-500/30"}
          `}
        >
          <FiActivity className="text-xs" />
          {bus.status}
        </span>
      </div>

      {/* ROUTE */}
      <p className="text-sm text-white/60 mt-2">
        {bus.route}
      </p>

      {/* CAPACITY */}
      <div className="mt-3 text-xs text-white/50 flex items-center gap-2">
        <FiUsers className="text-white/40" />
        Capacity: {bus.capacity} seats
      </div>
    </div>
  );
}
