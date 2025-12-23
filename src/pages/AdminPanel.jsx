import { useState } from "react";
import { useTransport } from "../context/TransportContext";
import AdminBusModal from "../modules/transport/AdminBusModal";
import { useAttendance } from "../context/AttendanceContext";
import { useCanteen } from "../context/CanteenContext";
import { usePlacements } from "../context/PlacementsContext";

export default function AdminPanel() {
  /* TRANSPORT */
  const {
    buses,
    addBus,
    updateBus,
    removeBus,
    updateStatus,
  } = useTransport();

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
  } = useCanteen();
const [search, setSearch] = useState("");
const filteredMenu = menu.filter(i =>
  i.name.toLowerCase().includes(search.toLowerCase())
);

  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");

  //*PLACEMENTS 

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

      {/* Admin Navigation */}
      <div className="flex gap-4 flex-wrap">
        {[
          "overview",
          "transport",
          "placements",
          "attendance",
          "canteen",
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
          <AdminCard title="💼 Placements" desc="Post opportunities (demo)" />
          <AdminCard title="✅ Attendance" desc="Configure rules" />
          <AdminCard title="🍽️ Canteen" desc="Manage menu and rush" />
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

    {/* Rush Control */}
    <div className="border border-white/10 rounded-xl p-6 space-y-3">
      <h2 className="text-xl font-semibold">Canteen Control</h2>

      <div className="flex items-center gap-4">
        <label className="text-sm text-gray-400">
          Current Rush Level
        </label>

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
    </div>

    {/* Search */}
    <input
      placeholder="Search menu item"
      value={search}
      onChange={e => setSearch(e.target.value)}
      className="bg-black border border-white/20 px-3 py-2 rounded w-full md:w-1/3"
    />

    {/* Menu Items */}
    <div className="border border-white/10 rounded-xl p-6 space-y-5">
      <h3 className="font-semibold text-lg">Menu Items</h3>

      {filteredMenu.map(i => (
        <div
          key={i.id}
          className="border border-white/10 rounded-lg p-4 space-y-3"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">{i.name}</p>
              <p className="text-xs text-gray-400">
                ₹{i.price}
                {i.previousPrice !== i.price && (
                  <span className="text-yellow-400 ml-2">(updated)</span>
                )}
              </p>
            </div>

            <span className="text-xs px-2 py-1 rounded bg-white/10">
              {i.status}
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-3">
            <input
              type="number"
              value={i.price}
              onChange={e =>
                updateItem(i.id, {
                  ...i,
                  previousPrice: i.price,
                  price: Number(e.target.value),
                })
              }
              className="bg-black border border-white/20 px-3 py-2 rounded text-sm"
            />

            <input
              placeholder="Reason"
              value={i.reason || ""}
              onChange={e =>
                updateItem(i.id, { ...i, reason: e.target.value })
              }
              className="bg-black border border-white/20 px-3 py-2 rounded text-sm"
            />

            <input
              placeholder="Refill time"
              value={i.refillTime || ""}
              onChange={e =>
                updateItem(i.id, { ...i, refillTime: e.target.value })
              }
              className="bg-black border border-white/20 px-3 py-2 rounded text-sm"
            />
          </div>

          <div className="flex flex-wrap gap-2">
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
              onClick={() => updateItemStatus(i.id, "soldout")}
              className="btn-red text-xs"
            >
              Sold Out
            </button>

            <button
              onClick={() => toggleVisibility(i.id)}
              className="btn-blue text-xs"
            >
              {i.visible ? "Hide from students" : "Show to students"}
            </button>

            <button
              onClick={() => removeItem(i.id)}
              className="btn-red text-xs ml-auto"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>

    {/* ADD NEW ITEM */}
    <div className="border border-white/10 rounded-xl p-6 space-y-4">
      <h3 className="font-semibold text-lg">Add New Item</h3>

      <div className="grid md:grid-cols-2 gap-4">
        <input
          placeholder="Item name"
          value={itemName}
          onChange={e => setItemName(e.target.value)}
          className="bg-black border border-white/20 px-3 py-2 rounded"
        />

        <input
          placeholder="Price"
          type="number"
          value={price}
          onChange={e => setPrice(e.target.value)}
          className="bg-black border border-white/20 px-3 py-2 rounded"
        />
      </div>

      <button
        onClick={() => {
          if (!itemName || !price) return;

          addItem({
            name: itemName,
            price: Number(price),
            previousPrice: Number(price),
            status: "available",
            visible: true,
            reason: "",
            refillTime: "",
          });

          setItemName("");
          setPrice("");
        }}
        className="btn-green"
      >
        Add Item
      </button>
    </div>
  </div>
)}

      {/* PLACEMENTS */}

{activeSection === "placements" && (
  <div className="space-y-6">

    {/* ADD PLACEMENT */}
    <div className="border border-white/10 rounded-lg p-6 space-y-4">
      <h2 className="text-xl font-semibold">Add Placement / Internship</h2>

      <input
        placeholder="Company name"
        value={company}
        onChange={e => setCompany(e.target.value)}
        className="input"
      />

      <input
        placeholder="Role"
        value={role}
        onChange={e => setRole(e.target.value)}
        className="input"
      />

      <input
        placeholder="Eligible branches (CSE,IT)"
        value={branches}
        onChange={e => setBranches(e.target.value)}
        className="input"
      />

      <select
        value={type}
        onChange={e => setType(e.target.value)}
        className="input"
      >
        <option>Placement</option>
        <option>Internship</option>
      </select>

      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
        className="input"
      />

      <button
        onClick={() => {
          if (!company || !role || !branches || !date) return;

          addPlacement({
            company,
            role,
            branches: branches.split(","),
            type,
            driveDate: date,
            status: "open",
          });

          setCompany("");
          setRole("");
          setBranches("");
          setDate("");
        }}
        className="btn-green"
      >
        Add Placement
      </button>
    </div>

    {/* SEARCH + FILTER */}
    <div className="flex flex-col md:flex-row gap-4">
      <input
        placeholder="Search company or role"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="input md:w-1/2"
      />

      <select
        value={filterStatus}
        onChange={e => setFilterStatus(e.target.value)}
        className="input md:w-1/4"
      >
        <option value="all">All</option>
        <option value="open">Open</option>
        <option value="closed">Closed</option>
      </select>
    </div>

    {/* LIST */}
    <div className="space-y-3">
      {filteredPlacements.map(p => (
        <div
          key={p.id}
          className="border border-white/10 rounded p-4 space-y-3"
        >
          {editingId === p.id ? (
            <>
              <input
                value={editCompany}
                onChange={e => setEditCompany(e.target.value)}
                className="input"
              />
              <input
                value={editRole}
                onChange={e => setEditRole(e.target.value)}
                className="input"
              />
              <input
                value={editBranches}
                onChange={e => setEditBranches(e.target.value)}
                className="input"
              />
              <select
                value={editType}
                onChange={e => setEditType(e.target.value)}
                className="input"
              >
                <option>Placement</option>
                <option>Internship</option>
              </select>
              <input
                type="date"
                value={editDate}
                onChange={e => setEditDate(e.target.value)}
                className="input"
              />

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    updatePlacementStatus(p.id, {
                      ...p,
                      company: editCompany,
                      role: editRole,
                      branches: editBranches.split(","),
                      type: editType,
                      driveDate: editDate,
                    });
                    setEditingId(null);
                  }}
                  className="btn-green text-xs"
                >
                  Save
                </button>

                <button
                  onClick={() => setEditingId(null)}
                  className="btn-red text-xs"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between">
                <div>
                  <p className="font-medium">{p.company}</p>
                  <p className="text-xs text-gray-400">{p.role}</p>
                  <p className="text-xs text-gray-500">
                    {p.type} | {p.driveDate}
                  </p>
                </div>

                <span
                  className={`text-xs px-2 py-1 rounded ${
                    p.status === "open"
                      ? "bg-green-500/10 text-green-400"
                      : "bg-red-500/10 text-red-400"
                  }`}
                >
                  {p.status}
                </span>
              </div>

              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => updatePlacementStatus(p.id, "open")}
                  className="btn-green text-xs"
                >
                  Open
                </button>

                <button
                  onClick={() => updatePlacementStatus(p.id, "closed")}
                  className="btn-red text-xs"
                >
                  Close
                </button>

                <button
                  onClick={() => {
                    setEditingId(p.id);
                    setEditCompany(p.company);
                    setEditRole(p.role);
                    setEditBranches(p.branches.join(","));
                    setEditType(p.type);
                    setEditDate(p.driveDate);
                  }}
                  className="btn-blue text-xs"
                >
                  Edit
                </button>

                <button
                  onClick={() => removePlacement(p.id)}
                  className="btn-red text-xs"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  </div>
)}


      {/* MAP */}
      {activeSection === "map" && (
        <DemoSection
          title="Campus Map Management"
          actions={[
            "Add or edit campus locations",
            "Enable or disable map markers",
            "Link bus stops to routes",
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

