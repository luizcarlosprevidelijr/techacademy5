import { Request, Response } from "express"
import ClientModel from "../models/ClientModel"

export const getAll = async (req: Request, res: Response) => {
    const users = await ClientModel.findAll()
    res.send(users)
}