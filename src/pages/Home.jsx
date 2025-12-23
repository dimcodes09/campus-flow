import { Link } from "react-router-dom";

const Card = ({ to, title, desc }) => {
  return (
    <Link
      to={to}
      className="border border-white/10 rounded-lg p-4 hover:border-blue-500/40 transition block"
    >
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-sm text-gray-400">{desc}</p>
    </Link>
  );
};

const Home = () => {
  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center text-center px-6">
      <h1 className="text-4xl font-bold mb-4 text-blue-400">
        Campus Flow
      </h1>

      <p className="text-gray-300 max-w-2xl mb-8">
        A modular campus management prototype focused on transport visibility,
        student insights, and essential campus services.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl text-left">
        <Card
          to="/transport"
          title="🚌 Transport Tracking"
          desc="Simulated bus tracking and campus stop integration for daily mobility."
        />

        <Card
          to="/campus-map"
          title="🗺️ Campus Map"
          desc="Interactive campus layout with key locations and bus stops."
        />

        <Card
          to="/attendance"
          title="✅ Attendance Insights"
          desc="Self-reported attendance tracking with alerts and simulation."
        />

        <Card
          to="/canteen"
          title="🍽️ Campus Canteen"
          desc="Live canteen rush status and menu availability (demo)."
        />

        <Card
          to="/placements"
          title="💼 Placements & Internships"
          desc="Centralized view of upcoming drives and eligibility information."
        />
      </div>

      <p className="text-xs text-gray-500 mt-10">
        This project is a conceptual prototype built for evaluation purposes.
      </p>
    </div>
  );
};

export default Home;
