



import Product from "../models/product.js";

export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      message: "Product created",
      data: product,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    res.status(200).json({ success: true, data: product });
  } catch {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    res.status(200).json({ success: true, data: product });
  } catch {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    res.status(200).json({ success: true, message: "Product deleted" });
  } catch {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
