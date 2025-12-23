import { useState } from "react";
import { useAttendance } from "../context/AttendanceContext";

export default function Attendance() {
  const {
    subjects,
    threshold,
    addSubject,
    updateSubject,
    removeSubject,
    resetAll,
    calculateOverall,
    simulateNextLecture,
  } = useAttendance();

  const [name, setName] = useState("");
  const [total, setTotal] = useState("");
  const [attended, setAttended] = useState("");

  const add = () => {
    const t = Number(total);
    const a = Number(attended);

    if (!name || t <= 0 || a < 0 || a > t) return;

    addSubject({
      id: Date.now(),
      subject: name,
      totalLectures: t,
      attendedLectures: a,
    });

    setName("");
    setTotal("");
    setAttended("");
  };

  const overall = calculateOverall();

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">
        Attendance Dashboard
      </h1>

      <p className="text-sm text-gray-400">
        Self-reported attendance (manual entry). Not official data.
      </p>

      {subjects.length === 0 && (
        <p className="text-gray-400">
          No subjects added yet.
        </p>
      )}

      {overall < threshold && subjects.length > 0 && (
        <div className="border border-red-500/40 bg-red-500/10 p-4 rounded text-red-400">
          ⚠️ Overall attendance below {threshold}%
        </div>
      )}

      <div className="border border-white/10 rounded p-4">
        <p className="text-sm text-gray-400">
          Overall Attendance
        </p>
        <p className="text-2xl font-bold">{overall}%</p>
      </div>

      {/* ADD SUBJECT */}
      <div className="border border-white/10 rounded p-4 space-y-3">
        <h3 className="font-semibold">Add Subject</h3>

        <input
          placeholder="Subject name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="input"
        />

        <input
          type="number"
          placeholder="Total lectures"
          value={total}
          onChange={e => setTotal(e.target.value)}
          className="input"
        />

        <input
          type="number"
          placeholder="Lectures attended"
          value={attended}
          onChange={e => setAttended(e.target.value)}
          className="input"
        />

        <button onClick={add} className="btn-green">
          Add Subject
        </button>
      </div>

      {/* SUBJECT LIST */}
      <div className="grid md:grid-cols-2 gap-4">
        {subjects.map(s => {
          const percent = Math.round(
            (s.attendedLectures / s.totalLectures) * 100
          );

          return (
            <div
              key={s.id}
              className="border border-white/10 rounded p-4 space-y-2"
            >
              <input
                value={s.subject}
                onChange={e =>
                  updateSubject(s.id, {
                    ...s,
                    subject: e.target.value,
                  })
                }
                className="input font-semibold"
              />

              <div className="flex gap-2">
                <input
                  type="number"
                  value={s.totalLectures}
                  onChange={e =>
                    updateSubject(s.id, {
                      ...s,
                      totalLectures: Number(e.target.value),
                    })
                  }
                  className="input"
                />

                <input
                  type="number"
                  value={s.attendedLectures}
                  onChange={e =>
                    updateSubject(s.id, {
                      ...s,
                      attendedLectures: Number(e.target.value),
                    })
                  }
                  className="input"
                />
              </div>

              <p className="font-medium">{percent}%</p>

              {percent < threshold && (
                <p className="text-red-400 text-sm">
                  ⚠️ Attendance short
                </p>
              )}

              <div className="flex gap-2">
                <span className="text-xs text-gray-400">
                  If attend →
                  {simulateNextLecture(s, true)}%
                </span>
                <span className="text-xs text-gray-400">
                  If miss →
                  {simulateNextLecture(s, false)}%
                </span>
              </div>

              <button
                onClick={() => removeSubject(s.id)}
                className="btn-red text-xs"
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>

      {subjects.length > 0 && (
        <button
          onClick={resetAll}
          className="btn-red"
        >
          Reset All Attendance
        </button>
      )}
    </div>
  );
}
