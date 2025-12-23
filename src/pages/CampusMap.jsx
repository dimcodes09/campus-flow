import { useState } from "react";

const locations = [
  {
    id: 1,
    key: "academic",
    name: "Main Academic Block",
    type: "Academic",
    description: "Lecture halls, departments, and faculty offices",
    color: "#2563eb",
  },
  {
    id: 2,
    key: "labs",
    name: "Computer Labs",
    type: "Lab",
    description: "CS, IT, and research laboratories",
    color: "#6366f1",
  },
  {
    id: 3,
    key: "canteen",
    name: "Central Canteen",
    type: "Service",
    description: "Food court for students and staff",
    color: "#f59e0b",
  },
  {
    id: 4,
    key: "hostel",
    name: "Boys Hostel",
    type: "Residential",
    description: "Student residential block",
    color: "#22c55e",
  },
  {
    id: 5,
    key: "bus",
    name: "Campus Bus Stop",
    type: "Transport",
    description: "Primary pickup and drop point",
    color: "#14b8a6",
  },
];

/* HARD-CODED DEMO ROUTES FROM BUS STOP */
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
    if (loc.key !== "bus") {
      setNavigatingTo(loc);
    } else {
      setNavigatingTo(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-1">Campus Map</h1>
        <p className="text-gray-400 text-sm">
          Conceptual campus layout for navigation and planning (demo)
        </p>
      </div>

      {/* MAP */}
      <div className="border border-white/10 rounded-xl p-4">
        <svg
          viewBox="0 0 900 450"
          className="w-full h-[380px] rounded bg-zinc-900"
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

          {/* Academic Block */}
          <rect
            x="80"
            y="60"
            width="220"
            height="100"
            rx="8"
            fill={active("academic") ? "#2563eb" : "#1f2937"}
            onClick={() => selectLocation(locations[0])}
            className="cursor-pointer"
          />
          <text x="130" y="115" fill="#e5e7eb" fontSize="13">
            🎓 Academic Block
          </text>

          {/* Labs */}
          <rect
            x="520"
            y="60"
            width="220"
            height="100"
            rx="8"
            fill={active("labs") ? "#6366f1" : "#1f2937"}
            onClick={() => selectLocation(locations[1])}
            className="cursor-pointer"
          />
          <text x="575" y="115" fill="#e5e7eb" fontSize="13">
            💻 Computer Labs
          </text>

          {/* Canteen */}
          <rect
            x="540"
            y="290"
            width="180"
            height="80"
            rx="8"
            fill={active("canteen") ? "#f59e0b" : "#1f2937"}
            onClick={() => selectLocation(locations[2])}
            className="cursor-pointer"
          />
          <text x="585" y="335" fill="#e5e7eb" fontSize="13">
            🍽 Canteen
          </text>

          {/* Hostel */}
          <rect
            x="120"
            y="290"
            width="260"
            height="90"
            rx="8"
            fill={active("hostel") ? "#22c55e" : "#1f2937"}
            onClick={() => selectLocation(locations[3])}
            className="cursor-pointer"
          />
          <text x="190" y="340" fill="#e5e7eb" fontSize="13">
            🏠 Hostel
          </text>

          {/* Bus Stop */}
          <circle
            cx="450"
            cy="350"
            r="18"
            fill={active("bus") ? "#14b8a6" : "#0f766e"}
            onClick={() => selectLocation(locations[4])}
            className="cursor-pointer"
          />
          <text x="420" y="385" fill="#99f6e4" fontSize="12">
            🚌 Bus Stop
          </text>
        </svg>
      </div>

      {/* Navigation Status */}
      {navigatingTo && (
        <div className="border border-green-500/30 bg-green-500/5 rounded-lg p-3 text-sm text-green-400">
          Navigating from Bus Stop to {navigatingTo.name}
        </div>
      )}

      {/* Location Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {locations.map(loc => (
          <button
            key={loc.id}
            onClick={() => selectLocation(loc)}
            className={`border rounded-lg p-4 text-left transition ${
              selected?.id === loc.id
                ? "border-blue-500/60 bg-blue-500/5"
                : "border-white/10 hover:border-blue-500/40"
            }`}
          >
            <h3 className="font-semibold">{loc.name}</h3>
            <p className="text-xs text-gray-400">{loc.type}</p>
          </button>
        ))}
      </div>

      {/* Info Panel */}
      {selected && (
        <div className="border border-blue-500/20 bg-blue-500/5 rounded-lg p-4">
          <h3 className="font-semibold mb-1">{selected.name}</h3>
          <p className="text-sm text-gray-300">{selected.description}</p>
        </div>
      )}
    </div>
  );
}
