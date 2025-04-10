import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import { validatePassword } from "../utils/passwordValidator";
import { validateCPF } from "../utils/cpfValidator";
import { validateEmail } from "../utils/emailValidator";

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

    if (!name) return res.status(400).json({ error: "Name is required" });
    if (!email) return res.status(400).json({ error: "Email is required" });
    if (!password)
      return res.status(400).json({ error: "Password is required" });
    if (!cpf) return res.status(400).json({ error: "CPF is required" });

    // Validação de e-mail
    if (!validateEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Validação de CPF
    if (!validateCPF(cpf)) {
      return res.status(400).json({ error: "Invalid CPF" });
    }

    // Validação da senha
    if (!validatePassword(password)) {
      return res.status(400).json({
        error:
          "Password must have at least 8 characters, one uppercase letter, one number, and one special character",
      });
    }

    // Verifica se e-mail ou CPF já estão cadastrados (única consulta)
    const existingUser = await UserModel.findOne({ where: { email, cpf } });

    if (existingUser) {
      return res.status(400).json({ error: "Email or CPF already in use" });
    }

    // Criando usuário (a senha já será criptografada no UserModel)
    const user = await UserModel.create({ name, email, password, cpf });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const updateUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name, password, cpf } = req.body;

    if (!name) return res.status(400).json({ error: "Name is required" });
    if (!password)
      return res.status(400).json({ error: "Password is required" });
    if (!cpf) return res.status(400).json({ error: "CPF is required" });

    if (!validateCPF(cpf)) {
      return res.status(400).json({ error: "Invalid CPF" });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({
        error:
          "Password must have at least 8 characters, one uppercase letter, one number, and one special character",
      });
    }

    const user = await UserModel.findByPk(req.userId); // só edita o próprio usuário
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Impede alteração do e-mail
    if (req.body.email && req.body.email !== user.email) {
      return res.status(400).json({ error: "Email cannot be changed" });
    }

    user.name = name;
    user.password = password;
    user.cpf = cpf;

    await user.save();

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error });
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
