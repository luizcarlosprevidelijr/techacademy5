import { Request, Response } from "express";
import ProductModel from "../models/ProductModel";

// 🔍 Listar todos os produtos com paginação
export const getAll = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;

    const { rows: products, count } = await ProductModel.findAndCountAll({
      limit,
      offset,
    });

    res.json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      products,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error });
  }
};

// 🔍 Buscar produto por ID
export const getProductById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const product = await ProductModel.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    return res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error });
  }
};

// ➕ Criar novo produto
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, userId } = req.body;

    if (!name) return res.status(400).json({ error: "Name is required" });
    if (!description)
      return res.status(400).json({ error: "Description is required" });
    if (price == null || price === "" || price < 0) {
      return res.status(400).json({ error: "Price must be a valid number" });
    }
    if (!userId) return res.status(400).json({ error: "UserId is required" });

    const product = await ProductModel.create({
      name,
      description,
      price,
      userId,
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error });
  }
};

// ✏️ Atualizar produto
export const updateProduct = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { name, description, price, userId } = req.body;

    if (!name) return res.status(400).json({ error: "Name is required" });
    if (!description)
      return res.status(400).json({ error: "Description is required" });
    if (price == null || price === "" || price < 0) {
      return res.status(400).json({ error: "Price must be a valid number" });
    }
    if (!userId) return res.status(400).json({ error: "UserId is required" });

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
    res.status(500).json({ error: "Internal server error", details: error });
  }
};

// 🗑️ Deletar produto
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
    res.status(500).json({ error: "Internal server error", details: error });
  }
};
