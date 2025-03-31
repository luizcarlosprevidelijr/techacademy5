import { Request, Response } from "express";
import SellerModel from "../models/SellerModel";

export const getAll = async (req: Request, res: Response) => {
  const sellers = await SellerModel.findAll();
  res.send(sellers);
};

export const getsSellerById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const seller = await SellerModel.findByPk(req.params.id);
  if (!seller) {
    return res.status(404).json({ error: "Seller not found" });
  }
  return res.json(seller);
};

export const createSeller = async (req: Request, res: Response) => {
  try {
    const { name, cpf, position, salary, userId } = req.body;

    if (!name || name === "") {
      return res.status(400).json({ error: "name is required" });
    }
    if (!cpf || cpf === "") {
      return res.status(400).json({ error: "CPF is required" });
    }
    if (!position || position === "") {
      return res.status(400).json({ error: "Position is required" });
    }
    if (!salary || salary === "") {
      return res.status(400).json({ error: "Salary is required" });
    }
    if (!userId || userId === "") {
      return res.status(400).json({ error: "UserId is required" });
    }

    const Seller = await SellerModel.create({
      name,
      position,
      salary,
      userId,
    });
    res.status(201).json(Seller);
  } catch (error) {
    res.status(500).json("Erro interno no servidor" + error);
  }
};

export const updateSeller = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { name, cpf, position, salary, userId } = req.body;

    if (!name || name === "") {
      return res.status(400).json({ error: "name is required" });
    }
    if (!cpf || cpf === "") {
      return res.status(400).json({ error: "CPF is required" });
    }
    if (!position || position === "") {
      return res.status(400).json({ error: "Position is required" });
    }
    if (!salary || salary === "") {
      return res.status(400).json({ error: "Salary is required" });
    }
    if (!userId || userId === "") {
      return res.status(400).json({ error: "UserId is required" });
    }

    const Seller = await SellerModel.findByPk(req.params.id);
    if (!Seller) {
      return res.status(404).json({ error: "Seller not found" });
    }

    Seller.name = name;
    Seller.position = position;
    Seller.salary = salary;
    Seller.userId = userId;

    await Seller.save();
    res.status(200).json(Seller);
  } catch (error) {
    res.status(500).json("Erro interno no servidor" + error);
  }
};

export const deleteSellerById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const Seller = await SellerModel.findByPk(req.params.id);
    if (!Seller) {
      return res.status(404).json({ error: "Seller not found" });
    }

    await Seller.destroy();

    res.status(204).send();
  } catch (error) {
    res.status(500).json("erro interno no servidor" + error);
  }
};
