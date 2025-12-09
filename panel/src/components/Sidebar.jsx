import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Sidebar = () => {
  const { user } = useContext(AuthContext);

  if (!user) return null;

  return (
    <div
      style={{
        width: "220px",
        height: "100vh",
        background: "#140000",
        borderRight: "2px solid #8b0000",
        position: "fixed",
        left: 0,
        top: 0,
        paddingTop: "20px",
      }}
    >
      <div style={{ color: "white", textAlign: "center", marginBottom: "20px" }}>
        <strong>GLOM Authorization</strong>
      </div>

      <Link to="/" style={{ color: "white", display: "block", padding: "10px" }}>
        Dashboard
      </Link>

      {["MASTER", "OWNER"].includes(user.roleCode) && (
        <Link to="/users" style={{ color: "white", display: "block", padding: "10px" }}>
          Users
        </Link>
      )}

      {["MASTER", "OWNER"].includes(user.roleCode) && (
        <Link to="/products" style={{ color: "white", display: "block", padding: "10px" }}>
          Products
        </Link>
      )}

      {["MASTER", "OWNER", "SOURCE"].includes(user.roleCode) && (
        <Link to="/assign" style={{ color: "white", display: "block", padding: "10px" }}>
          Assign Products
        </Link>
      )}

      <Link to="/security" style={{ color: "white", display: "block", padding: "10px" }}>
        Security
      </Link>
    </div>
  );
};

export default Sidebar;
