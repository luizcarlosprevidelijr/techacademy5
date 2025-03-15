import express from "express";
import { getAll } from "../controllers/clientControllers";

const router = express.Router();

router.get('/clients', getAll)

export default router