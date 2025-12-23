import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { TransportProvider } from './context/TransportContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { PlacementsProvider } from './context/PlacementsContext.jsx'
import { AttendanceProvider } from './context/AttendanceContext.jsx'
import { CanteenProvider } from "./context/CanteenContext";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
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
  </BrowserRouter>
);