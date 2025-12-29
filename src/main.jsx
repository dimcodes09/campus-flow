import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import "./index.css";
import App from "./App.jsx";

import { AuthProvider } from "./context/AuthContext.jsx";
import { TransportProvider } from "./context/TransportContext.jsx";
import { PlacementsProvider } from "./context/PlacementsContext.jsx";
import { AttendanceProvider } from "./context/AttendanceContext.jsx";
import { CanteenProvider } from "./context/CanteenContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <TransportProvider>
          <PlacementsProvider>
            <AttendanceProvider>
              <CanteenProvider>
                <App />
              </CanteenProvider>
            </AttendanceProvider>
          </PlacementsProvider>
        </TransportProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  </BrowserRouter>
);
