import express from "express";
import speakeasy from "speakeasy";
import qrcode from "qrcode";
import User from "../models/user.model.js";
const router = express.Router();
router.post("/2fa/enable", async (req, res) =
  const secret = speakeasy.generateSecret();
  await User.findByIdAndUpdate(req.user.userId, { twoFASecret: secret.base32 });
  qrcode.toDataURL(secret.otpauth_url, (err, dataURL) =
    res.json({ success: true, qr: dataURL });
  });
});
router.post("/2fa/verify", async (req, res) =
  const { code } = req.body;
  const user = await User.findById(req.user.userId);
  const verified = speakeasy.totp.verify({
    secret: user.twoFASecret,
    encoding: "base32",
    token: code
  });
  if (!verified) return res.json({ success: false, message: "Invalid Code" });
  await User.findByIdAndUpdate(req.user.userId, { twoFAEnabled: true });
  res.json({ success: true });
});
router.post("/2fa/disable", async (req, res) =
  await User.findByIdAndUpdate(req.user.userId, { twoFAEnabled: false, twoFASecret: null });
  res.json({ success: true });
});
export default router;
