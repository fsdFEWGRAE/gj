import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./src/database/mongo.js";
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import userRoutes from "./routes/users.js";
import securityRoutes from "./routes/security.js";
import Role from "./models/role.model.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// اتصال Mongo
connectDB();

// إنشاء الرتب إذا ما كانت موجودة
async function ensureRoles() {
  const count = await Role.countDocuments();
  if (count === 0) {
    await Role.insertMany([
      { name: "Master Source", code: "MASTER", level: 999 },
      { name: "OWN Source", code: "OWNER", level: 700 },
      { name: "Source", code: "SOURCE", level: 400 },
      { name: "Panel", code: "PANEL", level: 100 },
    ]);
    console.log("AUTO: Roles initialized.");
  }
}
ensureRoles().catch(console.error);

// ربط الـ Routes
app.use("/glom/api/auth", authRoutes);
app.use("/glom/api/products", productRoutes);
app.use("/glom/api/users", userRoutes);
app.use("/glom/api/security", securityRoutes);

// خدمة React من panel/dist
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../panel/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../panel/dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Authorization API running on port: ${PORT}`);
});
