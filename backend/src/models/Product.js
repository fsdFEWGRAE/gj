import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  created_by: { type: String },
  created_at: { type: Date, default: Date.now }
});
export default mongoose.model("Product", ProductSchema);
