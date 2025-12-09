import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./routes/Login";
import Dashboard from "./routes/Dashboard";
import Security from "./routes/Security";
import Users from "./routes/Users";
import Products from "./routes/Products";
import NotFound from "./routes/NotFound";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import WarningBanner from "./components/WarningBanner";
import AuthProvider from "./context/AuthContext";
import "./styles/global.css";
import "./styles/bloody.css";

const App = () =
  return (>> 
    <AuthProvider> 
      <BrowserRouter> 
        <Routes> 
          <Route path="/auth/login" element={<Login />} /> 
          <Route path="/" element={<Sidebar />} /> 
        </Routes> 
      </BrowserRouter> 
    </AuthProvider> 
  );
};
export default App;
