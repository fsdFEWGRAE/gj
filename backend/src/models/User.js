import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "panel" },
  discord_id: { type: String, default: null },
  discord_username: { type: String, default: null },
  discord_avatar: { type: String, default: null },
  two_fa_secret: { type: String, default: null },
  created_by: { type: String },
  created_at: { type: Date, default: Date.now }
});
export default mongoose.model("User", UserSchema);
