import express from "express";
import Product from "../models/Product.js";
import { success, error } from "../utils/response.js";
const router = express.Router();

router.post("/create", async (req, res) =
  const { name, description, created_by } = req.body;
  const exist = await Product.findOne({ name });
  if (exist) return error(res, "Product exists");
  const product = await Product.create({ name, description, created_by });
  success(res, product);
});

router.get("/all", async (req, res) =
  const items = await Product.find();
  success(res, items);
});

export default router;
