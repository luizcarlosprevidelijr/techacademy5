import { Request, Response } from "express"
import SellerModel from "../models/SellerModel"

export const getAll = async (req: Request, res: Response) => {
    const users = await SellerModel.findAll()
    res.send(users)
}