import { useState } from "react";
import {
  FiBriefcase,
  FiAward,
  FiUsers,
  FiCalendar,
} from "react-icons/fi";

const placementsData = [
  {
    id: 1,
    company: "TCS",
    role: "Software Engineer",
    branches: ["CSE", "IT"],
    date: "12 Oct 2025",
    status: "Open",
    type: "Placement",
  },
  {
    id: 2,
    company: "Infosys",
    role: "System Engineer",
    branches: ["CSE", "IT", "ECE"],
    date: "18 Oct 2025",
    status: "Open",
    type: "Placement",
  },
  {
    id: 3,
    company: "Wipro",
    role: "Project Engineer",
    branches: ["CSE", "IT", "EEE"],
    date: "05 Oct 2025",
    status: "Closed",
    type: "Placement",
  },
  {
    id: 4,
    company: "Accenture",
    role: "Associate Software Engineer",
    branches: ["CSE", "IT"],
    date: "22 Oct 2025",
    status: "Open",
    type: "Placement",
  },
  {
    id: 5,
    company: "Cognizant",
    role: "Programmer Analyst",
    branches: ["CSE", "IT", "ECE"],
    date: "15 Oct 2025",
    status: "Closed",
    type: "Placement",
  },
  {
    id: 6,
    company: "Amazon",
    role: "SDE Intern",
    branches: ["CSE", "IT"],
    date: "01 Nov 2025",
    status: "Open",
    type: "Internship",
  },
  {
    id: 7,
    company: "Microsoft",
    role: "Software Intern",
    branches: ["CSE"],
    date: "10 Nov 2025",
    status: "Open",
    type: "Internship",
  },
  {
    id: 8,
    company: "Google",
    role: "STEP Intern",
    branches: ["CSE", "IT"],
    date: "15 Nov 2025",
    status: "Open",
    type: "Internship",
  },
  {
    id: 9,
    company: "Capgemini",
    role: "Analyst",
    branches: ["CSE", "IT", "ECE"],
    date: "28 Sep 2025",
    status: "Closed",
    type: "Placement",
  },
  {
    id: 10,
    company: "Deloitte",
    role: "Consulting Analyst",
    branches: ["CSE", "IT", "MBA"],
    date: "30 Oct 2025",
    status: "Open",
    type: "Placement",
  },
  {
    id: 11,
    company: "IBM",
    role: "Associate Engineer",
    branches: ["CSE", "IT", "EEE"],
    date: "20 Oct 2025",
    status: "Closed",
    type: "Placement",
  },
  {
    id: 12,
    company: "Flipkart",
    role: "Backend Intern",
    branches: ["CSE", "IT"],
    date: "05 Nov 2025",
    status: "Open",
    type: "Internship",
  },
  {
    id: 13,
    company: "Paytm",
    role: "Mobile App Intern",
    branches: ["CSE", "IT"],
    date: "12 Nov 2025",
    status: "Open",
    type: "Internship",
  },
  {
    id: 14,
    company: "Zoho",
    role: "Member Technical Staff",
    branches: ["CSE", "IT"],
    date: "25 Oct 2025",
    status: "Open",
    type: "Placement",
  },
  {
    id: 15,
    company: "Reliance Jio",
    role: "Network Engineer",
    branches: ["ECE", "EEE"],
    date: "02 Nov 2025",
    status: "Closed",
    type: "Placement",
  },
];


export default function Placements() {
  const [branch, setBranch] = useState("All");

  const filtered = placementsData.filter(p =>
    branch === "All" ? true : p.branches.includes(branch)
  );
  
return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-semibold tracking-wide">
        Placements & Internships
      </h1>

      <p className="text-sm text-white/50">
        Live placement opportunities posted by admin
      </p>

      <div>
        <label className="text-sm mr-2 text-white/60">
          Filter by branch:
        </label>
        <select
          value={branch}
          onChange={e => setBranch(e.target.value)}
          className="bg-black/60 border border-white/20 px-3 py-2 rounded-md text-sm"
        >
          <option>All</option>
          <option>CSE</option>
          <option>IT</option>
          <option>ECE</option>
          <option>EEE</option>
          <option>MBA</option>
        </select>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map(p => (
          <div
            key={p.id}
            className="border border-white/10
                       bg-black/40 backdrop-blur
                       rounded-lg p-4
                       transition
                       hover:border-cyan-400/40
                       hover:bg-black/50"
          >
            <div className="flex justify-between items-start">
              <h3 className="font-medium flex items-center gap-2">
                <FiBriefcase className="text-cyan-400 text-sm" />
                {p.company}
              </h3>

              <span
                className={`text-xs px-2 py-1 rounded-md
                  ${
                    p.status === "Open"
                      ? "bg-green-500/10 text-green-400 border border-green-500/30"
                      : "bg-red-500/10 text-red-400 border border-red-500/30"
                  }`}
              >
                {p.status}
              </span>
            </div>

            <p className="text-sm text-white/90 mt-2 flex items-center gap-2">
              <FiAward className="text-white/60 text-sm" />
              {p.role}
            </p>

            <p className="text-xs text-white/50 mt-2 flex items-center gap-2">
              <FiUsers className="text-white/40 text-sm" />
              Eligible: {p.branches.join(", ")}
            </p>

            <p className="text-xs text-white/50 flex items-center gap-2">
              <FiCalendar className="text-white/40 text-sm" />
              {p.type} | Drive Date: {p.date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}