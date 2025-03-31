import express from "express";
import {
  getAll,
  getsSellerById,
  createSeller,
  deleteSellerById,
  updateSeller,
} from "../controllers/sellerControllers";

const router = express.Router();

router.get("/sellers", getAll);
router.get("/sellers/:id", getsSellerById);
router.post("/sellers/", createSeller);
router.put("/sellers/:id", updateSeller);
router.delete("/sellers/:id", deleteSellerById);

export default router;
