import { useState } from "react";
import { useAttendance } from "../context/AttendanceContext";
import {
  FiBookOpen,
  FiAlertTriangle,
  FiTrendingUp,
  FiPlusCircle,
  FiTrash2,
} from "react-icons/fi";

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
      <h1 className="text-3xl font-semibold tracking-wide">
        Attendance Dashboard
      </h1>

      <p className="text-sm text-white/50">
        Self-reported attendance (manual entry). Not official data.
      </p>

      {overall < threshold && subjects.length > 0 && (
        <div className="border border-red-500/30 bg-red-500/10
                        rounded-lg p-4 text-red-400
                        flex items-center gap-2">
          <FiAlertTriangle />
          Overall attendance below {threshold}%
        </div>
      )}

      {/* OVERALL CARD */}
      <div className="border border-white/10 bg-black/40 backdrop-blur
                      rounded-lg p-4">
        <p className="text-sm text-white/50 flex items-center gap-2">
          <FiTrendingUp />
          Overall Attendance
        </p>
        <p className="text-2xl font-semibold mt-1">
          {overall}%
        </p>
      </div>

      {/* ADD SUBJECT */}
      <div className="border border-white/10 bg-black/40 backdrop-blur
                      rounded-lg p-4 space-y-4">
        <h3 className="font-medium flex items-center gap-2">
          <FiPlusCircle className="text-cyan-400" />
          Add Subject
        </h3>

        <div className="grid md:grid-cols-4 gap-3">
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
            Add
          </button>
        </div>
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
              className="border border-white/10 bg-black/40 backdrop-blur
                         rounded-lg p-4 space-y-3
                         hover:border-cyan-400/40 transition"
            >
              <input
                value={s.subject}
                onChange={e =>
                  updateSubject(s.id, {
                    ...s,
                    subject: e.target.value,
                  })
                }
                className="input font-medium"
              />

              <div className="grid grid-cols-2 gap-2">
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

              <p className="font-medium">
                {percent}%
              </p>

              {percent < threshold && (
                <p className="text-red-400 text-sm flex items-center gap-1">
                  <FiAlertTriangle />
                  Attendance short
                </p>
              )}

              <div className="text-xs text-white/50 flex gap-4">
                <span>
                  If attend → {simulateNextLecture(s, true)}%
                </span>
                <span>
                  If miss → {simulateNextLecture(s, false)}%
                </span>
              </div>

              <button
                onClick={() => removeSubject(s.id)}
                className="text-xs text-red-400 hover:text-red-300
                           flex items-center gap-1"
              >
                <FiTrash2 />
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
