import express from "express";
import { getAll } from "../controllers/sellerControllers";

const router = express.Router();

router.get('/sellers', getAll)

export default router