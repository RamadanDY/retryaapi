import { getAllClasses, getClassesById } from "../controllers/classes.js";
import { Router } from "express";

const router = Router();

router.get("/", getAllClasses);
router.get("/:id/classes", getClassesById);

export default router;
