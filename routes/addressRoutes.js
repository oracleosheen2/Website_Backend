import express from "express";
import {
  addAddress,
  getAddresses,
  updateAddress,
  deleteAddress
} from "../controllers/addressControllers.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Addresses
 *   description: Address management APIs
 */

/**
 * @swagger
 * /api/addresses:
 *   post:
 *     summary: Add a new address (Requires JWT)
 *     tags: [Addresses]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               street:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               postalCode:
 *                 type: string
 *               country:
 *                 type: string
 *     responses:
 *       201:
 *         description: Address added successfully
 */
router.post("/", protect, addAddress);

/**
 * @swagger
 * /api/addresses:
 *   get:
 *     summary: Get all addresses (Requires JWT)
 *     tags: [Addresses]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of all addresses
 */
router.get("/", protect, getAddresses);

/**
 * @swagger
 * /api/addresses/{addressId}:
 *   put:
 *     summary: Update an address (Requires JWT)
 *     tags: [Addresses]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: addressId
 *         required: true
 *         schema:
 *           type: string
 *         description: Address ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               street:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               postalCode:
 *                 type: string
 *               country:
 *                 type: string
 *     responses:
 *       200:
 *         description: Address updated successfully
 */
router.put("/:addressId", protect, updateAddress);

/**
 * @swagger
 * /api/addresses/{addressId}:
 *   delete:
 *     summary: Delete an address (Requires JWT)
 *     tags: [Addresses]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: addressId
 *         required: true
 *         schema:
 *           type: string
 *         description: Address ID
 *     responses:
 *       200:
 *         description: Address deleted successfully
 */
router.delete("/:addressId", protect, deleteAddress);

export default router;
