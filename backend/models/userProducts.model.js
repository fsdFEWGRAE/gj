import mongoose from "mongoose";
const UserProductsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }
});
export default mongoose.model("UserProducts", UserProductsSchema);
