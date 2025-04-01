import express from "express";
import {
  createUser,
  deleteUserById,
  getAll,
  getUserById,
  updateUser,
} from "../controllers/userControllers";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/users", authMiddleware, getAll);
router.get("/users/:id", authMiddleware, getUserById);
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", authMiddleware, deleteUserById);

export default router;
