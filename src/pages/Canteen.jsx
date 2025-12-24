import { useCanteen } from "../context/CanteenContext";
import { useState } from "react";
import {
  FiSearch,
  FiClock,
  FiAlertCircle,
  FiTag,
  FiTrendingUp
} from "react-icons/fi";

export default function Canteen() {
  const { menu, rushLevel } = useCanteen();
  const [search, setSearch] = useState("");

  const rushColor =
    rushLevel === "high"
      ? "text-red-400"
      : rushLevel === "medium"
      ? "text-yellow-400"
      : "text-green-400";

  const bestTimeText =
    rushLevel === "high"
      ? "Avoid now. Visit after 3:30 PM"
      : rushLevel === "medium"
      ? "Moderate rush. Visit after 3 PM"
      : "Good time to visit";

  const filteredMenu = menu.filter(
    item =>
      item.visible &&
      item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          Campus Canteen
        </h1>
        <p className="text-gray-400 text-sm">
          Live canteen status and menu availability (demo)
        </p>
      </div>

      {/* RUSH INDICATOR */}
      <div className="border border-white/10 rounded-lg p-4 bg-black/40 backdrop-blur">
        <p className="text-sm text-gray-400 flex items-center gap-2">
          <FiTrendingUp className="text-white/50" />
          Current Rush Level
        </p>

        <p className={`text-xl font-semibold ${rushColor}`}>
          {rushLevel.toUpperCase()}
        </p>

        <p className="text-xs text-gray-500 mt-1 flex items-center gap-2">
          <FiClock />
          {bestTimeText}
        </p>
      </div>

      {/* SEARCH */}
      <div className="relative w-full md:w-1/2">
        <FiSearch className="absolute left-3 top-2.5 text-white/40 text-sm" />
        <input
          type="text"
          placeholder="Search food item..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-black/40 border border-white/20
                     pl-9 pr-3 py-2 rounded text-sm
                     focus:outline-none focus:border-cyan-400/60"
        />
      </div>

      {/* MENU LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMenu.map(item => (
          <div
            key={item.id}
            className="border border-white/10 rounded-lg p-4
                       bg-black/40 backdrop-blur
                       transition
                       hover:border-cyan-400/40
                       hover:bg-black/50"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold flex items-center gap-2">
                  <FiTag className="text-cyan-400/70 text-sm" />
                  {item.name}
                </h3>

                <p className="text-sm text-gray-400 mt-1">
                  ₹{item.price}
                  {item.previousPrice !== item.price && (
                    <span className="text-xs text-yellow-400 ml-2">
                      (updated)
                    </span>
                  )}
                </p>
              </div>

              <span
                className={`text-xs px-2 py-1 rounded-md
                  ${
                    item.status === "available"
                      ? "bg-green-500/10 text-green-400 border border-green-500/30"
                      : item.status === "limited"
                      ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/30"
                      : "bg-red-500/10 text-red-400 border border-red-500/30"
                  }`}
              >
                {item.status}
              </span>
            </div>

            {item.reason && (
              <p className="text-xs text-gray-400 mt-2 flex items-center gap-2">
                <FiAlertCircle className="text-white/40" />
                {item.reason}
              </p>
            )}

            {item.refillTime && (
              <p className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                <FiClock className="text-white/40" />
                Expected refill: {item.refillTime}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* EMPTY STATE */}
      {filteredMenu.length === 0 && (
        <p className="text-sm text-gray-500">
          No matching items found.
        </p>
      )}
    </div>
  );
}
