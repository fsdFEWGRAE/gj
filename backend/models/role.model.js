import mongoose from "mongoose";
const RoleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  code: { type: String, required: true, unique: true },
  level: { type: Number, required: true }
});
export default mongoose.model("Role", RoleSchema);
