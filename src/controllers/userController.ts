import { prisma } from "../config/db"
import { Request, Response } from "express";
import { ZodError } from "zod";
import { userSchema } from "../validations/user.schema";
import { idSchema } from "../validations/id.schema";

export const getUsers = async (_req: Request, res: Response) => {
  const users = await prisma.user.findMany()

  if (!users.length) {
    return res.status(404).json({
      message: "No se encontraron usuarios"
    });
  }

  return res.status(200).json({ users });
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const validatedId = idSchema.parse(req.params);

    const { id } = validatedId;

    const user = await prisma.user.findUnique({
      where: {
        id
      },
      include: {
        budgets: true
      }
    });

    if (!user) {
      return res.status(404).json({
        message: "Usuario no encontrado"
      });
    }

    return res.status(200).json({
      user
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: "Error de validación",
        errors: error.errors
      });
    }

    return res.status(500).json({
      message: "Error interno del servidor"
    });
  }
}

export const createUser = async (req: Request, res: Response) => {
  try {
    const validatedData = userSchema.parse(req.body);

    const { email, name, lastName, password } = validatedData;

    const user = await prisma.user.create({
      data: {
        name,
        lastName,
        email,
        password
      }
    });

    if (!user) {
      return res.status(500).json({
        message: "Error al crear el usuario"
      });
    }

    return res.status(201).json({ user });

  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: "Error de validación",
        errors: error.errors
      });
    }

    return res.status(500).json({
      message: "Error interno del servidor"
    });
  }
}

export const editUser = async (req: Request, res: Response) => {
  try {
    const validatedId = idSchema.parse(req.params);
    const validatedData = userSchema.parse(req.body);

    const { id } = validatedId;
    const { email, name, lastName, password } = validatedData;

    const user = await prisma.user.update({
      where: {
        id
      },
      data: {
        name,
        lastName,
        email,
        password
      }
    });

    if (!user) {
      return res.status(500).json({
        message: "Error al editar el usuario"
      });
    }

    return res.status(200).json({ user });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: "Error de validación",
        errors: error.errors
      });
    }

    return res.status(500).json({
      message: "Error interno del servidor"
    });
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const validatedId = idSchema.parse(req.params);
    const { id } = validatedId;

    const user = await prisma.user.delete({
      where: {
        id
      }
    });

    if (!user) {
      return res.status(500).json({
        message: "Error al eliminar el usuario"
      });
    }

    return res.status(200).json({ user });

  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: "Error de validación",
        errors: error.errors
      });
    }

    return res.status(500).json({
      message: "Error interno del servidor"
    });
  }
}