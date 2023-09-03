import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface UserData {
  id: string;
  name: string;
  address: string;
}

interface ValidationRequest extends Request {
  userData: UserData;
}

// Implemente suas funções de registro e login aqui

const register = async (req: Request, res: Response) => {
  const { name, email, password, address } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await prisma.users.create({
    data: {
      name,
      email,
      password: hashedPassword,
      address,
    },
  });

  res.json({
    message: "user created",
  });
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.users.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  if (!user.password) {
    return res.status(404).json({
      message: "Password not set",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (isPasswordValid) {
    const payload = {
      id: user.id,
      name: user.name,
      address: user.address,
    };

    const secret = process.env.JWT_SECRET!;

    const expiresIn = 60 * 60 * 1;

    const token = jwt.sign(payload, secret, { expiresIn: expiresIn });

    return res.json({
      data: {
        id: user.id,
        name: user.name,
        address: user.address,
      },
      token: token,
    });
  } else {
    return res.status(403).json({
      message: "Wrong password",
    });
  }
};

const logout = async (req: Request, res: Response) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({
            message: 'Token diperlukan'
        });
    }

    const token = authorization.split(' ')[1];

    try {
        // Use Prisma para criar uma entrada na tabela RevokedToken com o token revogado
        await prisma.revokedToken.create({
            data: {
                token: token
            }
        });

        res.json({
            message: 'Logout successful'
        });
    } catch (error) {
        console.error('Erro ao revogar o token:', error);
        res.status(500).json({
            message: 'Erro ao revogar o token'
        });
    }
};


export { ValidationRequest, UserData, register, login,logout };
