import express from "express";
import {
  getTestimonials,
  getTestimonial,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "../controllers/testimonialControllers.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Testimonials
 *   description: Testimonial API Endpoints
 */

/**
 * @swagger
 * /api/testimonials:
 *   get:
 *     summary: Get all testimonials
 *     tags: [Testimonials]
 *     responses:
 *       200:
 *         description: List of testimonials
 */
router.route("/").get(getTestimonials).post(createTestimonial);

/**
 * @swagger
 * /api/testimonials/{id}:
 *   get:
 *     summary: Get a testimonial by id
 *     tags: [Testimonials]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Testimonial object
 */
router.route("/:id").get(getTestimonial).put(updateTestimonial).delete(deleteTestimonial);

export default router;
