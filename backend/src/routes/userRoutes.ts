import express from "express";
import { createUser, deleteUserById, getAll, getUserById, updateUser } from "../controllers/userControllers";
<<<<<<< HEAD

const router = express.Router();

router.get('/users', getAll)
router.get('/users/:id', getUserById)
router.post('/users/', createUser)
router.put('/users/:id', updateUser)
router.delete('/users/:id', deleteUserById)
=======
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.get('/users', authMiddleware, getAll)
router.get('/users/:id', authMiddleware, getUserById)
router.post('/users/', authMiddleware, createUser)
router.put('/users/:id', authMiddleware, updateUser)
router.delete('/users/:id', authMiddleware, deleteUserById)
>>>>>>> a93c026 (Adiciona página de login e registro com validação de formulário)

export default router