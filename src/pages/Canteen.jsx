import { useCanteen } from "../context/CanteenContext";
import { useState } from "react";

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

  // 🔍 FILTER LOGIC (THIS WAS MISSING)
  const filteredMenu = menu.filter(
    item =>
      item.visible &&
      item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-1">
          Campus Canteen
        </h1>
        <p className="text-gray-400 text-sm">
          Live canteen status and menu availability (demo)
        </p>
      </div>

      {/* Rush Indicator */}
      <div className="border border-white/10 rounded-lg p-4">
        <p className="text-sm text-gray-400">
          Current Rush Level
        </p>
        <p className={`text-xl font-semibold ${rushColor}`}>
          {rushLevel.toUpperCase()}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {bestTimeText}
        </p>
      </div>

      {/* 🔍 SEARCH BAR */}
      <input
        type="text"
        placeholder="Search food item..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full md:w-1/2 bg-black border border-white/20 px-3 py-2 rounded text-sm"
      />

      {/* MENU LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMenu.map(item => (
          <div
            key={item.id}
            className="border border-white/10 rounded-lg p-4"
          >
            <div className="flex justify-between">
              <div>
                <h3 className="font-semibold">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-400">
                  ₹{item.price}
                  {item.previousPrice !== item.price && (
                    <span className="text-xs text-yellow-400 ml-2">
                      (updated)
                    </span>
                  )}
                </p>
              </div>

              <span
                className={`text-xs px-2 py-1 rounded ${
                  item.status === "available"
                    ? "bg-green-500/10 text-green-400"
                    : item.status === "limited"
                    ? "bg-yellow-500/10 text-yellow-400"
                    : "bg-red-500/10 text-red-400"
                }`}
              >
                {item.status}
              </span>
            </div>

            {item.reason && (
              <p className="text-xs text-gray-400 mt-2">
                {item.reason}
              </p>
            )}

            {item.refillTime && (
              <p className="text-xs text-gray-500">
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
