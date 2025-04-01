import { Request, Response } from "express";
import UserModel from "../models/UserModel";

export const getAll = async (req: Request, res: Response) => {
  const users = await UserModel.findAll();
  res.send(users);
};

export const getUserById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const user = await UserModel.findByPk(req.params.id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  return res.json(user);
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, cpf } = req.body;

    if (!name || name === "") {
      return res.status(400).json({ error: "name is required" });
    }
    if (!email || email === "") {
      return res.status(400).json({ error: "Email is required" });
    }
    if (!password || password === "") {
      return res.status(400).json({ error: "Password is required" });
    }
    if (!cpf || cpf === "") {
      return res.status(400).json({ error: "CPF is required" });
    }

    const user = await UserModel.create({ name, email, password, cpf });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json("Erro interno no servidor" + error);
  }
};

export const updateUser = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { name, email, password, cpf } = req.body;

    if (!name || name === "") {
      return res.status(400).json({ error: "name is required" });
    }
    if (!email || email === "") {
      return res.status(400).json({ error: "Email is required" });
    }
    if (!password || password === "") {
      return res.status(400).json({ error: "Password is required" });
    }
    if (!cpf || cpf === "") {
      return res.status(400).json({ error: "CPF is required" });
    }

    const user = await UserModel.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.name = name;
    user.email = email;
    user.password = password;
    user.cpf = cpf;

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json("Erro interno no servidor" + error);
  }
};

export const deleteUserById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const user = await UserModel.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.destroy();

    res.status(204).send();
  } catch (error) {
    res.status(500).json("erro interno no servidor" + error);
  }
};
