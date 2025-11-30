/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - originalPrice
 *         - image
 *       properties:
 *         name:
 *           type: string
 *         price:
 *           type: number
 *         originalPrice:
 *           type: number
 *         image:
 *           type: string
 *         discount:
 *           type: string
 *         description:
 *           type: string
 *         category:
 *           type: string
 *         inStock:
 *           type: boolean
 */


import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },                // ₹3499 → 3499
    originalPrice: { type: Number, required: true },        // ₹4999 → 4999
    image: { type: String, required: true },
    discount: { type: String },                              // "30% off"
    description: { type: String },
    category: { type: String },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
