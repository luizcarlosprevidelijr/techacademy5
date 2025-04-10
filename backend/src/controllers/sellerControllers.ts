import { Request, Response } from "express";
import SellerModel from "../models/SellerModel";

// 🔍 Listar todos os vendedores com paginação
export const getAll = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;

    const { rows: sellers, count } = await SellerModel.findAndCountAll({
      limit,
      offset,
    });

    res.json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      sellers,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error });
  }
};

// 🔍 Buscar vendedor por ID
export const getSellerById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const seller = await SellerModel.findByPk(req.params.id);
    if (!seller) {
      return res.status(404).json({ error: "Seller not found" });
    }
    return res.json(seller);
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error });
  }
};

// ➕ Criar novo vendedor
interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const createSeller = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { name, cpf, position, salary } = req.body;
    const userId = req.userId; // 🔥 Agora vem do token

    if (!name?.trim())
      return res.status(400).json({ error: "Name is required" });
    if (!cpf?.trim()) return res.status(400).json({ error: "CPF is required" });
    if (!position?.trim())
      return res.status(400).json({ error: "Position is required" });

    const parsedSalary = parseFloat(salary);
    if (isNaN(parsedSalary) || parsedSalary < 0) {
      return res
        .status(400)
        .json({ error: "Salary must be a valid positive number" });
    }

    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const seller = await SellerModel.create({
      name: name.trim(),
      cpf: cpf.trim(),
      position: position.trim(),
      salary: parsedSalary,
      userId,
    });

    return res.status(201).json(seller);
  } catch (error) {
    console.error("Erro ao criar vendedor:", error);
    return res.status(500).json({
      error: "Internal server error",
      details: error instanceof Error ? error.message : error,
    });
  }
};
// ✏️ Atualizar vendedor
export const updateSeller = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { name, cpf, position, salary, userId } = req.body;

    if (!name) return res.status(400).json({ error: "Name is required" });
    if (!cpf) return res.status(400).json({ error: "CPF is required" });
    if (!position)
      return res.status(400).json({ error: "Position is required" });
    if (salary == null || salary === "" || salary < 0) {
      return res.status(400).json({ error: "Salary must be a valid number" });
    }
    if (!userId) return res.status(400).json({ error: "UserId is required" });

    const seller = await SellerModel.findByPk(req.params.id);
    if (!seller) {
      return res.status(404).json({ error: "Seller not found" });
    }

    seller.name = name;
    seller.cpf = cpf;
    seller.position = position;
    seller.salary = salary;
    seller.userId = userId;

    await seller.save();
    res.status(200).json(seller);
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error });
  }
};

// 🗑️ Deletar vendedor
export const deleteSellerById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const seller = await SellerModel.findByPk(req.params.id);
    if (!seller) {
      return res.status(404).json({ error: "Seller not found" });
    }

    await seller.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error });
  }
};
