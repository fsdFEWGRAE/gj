import mongoose from "mongoose";
const RoleSchema = new mongoose.Schema({
  owner: { type: Boolean, default: false },
  super_owner: { type: Boolean, default: false },
  source: { type: Boolean, default: false },
  panel: { type: Boolean, default: true }
});
export default mongoose.model("Role", RoleSchema);
