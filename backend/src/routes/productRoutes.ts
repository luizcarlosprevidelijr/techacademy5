import express from "express";
import { getAll } from "../controllers/productControllers";

const router = express.Router();

router.get('/products', getAll)

export default router