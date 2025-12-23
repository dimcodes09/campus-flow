import { useEffect } from "react";

export default function StudentSearch({ from, to, setFrom, setTo }) {
  // 🔁 Restore last search on load
  useEffect(() => {
    const saved = localStorage.getItem("lastSearch");
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved);
      if (parsed.from) setFrom(parsed.from);
      if (parsed.to) setTo(parsed.to);
    } catch {}
  }, []);

  // 💾 Persist search on change
  useEffect(() => {
    localStorage.setItem(
      "lastSearch",
      JSON.stringify({ from, to })
    );
  }, [from, to]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input
        value={from}
        onChange={e => setFrom(e.target.value)}
        placeholder="From (e.g. MP Nagar)"
        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        value={to}
        onChange={e => setTo(e.target.value)}
        placeholder="To (e.g. Campus)"
        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
