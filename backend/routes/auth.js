import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import RoleProducts from "../models/roleProducts.model.js";
import UserProducts from "../models/userProducts.model.js";
const router = express.Router();
router.post("/login", async (req, res) =
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).populate("roleId");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    if (user.password !== password) return res.status(401).json({ success: false, message: "Incorrect password" });
    const roleProducts = await RoleProducts.find({ roleId: user.roleId }).populate("productId");
    const userProducts = await UserProducts.find({ userId: user._id }).populate("productId");
    const combinedProducts = [...roleProducts.map(r =, ...userProducts.map(p =
    const token = jwt.sign({ userId: user._id, role: user.roleId.code }, "SECRET", { expiresIn: "7d" });
    return res.json({
      success: true,
      token,
      user: {
        username: user.username,
        role: user.roleId.name,
        roleCode: user.roleId.code,
        roleLevel: user.roleId.level,
        discordLinked: user.discordId ? true : false,
        products: [...new Set(combinedProducts)]
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});
export default router;
