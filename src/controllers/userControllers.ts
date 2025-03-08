import { Request, Response } from "express"
import UserModel from "../models/UserModel"
import { error } from "console"

export const getAll = async (req: Request, res: Response) => {
    const users = await UserModel.findAll()
    res.send(users)
}

export const getUserById = async (
    req: Request<{ id: number}>,
    res: Response) => {
    const user = await UserModel.findByPk(req.params.id)

    return res.json(user);
}

export const createUser = async (req: Request, res: Response) => {

    try {
        const { name, email, password, cpf} = req.body

        if (!name || name === ''){
            return res.status(400).json({error: 'name is required'})
        }
        if (!email || email.trim() === "") {
            return res.status(400).json({ error: "Email is required" });
        }
        if (!password || password.trim() === "") {
            return res.status(400).json({ error: "Password is required" });
        }
        if (!cpf || cpf.trim() === "") {
            return res.status(400).json({ error: "CPF is required" });
        }

        const user = await UserModel.create({name, email, password, cpf})
        res.status(201).json(user)
    }catch (error) {
        res.status(201).json('Erro interno no servidor' + error)
    }

    }
   