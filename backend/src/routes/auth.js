import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { generateToken } from "../utils/jwt.js";
import { generate2FA, verify2FA } from "../utils/twofa.js";
import { success, error } from "../utils/response.js";
const router = express.Router();

// LOGIN 
router.post("/login", async (req, res) =
  const { username, password, token } = req.body;
  const user = await User.findOne({ username });
  if (!user) return error(res, "Invalid username");
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return error(res, "Incorrect password");

  if (user.two_fa_secret) {
    if (!token) return error(res, "2FA required");
    const verified = verify2FA(user.two_fa_secret, token);
    if (!verified) return error(res, "Invalid 2FA code");
  }
  const jwtToken = generateToken({ id: user._id, role: user.role });
  success(res, { token: jwtToken, username: user.username, role: user.role });
});

// REGISTER 
router.post("/register", async (req, res) =
  const { username, password, role, created_by } = req.body;
  const exist = await User.findOne({ username });
  if (exist) return error(res, "Username already exists");
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await User.create({ username, password: hash, role, created_by });
  success(res, user);
});

// ENABLE 2FA 
router.post("/2fa/setup", async (req, res) =
  const { username } = req.body;
  const user = await User.findOne({ username });
  if (!user) return error(res, "User not found");
  const { secret, qr } = await generate2FA(username);
  user.two_fa_secret = secret;
  await user.save();
  success(res, { qr });
});

// DISABLE 2FA 
router.post("/2fa/disable", async (req, res) =
  const { username } = req.body;
  const user = await User.findOne({ username });
  user.two_fa_secret = null;
  await user.save();
  success(res, "2FA disabled");
});

export default router;
