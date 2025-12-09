import { Link } from "react-router-dom";
const Sidebar = () =
  return (>> 
    <div style={{ width: "220px", height: "100vh", background: "#140000", borderRight: "2px solid #8b0000", position: "fixed", left: 0, top: 0 }}> 
      <div style={{ padding: "20px", textAlign: "center", borderBottom: "1px solid #8b0000" }}> 
        <img src="/glom-logo.png" alt="Logo" style={{ width: "60px", filter: "drop-shadow(0 0 5px red)" }} /> 
        <h3 style={{ color: "#ff0000", marginTop: "10px" }}>GLOM AUTH</h3> 
      </div> 
      <ul style={{ listStyle: "none", padding: "20px" }}> 
        <li style={{ margin: "20px 0" }}><Link style={{ color: "white", textDecoration: "none" }} to="/">Dashboard</Link></li> 
        <li style={{ margin: "20px 0" }}><Link style={{ color: "white", textDecoration: "none" }} to="/users">Users</Link></li> 
        <li style={{ margin: "20px 0" }}><Link style={{ color: "white", textDecoration: "none" }} to="/products">Products</Link></li> 
        <li style={{ margin: "20px 0" }}><Link style={{ color: "white", textDecoration: "none" }} to="/security">Security</Link></li> 
      </ul> 
    </div> 
  );
};
export default Sidebar;
