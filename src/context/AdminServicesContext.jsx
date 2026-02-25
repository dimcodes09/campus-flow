import { createContext, useContext, useEffect, useState } from "react";
import { adminServicesData } from "../data/adminServicesData";

const AdminServicesContext = createContext();

export const AdminServicesProvider = ({ children }) => {
  const [requests, setRequests] = useState(() => {
    const saved = localStorage.getItem("admin_requests");
    return saved ? JSON.parse(saved) : adminServicesData;
  });

  useEffect(() => {
    localStorage.setItem("admin_requests", JSON.stringify(requests));
  }, [requests]);

  const addRequest = (req) => {
    setRequests(prev => [...prev, req]);
  };

  const updateRequestStatus = (id, status) => {
    setRequests(prev =>
      prev.map(r =>
        r.id === id ? { ...r, status } : r
      )
    );
  };

  const removeRequest = (id) => {
    setRequests(prev =>
      prev.filter(r => r.id !== id)
    );
  };

  return (
    <AdminServicesContext.Provider
      value={{
        requests,
        addRequest,
        updateRequestStatus,
        removeRequest
      }}
    >
      {children}
    </AdminServicesContext.Provider>
  );
};

export const useAdminServices = () =>
  useContext(AdminServicesContext);