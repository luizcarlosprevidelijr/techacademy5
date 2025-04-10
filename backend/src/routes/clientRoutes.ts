import express from "express";
import { getAll } from "../controllers/clientControllers";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/clients", authMiddleware, getAll);
router.get("/clients/:id", authMiddleware, getAll);
router.post("/clients", authMiddleware, getAll);
router.put("/clients/:id", authMiddleware, getAll);
router.delete("/clients/:id", authMiddleware, getAll);

export default router;
