import { Link } from "react-router-dom";
import {
  FiTruck,
  FiMap,
  FiCheckSquare,
  FiCoffee,
  FiBriefcase
} from "react-icons/fi";
import { FiFileText } from "react-icons/fi";

const FeatureCard = ({ to, title, desc, icon: Icon }) => {
  return (
    <Link
      to={to}
      className="border border-cyan-400/40 rounded-xl p-4
                 bg-black/35 backdrop-blur-md
                 transition block
                 hover:border-cyan-400 hover:-translate-y-1
                 hover:shadow-[0_0_25px_rgba(34,211,238,0.35)]"
    >
      <div className="flex items-start gap-3">
        <Icon
          className="text-cyan-400/70 mt-1
                     transition
                     group-hover:text-cyan-400
                     drop-shadow-[0_0_6px_rgba(34,211,238,0.4)]"
          size={18}
        />

        <div>
          <h3 className="font-semibold text-white mb-1">
            {title}
          </h3>
          <p className="text-sm text-white/70">
            {desc}
          </p>
        </div>
      </div>
    </Link>
  );
};

const Home = () => {
  return (
    <div className="relative min-h-screen text-white">

      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      />

      {/* SOFT CYAN GLOW */}
      <div
        className="absolute inset-0
        bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.15),transparent_65%)]"
      />

      {/* LIGHT OVERLAY */}
      <div className="absolute inset-0 bg-black/45" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24">

        {/* HERO TEXT */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-cyan-400 mb-4">
            Campus Flow
          </h1>
          <p className="max-w-2xl mx-auto text-white/70">
            A modular campus management prototype focused on transport visibility,
            student insights, and essential campus services.
          </p>
        </div>

        {/* FEATURE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 max-w-3xl mx-auto">

          <FeatureCard
            to="/transport"
            title="Transport Tracking"
            desc="Simulated bus tracking and campus stop integration for daily mobility."
            icon={FiTruck}
          />

          <FeatureCard
            to="/campus-map"
            title="Campus Map"
            desc="Interactive campus layout with key locations and bus stops."
            icon={FiMap}
          />

          <FeatureCard
            to="/attendance"
            title="Attendance Insights"
            desc="Self-reported attendance tracking with alerts and simulation."
            icon={FiCheckSquare}
          />

          <FeatureCard
            to="/canteen"
            title="Campus Canteen"
            desc="Live canteen rush status and menu availability (demo)."
            icon={FiCoffee}
          />

          <FeatureCard
            to="/placements"
            title="Placements & Internships"
            desc="Centralized view of upcoming drives and eligibility information."
            icon={FiBriefcase}
          />

          <FeatureCard
  to="/admin-services"
  title="Admin Services"
  desc="Track ID card and certificate request status digitally."
  icon={FiFileText}
/>
        </div>

        {/* FOOTER NOTE */}
        <p className="text-center text-xs text-white/40 mt-14 pb-10">
          This project is a conceptual prototype built for evaluation purposes.
        </p>
      </div>
    </div>
  );
};

export default Home;
