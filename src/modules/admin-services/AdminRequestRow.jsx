import StatusBadge from "./StatusBadge";

export default function AdminRequestRow({
  req,
  onApprove,
  onReject
}) {
  return (
    <div className="flex justify-between items-center border border-white/10 rounded-lg p-3">
      <div>
        <div className="font-medium">{req.student}</div>
        <div className="text-sm text-gray-400">
          {req.type}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <StatusBadge status={req.status} />

        <button
          onClick={() => onApprove(req.id)}
          className="text-green-400 text-sm"
        >
          Approve
        </button>

        <button
          onClick={() => onReject(req.id)}
          className="text-red-400 text-sm"
        >
          Reject
        </button>
      </div>
    </div>
  );
}