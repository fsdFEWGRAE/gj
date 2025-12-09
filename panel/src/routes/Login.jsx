import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axiosInstance";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [username, setUser] = useState("");
  const [password, setPass] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", {
        username,
        password,
      });

      if (!res.data.success) {
        setError(res.data.message || "Login failed");
        return;
      }

      // حفظ التوكن واليوزر في الكونتكست + localStorage
      login({
        token: res.data.token,
        user: res.data.user,
      });

      // بعد تسجيل الدخول يروح للداشبورد
      navigate("/");
    } catch (err) {
      setError("Login failed");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "black",
      }}
    >
      <h2
        style={{
          color: "red",
          marginBottom: "20px",
          textShadow: "0 0 10px red",
        }}
      >
        GLOM Authorization
      </h2>

      {error && <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>}

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "280px",
          background: "#111",
          padding: "20px",
          borderRadius: "8px",
          border: "1px solid #500",
          boxShadow: "0 0 15px #900",
        }}
      >
        <input
          value={username}
          onChange={(e) => setUser(e.target.value)}
          placeholder="Username"
          style={{
            padding: "8px",
            marginBottom: "10px",
            background: "black",
            border: "1px solid #700",
            color: "white",
          }}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPass(e.target.value)}
          placeholder="Password"
          style={{
            padding: "8px",
            marginBottom: "10px",
            background: "black",
            border: "1px solid #700",
            color: "white",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "8px",
            background: "#660000",
            border: "1px solid #aa0000",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
