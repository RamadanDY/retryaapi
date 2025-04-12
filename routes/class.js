import { getAllClasses } from "../controllers/classes.js";
import { Router } from "express";

const router = Router();

router.get("/", getAllClasses);

export default router;
