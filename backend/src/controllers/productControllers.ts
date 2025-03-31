import { Request, Response } from "express";
import ProductModel from "../models/ProductModel";

export const getAll = async (req: Request, res: Response) => {
  const product = await ProductModel.findAll();
  res.send(product);
};

export const getProductById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const product = await ProductModel.findByPk(req.params.id);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  return res.json(product);
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, userId } = req.body;

    if (!name || name === "") {
      return res.status(400).json({ error: "name is required" });
    }
    if (!description || description === "") {
      return res.status(400).json({ error: "Description is required" });
    }
    if (!price || price === "") {
      return res.status(400).json({ error: "Price is required" });
    }
    if (!userId || userId === "") {
      return res.status(400).json({ error: "UserId is required" });
    }

    const product = await ProductModel.create({
      name,
      description,
      price,
      userId,
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json("Erro interno no servidor" + error);
  }
};

export const updateProdutc = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { name, description, price, userId } = req.body;

    if (!name || name === "") {
      return res.status(400).json({ error: "name is required" });
    }
    if (!description || description === "") {
      return res.status(400).json({ error: "Description is required" });
    }
    if (!price || price === "") {
      return res.status(400).json({ error: "Price is required" });
    }
    if (!userId || userId === "") {
      return res.status(400).json({ error: "UserId is required" });
    }

    const product = await ProductModel.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    product.name = name;
    product.description = description;
    product.price = price;
    product.userId = userId;

    await product.save();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json("Erro interno no servidor" + error);
  }
};

export const deleteProductById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const product = await ProductModel.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    await product.destroy();

    res.status(204).send();
  } catch (error) {
    res.status(500).json("erro interno no servidor" + error);
  }
};
