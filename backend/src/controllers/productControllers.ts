import { Request, Response } from "express"
import ProductModel from "../models/ProductModel"

export const getAll = async (req: Request, res: Response) => {
    const users = await ProductModel.findAll()
    res.send(users)
}