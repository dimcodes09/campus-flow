import { createContext, useContext, useEffect, useState } from "react";

const AttendanceContext = createContext(null);
const STORAGE_KEY = "attendance_v2";

/* ---------- DUMMY SEED DATA ---------- */
const DEFAULT_SUBJECTS = [
  {
    id: 1,
    subject: "Mathematics",
    totalLectures: 40,
    attendedLectures: 30,
  },
  {
    id: 2,
    subject: "Physics",
    totalLectures: 36,
    attendedLectures: 26,
  },
];

export const AttendanceProvider = ({ children }) => {
  /* ---------- ADMIN RULES ---------- */
  const [threshold, setThreshold] = useState(75);
  const [alertsEnabled, setAlertsEnabled] = useState(true);

  /* ---------- STUDENT DATA ---------- */
  const [subjects, setSubjects] = useState([]);

  /* ---------- LOAD ONCE ---------- */
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      setSubjects(DEFAULT_SUBJECTS);
      return;
    }

    try {
      const data = JSON.parse(saved);
      setThreshold(data.threshold ?? 75);
      setAlertsEnabled(data.alertsEnabled ?? true);
      setSubjects(
        Array.isArray(data.subjects) && data.subjects.length
          ? data.subjects
          : DEFAULT_SUBJECTS
      );
    } catch {
      setSubjects(DEFAULT_SUBJECTS);
    }
  }, []);

  /* ---------- SAVE ON CHANGE ---------- */
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        threshold,
        alertsEnabled,
        subjects,
      })
    );
  }, [threshold, alertsEnabled, subjects]);

  /* ---------- STUDENT ACTIONS ---------- */

  const addSubject = subject => {
    setSubjects(prev => [...prev, subject]);
  };

  const updateSubject = (id, updated) => {
    setSubjects(prev =>
      prev.map(s => (s.id === id ? updated : s))
    );
  };

  const removeSubject = id => {
    setSubjects(prev => prev.filter(s => s.id !== id));
  };

  const resetAll = () => {
    setSubjects(
      DEFAULT_SUBJECTS.map(s => ({
        ...s,
        id: Date.now() + Math.random(),
      }))
    );
  };

  /* ---------- CALCULATIONS ---------- */

  const calculateOverall = () => {
    if (!subjects.length) return 0;

    const attended = subjects.reduce(
      (sum, s) => sum + s.attendedLectures,
      0
    );

    const total = subjects.reduce(
      (sum, s) => sum + s.totalLectures,
      0
    );

    return Math.round((attended / total) * 100);
  };

  /* ---------- SIMULATION (PURE) ---------- */

  const simulateNextLecture = (subject, willAttend) => {
    const newTotal = subject.totalLectures + 1;
    const newAttended = willAttend
      ? subject.attendedLectures + 1
      : subject.attendedLectures;

    return Math.round((newAttended / newTotal) * 100);
  };

  return (
    <AttendanceContext.Provider
      value={{
        /* admin */
        threshold,
        alertsEnabled,
        setThreshold,
        setAlertsEnabled,

        /* student */
        subjects,
        addSubject,
        updateSubject,
        removeSubject,
        resetAll,

        /* helpers */
        calculateOverall,
        simulateNextLecture,
      }}
    >
      {children}
    </AttendanceContext.Provider>
  );
};

export const useAttendance = () => {
  const ctx = useContext(AttendanceContext);
  if (!ctx) {
    throw new Error(
      "useAttendance must be used inside AttendanceProvider"
    );
  }
  return ctx;
};
