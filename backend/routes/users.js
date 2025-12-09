import express from "express";
import User from "../models/user.model.js";
import authCheck from "../middleware/authCheck.js";

const router = express.Router();

// Get All Users (MASTER + OWNER)
router.get("/all", authCheck, async (req, res) => {
  if (!["MASTER", "OWNER"].includes(req.user.roleCode))
    return res.status(403).json({ success: false, message: "Forbidden" });

  const users = await User.find().select("-password");
  res.json({ success: true, users });
});

export default router;
