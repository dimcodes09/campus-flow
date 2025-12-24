import { useState } from "react";
import {
  FiMapPin,
  FiHome,
  FiCoffee,
  FiBook,
  FiTruck,
  FiNavigation
} from "react-icons/fi";

const locations = [
  {
    id: 1,
    key: "academic",
    name: "Main Academic Block",
    type: "Academic",
    description: "Lecture halls, departments, and faculty offices",
    icon: <FiBook />,
  },
  {
    id: 2,
    key: "labs",
    name: "Computer Labs",
    type: "Lab",
    description: "CS, IT, and research laboratories",
    icon: <FiMapPin />,
  },
  {
    id: 3,
    key: "canteen",
    name: "Central Canteen",
    type: "Service",
    description: "Food court for students and staff",
    icon: <FiCoffee />,
  },
  {
    id: 4,
    key: "hostel",
    name: "Boys Hostel",
    type: "Residential",
    description: "Student residential block",
    icon: <FiHome />,
  },
  {
    id: 5,
    key: "bus",
    name: "Campus Bus Stop",
    type: "Transport",
    description: "Primary pickup and drop point",
    icon: <FiTruck />,
  },
];

const routes = {
  academic: "M450 350 L450 230 L190 230 L190 160",
  labs: "M450 350 L450 160 L630 160",
  canteen: "M450 350 L630 350",
  hostel: "M450 350 L250 350",
};

export default function CampusMap() {
  const [selected, setSelected] = useState(null);
  const [navigatingTo, setNavigatingTo] = useState(null);

  const active = key => selected?.key === key;

  const selectLocation = loc => {
    setSelected(loc);
    setNavigatingTo(loc.key !== "bus" ? loc : null);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          Campus Map
        </h1>
        <p className="text-sm text-white/50">
          Interactive campus layout with navigation simulation
        </p>
      </div>

      {/* MAP CONTAINER */}
      <div className="border border-white/10 rounded-2xl p-4
                      bg-black/40 backdrop-blur
                      hover:border-cyan-400/30 transition">

        <svg
          viewBox="0 0 900 450"
          className="w-full h-[380px] rounded-xl bg-zinc-900"
        >
          {/* Roads */}
          <rect x="0" y="210" width="900" height="40" fill="#18181b" />
          <rect x="420" y="0" width="40" height="450" fill="#18181b" />

          {/* Navigation Path */}
          {navigatingTo && (
            <path
              d={routes[navigatingTo.key]}
              fill="none"
              stroke="#22c55e"
              strokeWidth="4"
              strokeDasharray="8 8"
              strokeLinecap="round"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="120"
                to="0"
                dur="1.2s"
                repeatCount="1"
              />
            </path>
          )}

          {/* Buildings */}
          <rect x="80" y="60" width="220" height="100" rx="10"
            fill={active("academic") ? "#2563eb" : "#1f2937"}
            onClick={() => selectLocation(locations[0])}
            className="cursor-pointer"
          />
          <text x="130" y="115" fill="#e5e7eb" fontSize="13">🎓 Academic</text>

          <rect x="520" y="60" width="220" height="100" rx="10"
            fill={active("labs") ? "#6366f1" : "#1f2937"}
            onClick={() => selectLocation(locations[1])}
            className="cursor-pointer"
          />
          <text x="575" y="115" fill="#e5e7eb" fontSize="13">💻 Labs</text>

          <rect x="540" y="290" width="180" height="80" rx="10"
            fill={active("canteen") ? "#f59e0b" : "#1f2937"}
            onClick={() => selectLocation(locations[2])}
            className="cursor-pointer"
          />
          <text x="585" y="335" fill="#e5e7eb" fontSize="13">🍽 Canteen</text>

          <rect x="120" y="290" width="260" height="90" rx="10"
            fill={active("hostel") ? "#22c55e" : "#1f2937"}
            onClick={() => selectLocation(locations[3])}
            className="cursor-pointer"
          />
          <text x="190" y="340" fill="#e5e7eb" fontSize="13">🏠 Hostel</text>

          <circle cx="450" cy="350" r="18"
            fill={active("bus") ? "#14b8a6" : "#0f766e"}
            onClick={() => selectLocation(locations[4])}
            className="cursor-pointer"
          />
          <text x="420" y="385" fill="#99f6e4" fontSize="12">🚌 Bus Stop</text>
        </svg>
      </div>

      {/* NAVIGATION STATUS */}
      {navigatingTo && (
        <div className="flex items-center gap-2
                        border border-green-500/30
                        bg-green-500/10
                        rounded-lg p-3
                        text-sm text-green-400">
          <FiNavigation />
          Navigating from Bus Stop to {navigatingTo.name}
        </div>
      )}

      {/* LOCATION CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {locations.map(loc => (
          <button
            key={loc.id}
            onClick={() => selectLocation(loc)}
            className={`rounded-xl p-4 text-left transition
              border
              ${selected?.id === loc.id
                ? "border-cyan-400/50 bg-cyan-400/5"
                : "border-white/10 bg-black/40 hover:border-cyan-400/40"}
            `}
          >
            <h3 className="font-medium flex items-center gap-2">
              <span className="text-cyan-400">{loc.icon}</span>
              {loc.name}
            </h3>
            <p className="text-xs text-white/50">{loc.type}</p>
          </button>
        ))}
      </div>

      {/* INFO PANEL */}
      {selected && (
        <div className="border border-white/10 bg-black/40 backdrop-blur
                        rounded-lg p-4">
          <h3 className="font-semibold mb-1">
            {selected.name}
          </h3>
          <p className="text-sm text-white/70">
            {selected.description}
          </p>
        </div>
      )}
    </div>
  );
}
