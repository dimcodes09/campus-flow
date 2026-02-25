import { useAdminServices } from "../../context/AdminServicesContext";
import { useAuth } from "../../context/AuthContext";

export default function AdminServices() {
  const { requests } = useAdminServices();
  const { user } = useAuth();

  const myRequests = requests.filter(
    r => r.student === (user?.name || "Anshu")
  );

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">
      <h1 className="text-3xl font-bold">
        My Document Requests
      </h1>

      {myRequests.length === 0 && (
        <p className="text-white/40">
          No requests submitted
        </p>
      )}

      {myRequests.map(r => (
        <div
          key={r.id}
          className="border border-white/10 bg-white/5 rounded-xl p-5 space-y-3"
        >
          <div className="flex justify-between">
            <div>
              <p className="font-semibold text-lg">
                {r.type}
              </p>
              <p className="text-xs text-white/50">
                {r.date}
              </p>
            </div>

            <span
              className={`px-3 py-1 text-xs rounded border ${
                r.status === "Approved"
                  ? "bg-green-500/15 text-green-400 border-green-500/30"
                  : r.status === "Rejected"
                  ? "bg-red-500/15 text-red-400 border-red-500/30"
                  : "bg-yellow-500/15 text-yellow-400 border-yellow-500/30"
              }`}
            >
              {r.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}