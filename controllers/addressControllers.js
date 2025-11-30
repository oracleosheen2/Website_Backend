import User from "../models/user.js";
import Joi from "joi";

// ------------ ADD ADDRESS ------------
export const addAddress = async (req, res) => {
  try {
    const schema = Joi.object({
      type: Joi.string().required(),
      name: Joi.string().required(),
      address: Joi.string().required(),
      phone: Joi.string().required(),
      isDefault: Joi.boolean().optional()
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // If default selected → remove default from existing addresses
    if (req.body.isDefault) {
      user.addresses.forEach(a => (a.isDefault = false));
    }

    user.addresses.push(req.body);
    await user.save();

    res.json({ message: "Address added successfully", addresses: user.addresses });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ------------ GET ALL ADDRESSES ------------
export const getAddresses = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ addresses: user.addresses });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ------------ UPDATE ADDRESS ------------
export const updateAddress = async (req, res) => {
  try {
    const schema = Joi.object({
      type: Joi.string().optional(),
      name: Joi.string().optional(),
      address: Joi.string().optional(),
      phone: Joi.string().optional(),
      isDefault: Joi.boolean().optional()
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const { addressId } = req.params;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const address = user.addresses.id(addressId);
    if (!address) return res.status(404).json({ message: "Address not found" });

    // Update default state
    if (req.body.isDefault) {
      user.addresses.forEach(a => (a.isDefault = false));
    }

    Object.assign(address, req.body);

    await user.save();

    res.json({ message: "Address updated", addresses: user.addresses });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ------------ DELETE ADDRESS ------------
export const deleteAddress = async (req, res) => {
  try {
    const { addressId } = req.params;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.addresses = user.addresses.filter(
      a => a._id.toString() !== addressId
    );

    await user.save();

    res.json({ message: "Address deleted", addresses: user.addresses });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
