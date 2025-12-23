import { createContext, useContext, useEffect, useState } from "react";

const PlacementsContext = createContext();
const STORAGE_KEY = "placements_v1";

const initialPlacements = [
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

export const PlacementsProvider = ({ children }) => {
  const [placements, setPlacements] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      setPlacements(initialPlacements);
      return;
    }
    setPlacements(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(placements));
  }, [placements]);

  const addPlacement = p => {
    setPlacements(prev => [...prev, { ...p, id: Date.now() }]);
  };

  const updateStatus = (id, status) => {
    setPlacements(prev =>
      prev.map(p => (p.id === id ? { ...p, status } : p))
    );
  };

  const removePlacement = id => {
    setPlacements(prev => prev.filter(p => p.id !== id));
  };

  return (
    <PlacementsContext.Provider
      value={{
        placements,
        addPlacement,
        updateStatus,
        removePlacement,
      }}
    >
      {children}
    </PlacementsContext.Provider>
  );
};

export const usePlacements = () => useContext(PlacementsContext);
