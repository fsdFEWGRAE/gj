import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./routes/ProtectedRoute";
import Forbidden403 from "./routes/Forbidden403";
import Security from "./routes/Security";
import Login from "./routes/Login";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Sidebar />
        <Routes>
          <Route path="/" element={<ProtectedRoute><div style={{color:"white", padding:"20px"}}>Dashboard</div></ProtectedRoute>} />
          <Route path="/security" element={<ProtectedRoute><Security /></ProtectedRoute>} />
          <Route path="/403" element={<Forbidden403 />} />
          <Route path="/auth/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
