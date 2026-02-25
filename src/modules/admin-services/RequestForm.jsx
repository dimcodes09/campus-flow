import { useState } from "react";
import { useAdminServices } from "../../context/AdminServicesContext";
import toast from "react-hot-toast";

export default function RequestForm() {
  const { addRequest } = useAdminServices();
  const [type, setType] = useState("ID Card");

  const submit = () => {
    const newReq = {
      id: "REQ" + Date.now(),
      student: "Student",
      type,
      status: "Pending",
      date: new Date().toISOString().slice(0, 10)
    };

    addRequest(newReq);
    toast.success("Request submitted successfully");
  };

  return (
    <div className="border border-white/10 rounded-lg p-4 space-y-3">
      <h3 className="font-semibold">Apply Request</h3>

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="w-full bg-black border border-white/10 rounded p-2"
      >
        <option>ID Card</option>
        <option>Bonafide Certificate</option>
        <option>Transcript</option>
      </select>

      <button
        onClick={submit}
        className="w-full bg-blue-500 hover:bg-blue-600 py-2 rounded"
      >
        Submit Request
      </button>
    </div>
  );
}