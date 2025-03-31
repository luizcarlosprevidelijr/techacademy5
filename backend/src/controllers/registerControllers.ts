import { Request, Response } from "express";
import bcrypt from "bcrypt";
import UserModel from "../models/UserModel"; // Ajuste o caminho conforme necessário

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, cpf, password } = req.body;

    // Valida se todos os campos foram preenchidos
    if (!name || !email || !cpf || !password) {
      return res
        .status(400)
        .json({ message: "Todos os campos são obrigatórios." });
    }

    // Verifica se o usuário já existe pelo email ou CPF
    const existingUser = await UserModel.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email já cadastrado." });
    }

    const existingCpf = await UserModel.findOne({ where: { cpf } });
    if (existingCpf) {
      return res.status(400).json({ message: "CPF já cadastrado." });
    }

    // Hash da senha antes de salvar no banco
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar usuário no banco
    const newUser = await UserModel.create({
      name,
      email,
      cpf,
      password: hashedPassword,
    });

    return res
      .status(201)
      .json({ message: "Usuário cadastrado com sucesso!", user: newUser });
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};
