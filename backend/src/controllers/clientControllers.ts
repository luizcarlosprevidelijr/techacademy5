import { Request, Response } from "express";
import ClientModel from "../models/ClientModel";

export const getAll = async (req: Request, res: Response) => {
  const Client = await ClientModel.findAll();
  res.send(Client);
};

export const getClientById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const client = await ClientModel.findByPk(req.params.id);
  if (!client) {
    return res.status(404).json({ error: "Client not found" });
  }
  return res.json(ClientModel);
};

export const createClient = async (req: Request, res: Response) => {
  try {
    const { name, contact, cpf, sellerId } = req.body;

    if (!name || name === "") {
      return res.status(400).json({ error: "name is required" });
    }
    if (!contact || contact === "") {
      return res.status(400).json({ error: "Contact is required" });
    }
    if (!cpf || cpf === "") {
      return res.status(400).json({ error: "CPF is required" });
    }
    if (!sellerId || sellerId === "") {
      return res.status(400).json({ error: "sellerId is required" });
    }

    const client = await ClientModel.create({ name, contact, cpf, sellerId });
    res.status(201).json(client);
  } catch (error) {
    res.status(500).json("Erro interno no servidor" + error);
  }
};

export const updateClient = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { name, contact, cpf, sellerId } = req.body;

    if (!name || name === "") {
      return res.status(400).json({ error: "name is required" });
    }
    if (!contact || contact === "") {
      return res.status(400).json({ error: "Contact is required" });
    }
    if (!cpf || cpf === "") {
      return res.status(400).json({ error: "CPF is required" });
    }
    if (!sellerId || sellerId === "") {
      return res.status(400).json({ error: "sellerId is required" });
    }

    const client = await ClientModel.findByPk(req.params.id);
    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }

    client.name = name;
    client.contact = contact;
    client.cpf = cpf;
    client.sellerId = sellerId;

    await client.save();
    res.status(200).json(client);
  } catch (error) {
    res.status(500).json("Erro interno no servidor" + error);
  }
};

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
    res.status(500).json("erro interno no servidor" + error);
  }
};
