import { Request, Response } from "express";
import ClientModel from "../models/ClientModel";

// 🔍 Listar todos os clientes com paginação
export const getAll = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;

    const { rows: clients, count } = await ClientModel.findAndCountAll({
      limit,
      offset,
    });

    res.json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      clients,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error });
  }
};

// 🔍 Buscar cliente por ID
export const getClientById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const client = await ClientModel.findByPk(req.params.id);
    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }
    return res.json(client);
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error });
  }
};

// ➕ Criar novo cliente
export const createClient = async (req: Request, res: Response) => {
  try {
    const { name, contact, cpf, sellerId } = req.body;

    if (!name) return res.status(400).json({ error: "Name is required" });
    if (!contact) return res.status(400).json({ error: "Contact is required" });
    if (!cpf) return res.status(400).json({ error: "CPF is required" });
    if (!sellerId)
      return res.status(400).json({ error: "sellerId is required" });

    // 🔍 Verifica se o CPF já está cadastrado
    const existingClient = await ClientModel.findOne({ where: { cpf } });
    if (existingClient) {
      return res.status(400).json({ error: "CPF already registered" });
    }

    const client = await ClientModel.create({ name, contact, cpf, sellerId });
    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error });
  }
};

// ✏️ Atualizar cliente
export const updateClient = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { name, contact, cpf, sellerId } = req.body;

    if (!name) return res.status(400).json({ error: "Name is required" });
    if (!contact) return res.status(400).json({ error: "Contact is required" });
    if (!cpf) return res.status(400).json({ error: "CPF is required" });
    if (!sellerId)
      return res.status(400).json({ error: "sellerId is required" });

    const client = await ClientModel.findByPk(req.params.id);
    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }

    // 🔍 Verifica se outro cliente já usa esse CPF
    const existingCpf = await ClientModel.findOne({
      where: { cpf, id: { ne: req.params.id } },
    });
    if (existingCpf) {
      return res
        .status(400)
        .json({ error: "CPF already in use by another client" });
    }

    client.name = name;
    client.contact = contact;
    client.cpf = cpf;
    client.sellerId = sellerId;

    await client.save();
    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error });
  }
};

// 🗑️ Deletar cliente
export const deleteClientById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const client = await ClientModel.findByPk(req.params.id);
    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }

    await client.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error });
  }
};
