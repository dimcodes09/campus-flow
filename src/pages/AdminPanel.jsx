import { useState } from "react";
import { useTransport } from "../context/TransportContext";
import AdminBusModal from "../modules/transport/AdminBusModal";
import { useAttendance } from "../context/AttendanceContext";
import { useCanteen } from "../context/CanteenContext";
import { usePlacements } from "../context/PlacementsContext";
import { useAdminServices } from "../context/AdminServicesContext";

export default function AdminPanel() {
  /* TRANSPORT */
  const {
    buses,
    addBus,
    updateBus,
    removeBus,
    updateStatus,
  } = useTransport();

  /* ADMIN SERVICES */
  const {
    requests,
    updateRequestStatus,
    removeRequest,
  } = useAdminServices();

  /* UI */
  const [showModal, setShowModal] = useState(false);
  const [editingBus, setEditingBus] = useState(null);
  const [activeSection, setActiveSection] = useState("overview");

  /* ATTENDANCE */
  const {
    threshold,
    alertsEnabled,
    setThreshold,
    setAlertsEnabled,
  } = useAttendance();

  /* CANTEEN */
  const {
    menu,
    rushLevel,
    setRushLevel,
    addItem,
    removeItem,
    updateStatus: updateItemStatus,
    updateItem,
    toggleVisibility,
  } = useCanteen();

  const [search, setSearch] = useState("");
  const filteredMenu = menu.filter(i =>
    i.name.toLowerCase().includes(search.toLowerCase())
  );

  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");

  /* PLACEMENTS */
  const {
    placements,
    addPlacement,
    updateStatus: updatePlacementStatus,
    removePlacement,
  } = usePlacements();

  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [branches, setBranches] = useState("");
  const [type, setType] = useState("Placement");
  const [date, setDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const [editingId, setEditingId] = useState(null);
  const [editCompany, setEditCompany] = useState("");
  const [editRole, setEditRole] = useState("");
  const [editBranches, setEditBranches] = useState("");
  const [editType, setEditType] = useState("Placement");
  const [editDate, setEditDate] = useState("");

  const filteredPlacements = placements.filter(p => {
    const matchSearch =
      p.company.toLowerCase().includes(search.toLowerCase()) ||
      p.role.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      filterStatus === "all" || p.status === filterStatus;

    return matchSearch && matchStatus;
  });

  return (
    <div className="min-h-screen bg-black text-white p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-white/50 text-sm">
          Administrative control panel (demo)
        </p>
      </div>

      {/* Navigation */}
      <div className="flex gap-4 flex-wrap">
        {[
          "overview",
          "transport",
          "placements",
          "attendance",
          "canteen",
          "admin-services",
          "map",
        ].map(key => (
          <button
            key={key}
            onClick={() => setActiveSection(key)}
            className={`px-4 py-2 rounded-lg text-sm ${
              activeSection === key
                ? "bg-blue-600"
                : "bg-white/10"
            }`}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </button>
        ))}
      </div>

      {/* OVERVIEW */}
      {activeSection === "overview" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AdminCard title="🚌 Transport" desc="Manage buses and routes" />
          <AdminCard title="💼 Placements" desc="Post opportunities" />
          <AdminCard title="✅ Attendance" desc="Configure rules" />
          <AdminCard title="🍽️ Canteen" desc="Manage menu and rush" />
          <AdminCard title="📄 Admin Services" desc="Student requests" />
        </div>
      )}

      {/* TRANSPORT */}
      {activeSection === "transport" && (
        <>
          <SectionHeader
            title="Transport Management"
            action={() => {
              setEditingBus(null);
              setShowModal(true);
            }}
          />

          <div className="grid gap-4">
            {Object.entries(buses).map(([id, bus]) => (
              <div
                key={id}
                className="p-5 rounded-xl bg-white/5 border border-white/10"
              >
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold">{bus.name}</h3>
                    <p className="text-xs text-gray-400">{bus.route}</p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingBus({ id, ...bus });
                        setShowModal(true);
                      }}
                      className="btn-blue"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => updateStatus(id, "delayed")}
                      className="btn-yellow"
                    >
                      Delay
                    </button>
                    <button
                      onClick={() => updateStatus(id, "on-time")}
                      className="btn-green"
                    >
                      On Time
                    </button>
                    <button
                      onClick={() => removeBus(id)}
                      className="btn-red"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ATTENDANCE */}
      {activeSection === "attendance" && (
        <div className="border border-white/10 rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold">
            Attendance Rules
          </h2>

          <input
            type="number"
            value={threshold}
            onChange={e => setThreshold(+e.target.value)}
            className="bg-black border border-white/20 px-3 py-1 rounded w-32"
          />

          <label className="flex gap-2 items-center text-sm">
            <input
              type="checkbox"
              checked={alertsEnabled}
              onChange={() => setAlertsEnabled(p => !p)}
            />
            Enable attendance alerts
          </label>
        </div>
      )}

      {/* CANTEEN */}
      {activeSection === "canteen" && (
        <div className="space-y-8">
          <div className="border border-white/10 rounded-xl p-6 space-y-3">
            <h2 className="text-xl font-semibold">Canteen Control</h2>

            <select
              value={rushLevel}
              onChange={e => setRushLevel(e.target.value)}
              className="bg-black border border-white/20 px-3 py-2 rounded"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <input
            placeholder="Search menu item"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-black border border-white/20 px-3 py-2 rounded"
          />

          <div className="space-y-3">
            {filteredMenu.map(i => (
              <div
                key={i.id}
                className="border border-white/10 rounded-lg p-4"
              >
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">{i.name}</p>
                    <p className="text-xs text-gray-400">
                      ₹{i.price}
                    </p>
                  </div>
                  <span className="text-xs">{i.status}</span>
                </div>

                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => updateItemStatus(i.id, "available")}
                    className="btn-green text-xs"
                  >
                    Available
                  </button>
                  <button
                    onClick={() => updateItemStatus(i.id, "limited")}
                    className="btn-yellow text-xs"
                  >
                    Limited
                  </button>
                  <button
                    onClick={() => removeItem(i.id)}
                    className="btn-red text-xs"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="border border-white/10 rounded-xl p-6 space-y-3">
            <h3 className="font-semibold">Add Item</h3>

            <input
              placeholder="Name"
              value={itemName}
              onChange={e => setItemName(e.target.value)}
              className="input"
            />

            <input
              placeholder="Price"
              type="number"
              value={price}
              onChange={e => setPrice(e.target.value)}
              className="input"
            />

            <button
              onClick={() => {
                if (!itemName || !price) return;
                addItem({
                  name: itemName,
                  price: Number(price),
                  status: "available",
                  visible: true,
                });
                setItemName("");
                setPrice("");
              }}
              className="btn-green"
            >
              Add
            </button>
          </div>
        </div>
      )}

      {/* ADMIN SERVICES */}
{activeSection === "admin-services" && (
  <div className="space-y-6">
    <h2 className="text-xl font-semibold">
      Student Document Requests
    </h2>

    {requests.length === 0 && (
      <p className="text-white/40 text-sm">
        No requests submitted
      </p>
    )}

    {requests.map(r => (
      <div
        key={r.id}
        className="border border-white/10 bg-white/5 rounded-xl p-5 space-y-3"
      >
        {/* HEADER */}
        <div className="flex justify-between items-start">
          <div>
            <p className="font-semibold text-lg">
              {r.type}
            </p>
            <p className="text-xs text-white/50">
              {r.student} · {r.date}
            </p>
          </div>

          {/* STATUS */}
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

        {/* ACTIONS */}
        <div className="flex gap-2 pt-2">
          <button
            disabled={r.status !== "Pending"}
            onClick={() =>
              updateRequestStatus(r.id, "Approved")
            }
            className={`px-3 py-1 rounded text-xs transition ${
              r.status === "Approved"
                ? "bg-green-600 text-black"
                : r.status !== "Pending"
                ? "bg-white/10 text-white/30 cursor-not-allowed"
                : "bg-green-500/80 hover:bg-green-500 text-black"
            }`}
          >
            Approve
          </button>

          <button
            disabled={r.status !== "Pending"}
            onClick={() =>
              updateRequestStatus(r.id, "Rejected")
            }
            className={`px-3 py-1 rounded text-xs transition ${
              r.status === "Rejected"
                ? "bg-red-600 text-white"
                : r.status !== "Pending"
                ? "bg-white/10 text-white/30 cursor-not-allowed"
                : "bg-red-500/80 hover:bg-red-500 text-white"
            }`}
          >
            Reject
          </button>

          <button
            onClick={() => removeRequest(r.id)}
            className="ml-auto px-3 py-1 rounded text-xs bg-white/10 hover:bg-white/20"
          >
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>
)}
      {/* MAP */}
      {activeSection === "map" && (
        <DemoSection
          title="Campus Map Management"
          actions={[
            "Add campus locations",
            "Edit markers",
            "Link bus stops",
          ]}
        />
      )}

      {showModal && (
        <AdminBusModal
          initialData={editingBus}
          onClose={() => {
            setShowModal(false);
            setEditingBus(null);
          }}
          onSave={bus => {
            editingBus ? updateBus(bus.id, bus) : addBus(bus);
            setShowModal(false);
            setEditingBus(null);
          }}
        />
      )}
    </div>
  );
}

/* Helpers */

function AdminCard({ title, desc }) {
  return (
    <div className="border border-white/10 rounded-lg p-5">
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-sm text-gray-400">{desc}</p>
    </div>
  );
}

function SectionHeader({ title, action }) {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-semibold">{title}</h2>
      <button onClick={action} className="btn-green">
        + Add
      </button>
    </div>
  );
}

function DemoSection({ title, actions }) {
  return (
    <div className="border border-white/10 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-3">{title}</h2>
      <ul className="list-disc ml-5 text-sm text-gray-300 space-y-1">
        {actions.map(a => (
          <li key={a}>{a}</li>
        ))}
      </ul>
    </div>
  );
}