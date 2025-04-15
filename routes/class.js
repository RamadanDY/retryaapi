import {
  createClasses,
  getAllClasses,
  getClassBookings,
  getClassesById,
} from "../controllers/classes.js";
import { Router } from "express";

const router = Router();

router.get("/", getAllClasses);
router.get("/:id", getClassesById);
router.get("/:id/bookings", getClassBookings);
router.post("/", createClasses);

export default router;
