const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    description: { type: String, required: true, trim: true },
    offer: { type: Number },
    productPictures: [
      {
        img: { type: String },
      },
    ],
    reviews: [
      { userId: { type: ObjectId, ref: "User" }, review: { type: String } },
    ],
    category: { type: ObjectId, ref: "Category", required: true },
    createdBy: { type: ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
