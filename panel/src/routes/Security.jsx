import { useState } from "react";
import api from "../axiosInstance";

const Security = () => {
  const [qr, setQR] = useState(null);
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  const enable2FA = async () => {
    const res = await api.post("/security/2fa/enable");
    if (res.data.qr) setQR(res.data.qr);
  };

  const verify2FA = async () => {
    const res = await api.post("/security/2fa/verify", { code });
    setMessage(res.data.success ? "2FA Enabled Successfully" : "Invalid Code");
  };

  const disable2FA = async () => {
    const res = await api.post("/security/2fa/disable");
    setMessage("2FA Disabled");
  };

  const connectDiscord = () => {
    window.location.href = "/glom/api/security/discord/login";
  };

  const disconnectDiscord = () => {
    setMessage("Discord disconnected (UI placeholder)");
  };

  return (
    <div style={{ marginLeft: "220px", padding: "20px", color: "white" }}>
      <h2 style={{ marginBottom: "20px", color: "red" }}>Security Settings</h2>

      <div style={{ marginBottom: "30px" }}>
        <h3>Two-Factor Authentication (2FA)</h3>
        <button onClick={enable2FA} style={{ padding: "6px", marginRight: "10px" }}>
          Enable 2FA
        </button>
        <button onClick={disable2FA} style={{ padding: "6px" }}>
          Disable 2FA
        </button>

        {qr && (
          <>
            <p>Scan QR using Google Authenticator:</p>
            <img src={qr} alt="QR" style={{ width: "200px", marginBottom: "10px" }} />
            <input
              placeholder="Enter 2FA Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              style={{ marginRight: "10px" }}
            />
            <button onClick={verify2FA}>Verify</button>
          </>
        )}
      </div>

      <hr style={{ borderColor: "#550000" }} />

      <div style={{ marginTop: "30px" }}>
        <h3>Discord Account Linking</h3>
        <button onClick={connectDiscord} style={{ padding: "6px", marginRight: "10px" }}>
          Connect Discord
        </button>
        <button onClick={disconnectDiscord} style={{ padding: "6px" }}>
          Disconnect Discord
        </button>
      </div>

      {message && <p style={{ marginTop: "20px", color: "yellow" }}>{message}</p>}
    </div>
  );
};

export default Security;
