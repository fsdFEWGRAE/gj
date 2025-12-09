import express from "express";
import User from "../models/User.js";
import { success, error } from "../utils/response.js";
const router = express.Router();
router.get("/all", async (req, res) =
  const users = await User.find({}, "-password");
  success(res, users);
});

export default router;
