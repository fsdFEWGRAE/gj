import mongoose from "mongoose";
const RoleProductsSchema = new mongoose.Schema({
  roleId: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }
}
