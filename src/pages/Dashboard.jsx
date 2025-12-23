import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-1">Student Dashboard</h1>
        <p className="text-gray-400 text-sm">
          Quick access to campus services and insights
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          onClick={() => navigate("/transport")}
          className="cursor-pointer border border-white/10 rounded-lg p-6 hover:border-blue-500/50 transition"
        >
          <h3 className="font-semibold mb-1">🚌 Transport Tracking</h3>
          <p className="text-sm text-gray-400">
            View simulated campus bus movement and routes
          </p>
        </div>

        <div
          onClick={() => navigate("/attendance")}
          className="cursor-pointer border border-white/10 rounded-lg p-6 hover:border-blue-500/50 transition"
        >
          <h3 className="font-semibold mb-1">✅ Attendance Insights</h3>
          <p className="text-sm text-gray-400">
            Track and simulate attendance percentages
          </p>
        </div>

        <div
          onClick={() => navigate("/placements")}
          className="cursor-pointer border border-white/10 rounded-lg p-6 hover:border-blue-500/50 transition"
        >
          <h3 className="font-semibold mb-1">💼 Placements & Internships</h3>
          <p className="text-sm text-gray-400">
            Explore upcoming opportunities and eligibility
          </p>
        </div>

        <div
          onClick={() => navigate("/campus-map")}
          className="cursor-pointer border border-white/10 rounded-lg p-6 hover:border-blue-500/50 transition"
        >
          <h3 className="font-semibold mb-1">🗺️ Campus Map</h3>
          <p className="text-sm text-gray-400">
            Interactive campus layout and locations
          </p>
        </div>
      </div>
    </div>
  );
}
