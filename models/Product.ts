import mongoose, {Schema, Model} from "mongoose";
import { IProduct } from "@/intefaces";

const ProductSchema:Schema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  inStock: {
    type: Number,
    required: true,
    default: 0
  },
  price: {
    type: Number,
    required: true,
    default: 0
  },
  sizes: {
    type: [String],
    enum: {
      values: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
      message: "size: {VALUE} is not supported",
    },
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: {
      values: ["shirts", "pants", "hoodies", "hats"],
      message: "type: {VALUE} is not supported",
    },
    required: true,
  },
  gender: {
    type: String,
    enum: {
      values: ["men", "women", "kid", "unisex"],
      message: "gender: {VALUE} is not supported",
    },
    required: true,
  }
}, {
  timestamps: true
});

export const ProductModel: Model<IProduct> = mongoose.models.Product || mongoose.model("Product", ProductSchema);
