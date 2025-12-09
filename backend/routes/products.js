import express from "express";
import Product from "../models/product.model.js";
import authCheck from "../middleware/authCheck.js";

const router = express.Router();

router.post("/create", authCheck, async (req, res) => {
  if (!["MASTER", "OWNER"].includes(req.user.roleCode))
    return res.status(403).json({ success: false, message: "Forbidden" });

  const { name, description } = req.body;
  const exists = await Product.findOne({ name });
  if (exists)
    return res.json({ success: false, message: "Product already exists" });

  await Product.create({ name, description });
  res.json({ success: true });
});

router.get("/all", authCheck, async (req, res) => {
  const products = await Product.find();
  res.json({ success: true, products });
});

export default router;
