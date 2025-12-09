import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";

import connectDB from "./src/database/mongo.js";
import authRoutes from "./src/routes/auth.js";
import productRoutes from "./src/routes/products.js";
import userRoutes from "./src/routes/users.js";
import discordRoutes from "./src/routes/discord.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

connectDB();

app.use("/glom/api/auth", authRoutes);
app.use("/glom/api/products", productRoutes);
app.use("/glom/api/users", userRoutes);
app.use("/glom/api/discord", discordRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../panel/build")));
app.get("*", (req, res) =
  res.sendFile(path.join(__dirname, "../panel/build/index.html"));
});

app.listen(PORT, () = Authorization API running on port: ${PORT}`));
