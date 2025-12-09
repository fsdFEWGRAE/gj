const Login = () =
  return (>> 
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}> 
      <img src="/glom-logo.png" alt="logo" style={{ width: "90px", marginBottom: "20px", filter: "drop-shadow(0 0 6px red)" }} /> 
      <h2 style={{ color: "white", marginBottom: "20px" }}>Welcome to GLOM Authorization</h2> 
      <form style={{ display: "flex", flexDirection: "column", width: "300px" }}> 
        <input placeholder="Username" style={{ padding: "8px", marginBottom: "10px", background: "black", border: "1px solid red", color: "white" }} /> 
        <input placeholder="Password" type="password" style={{ padding: "8px", marginBottom: "10px", background: "black", border: "1px solid red", color: "white" }} /> 
        <button style={{ padding: "8px", background: "#660000", border: "1px solid red", color: "white", cursor: "pointer" }}>Login</button> 
      </form> 
    </div> 
  );
};
export default Login;
