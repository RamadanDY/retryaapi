import { Router } from "express";
// Router() is like a mini version of app — you use it to group related routes (in this case, block-related ones).
// Initializes a new router instance so you can define routes on it.

const router = Router();

router.get("", createBlocks);
