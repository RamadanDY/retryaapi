import { Router } from "express";
import {
  createBlock,
  getAllBlocks,
  getAllClasses,
} from "../controllers/blocks.js";
// import createBlock from "../controllers/blocks.js";
// Router() is like a mini version of app — you use it to group related routes (in this case, block-related ones).
// Initializes a new router instance so you can define routes on it.

const router = Router();

router.post("/", createBlock);
router.get("/", getAllBlocks);
router.get("/:id/classes", getAllClasses);
// Export the router so it can be used in the main server file
export default router;
