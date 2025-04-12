import { getAllClasses } from "../controllers/classes";
import { Router } from "express";

const router = Router();

router.get("/", getAllClasses);

export default router;
