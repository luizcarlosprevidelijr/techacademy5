import express from "express";
import {
  getAll,
  getSellerById,
  createSeller,
  deleteSellerById,
  updateSeller,
} from "../controllers/sellerControllers";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/sellers", getAll);
router.get("/sellers/:id", authMiddleware, getSellerById);
router.post("/sellers", authMiddleware, createSeller);
router.put("/sellers/:id", authMiddleware, updateSeller);
router.delete("/sellers/:id", authMiddleware, deleteSellerById);

export default router;
