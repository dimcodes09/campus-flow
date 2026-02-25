import StatusBadge from "./StatusBadge";

export default function RequestCard({ req }) {
  return (
    <div className="border border-white/10 rounded-lg p-4 bg-black/40">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold">{req.type}</h3>
        <StatusBadge status={req.status} />
      </div>

      <p className="text-xs text-white/60">
        Request ID: {req.id}
      </p>

      <p className="text-xs text-white/40 mt-1">
        Date: {req.date}
      </p>
    </div>
  );
}