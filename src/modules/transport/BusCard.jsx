export default function BusCard({ bus, isSelected, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`
        cursor-pointer rounded-xl p-4 border transition
        ${isSelected
          ? "bg-blue-500/10 border-blue-400"
          : "bg-white/5 border-white/10 hover:bg-white/10"}
      `}
    >
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">{bus.name}</h3>

        <span
          className={`text-xs px-2 py-1 rounded-full
            ${bus.status === "on-time"
              ? "bg-emerald-500/20 text-emerald-400"
              : "bg-red-500/20 text-red-400"}
          `}
        >
          {bus.status}
        </span>
      </div>

      <p className="text-sm text-white/60 mt-1">{bus.route}</p>

      <div className="mt-3 text-xs text-white/40">
        Capacity: {bus.capacity} seats
      </div>
    </div>
  );
}
