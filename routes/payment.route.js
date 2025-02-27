import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { createPayment } from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/", protectRoute, createPayment);

export default router;
