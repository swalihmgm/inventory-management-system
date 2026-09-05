import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Assets from "./pages/Assets";
import Dashbord from "./pages/Dashbord";
import Inventory from "./pages/Invertory";
import Tickets from "./pages/Tickets";
import Login from "./pages/Login";
import Assignment from "./pages/Assignment";
import ProtectedRoute from "./compenents/ProtectedRoute";
import ChatBot from "./pages/ChatBot";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashbord"
          element={
            <ProtectedRoute>
              <Dashbord />
            </ProtectedRoute>
          }
        />

        <Route
          path="/assets"
          element={
            <ProtectedRoute>
              <Assets />
            </ProtectedRoute>
          }
        />

        <Route
          path="/inventory"
          element={
            <ProtectedRoute>
              <Inventory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tickets"
          element={
            <ProtectedRoute>
              <Tickets />
            </ProtectedRoute>
          }
        />

        <Route
          path="/assignments"
          element={
            <ProtectedRoute>
              <Assignment />
            </ProtectedRoute>
          }
        />

        <Route path="/chat" element={<ChatBot />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
