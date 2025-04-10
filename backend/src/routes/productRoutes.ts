import express from "express";
import { getAll } from "../controllers/productControllers";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/products", authMiddleware, getAll);
router.get("/products/:id", authMiddleware, getAll);
router.post("/products", authMiddleware, getAll);
router.put("/products/:id", authMiddleware, getAll);
router.delete("/products/:id", authMiddleware, getAll);

export default router;
