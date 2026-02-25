import { useState } from "react";
import { useAdminServices } from "../context/AdminServicesContext";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function AdminServices() {
  const { requests, addRequest } = useAdminServices();
  const { user } = useAuth();
  const [type, setType] = useState("ID Card");

  const submit = () => {
    const newReq = {
      id: "REQ" + Date.now(),
      student: user?.name || "Student",
      type,
      status: "Pending",
      date: new Date().toISOString().slice(0, 10)
    };

    addRequest(newReq);
    toast.success("Request submitted");
  };

  const myRequests = requests.filter(
    r => r.student === (user?.name || "Student")
  );

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <div className="space-y-3">
        <h2 className="text-xl font-semibold">Apply Request</h2>

        <select
          value={type}
          onChange={e => setType(e.target.value)}
          className="w-full p-2 rounded bg-black border border-white/20"
        >
          <option>ID Card</option>
          <option>Bonafide Certificate</option>
          <option>Transcript</option>
        </select>

        <button
          onClick={submit}
          className="w-full py-2 bg-blue-600 rounded"
        >
          Submit Request
        </button>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">
          My Requests
        </h3>

        {myRequests.length === 0 && (
          <p className="text-white/40 text-sm">
            No requests yet
          </p>
        )}

        {myRequests.map(r => (
          <div
            key={r.id}
            className="border border-white/10 rounded-lg p-4 flex justify-between"
          >
            <div>
              <p className="font-semibold">{r.type}</p>
              <p className="text-xs text-white/50">
                {r.date}
              </p>
            </div>

            <span
              className={`px-3 py-1 text-xs rounded ${
                r.status === "Approved"
                  ? "bg-green-500/20 text-green-400"
                  : r.status === "Rejected"
                  ? "bg-red-500/20 text-red-400"
                  : "bg-yellow-500/20 text-yellow-400"
              }`}
            >
              {r.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}