import { useState } from "react";

export default function AdminBusModal({
  onClose,
  onSave,
  initialData = null
}) {
  const [form, setForm] = useState(
    initialData || {
      id: "",
      name: "",
      route: "",
      capacity: "",
      status: "on-time",
      speed: 30,
      stops: [{ name: "", lat: "", lng: "" }]
    }
  );

  const updateStop = (i, key, value) => {
    const stops = [...form.stops];
    stops[i][key] = value;
    setForm({ ...form, stops });
  };

  const addStop = () =>
    setForm({
      ...form,
      stops: [...form.stops, { name: "", lat: "", lng: "" }]
    });

  const removeStop = i =>
    setForm({
      ...form,
      stops: form.stops.filter((_, idx) => idx !== i)
    });

  const handleSave = () => {
    if (!form.id || !form.name) return;

    onSave({
      ...form,
      capacity: Number(form.capacity) || 30,
      speed: Number(form.speed) || 30,

      // 🔑 CRITICAL FIX
      stops: form.stops.map(s => ({
        name: s.name || "Stop",

        // ❌ DO NOT send 0,0
        // ✅ send undefined so context can apply DEFAULT_COORD
        coordinates:
          s.lat === "" || s.lng === ""
            ? undefined
            : [Number(s.lat), Number(s.lng)]
      }))
    });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur flex items-center justify-center z-50">
      <div className="w-full max-w-xl bg-zinc-900 p-6 rounded-2xl border border-white/10">
        <h2 className="text-xl font-semibold mb-4">
          {initialData ? "Edit Bus" : "Add New Bus"}
        </h2>

        <input
          className="input"
          placeholder="Bus ID"
          value={form.id}
          disabled={!!initialData}
          onChange={e => setForm({ ...form, id: e.target.value })}
        />

        <input
          className="input mt-3"
          placeholder="Bus Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="input mt-3"
          placeholder="Route"
          value={form.route}
          onChange={e => setForm({ ...form, route: e.target.value })}
        />

        <input
          type="number"
          className="input mt-3"
          placeholder="Capacity"
          value={form.capacity}
          onChange={e => setForm({ ...form, capacity: e.target.value })}
        />

        <div className="mt-4">
          <label className="text-sm text-white/50">Speed (km/h)</label>
          <input
            type="range"
            min="10"
            max="60"
            value={form.speed}
            onChange={e => setForm({ ...form, speed: e.target.value })}
          />
          <span className="text-sm ml-2">{form.speed} km/h</span>
        </div>

        <div className="mt-4 space-y-2">
          {form.stops.map((s, i) => (
            <div key={i} className="grid grid-cols-4 gap-2">
              <input
                placeholder="Stop"
                className="input"
                value={s.name}
                onChange={e => updateStop(i, "name", e.target.value)}
              />
              <input
                placeholder="Lat"
                className="input"
                value={s.lat}
                onChange={e => updateStop(i, "lat", e.target.value)}
              />
              <input
                placeholder="Lng"
                className="input"
                value={s.lng}
                onChange={e => updateStop(i, "lng", e.target.value)}
              />
              <button
                onClick={() => removeStop(i)}
                className="bg-red-600 rounded"
              >
                ✕
              </button>
            </div>
          ))}

          <button
            onClick={addStop}
            className="text-blue-400 text-sm"
          >
            + Add Stop
          </button>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSave}
            className="flex-1 bg-emerald-600 py-2 rounded-lg"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-zinc-700 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
