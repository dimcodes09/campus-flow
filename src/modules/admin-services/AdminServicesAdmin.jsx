import { useAdminServices } from "../../context/AdminServicesContext";

export default function AdminServicesAdmin() {
  const { requests, updateStatus } = useAdminServices();

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-4">
      <h1 className="text-3xl font-bold">Admin Requests</h1>

      {requests.length === 0 && (
        <p className="text-white/40">No requests</p>
      )}

      {requests.map((r) => (
        <div
          key={r.id}
          className="border border-white/10 rounded-lg p-4 flex justify-between items-center"
        >
          <div>
            <p className="font-semibold">{r.type}</p>
            <p className="text-xs text-white/50">{r.student}</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => updateStatus(r.id, "Approved")}
              className="px-3 py-1 bg-green-600 rounded"
            >
              Approve
            </button>

            <button
              onClick={() => updateStatus(r.id, "Rejected")}
              className="px-3 py-1 bg-red-600 rounded"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}