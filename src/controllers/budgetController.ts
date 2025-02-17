import { prisma } from "../config/db"
import { Request, Response } from "express";
import { ZodError } from "zod";
import { budgetSchema } from "../validations/budget.schema";
import { idSchema } from "../validations/id.schema";

export const getBudgets = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const budgets = await prisma.budget.findMany({include: {items: true}});
    return res.json(budgets);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener los presupuestos" });
  }
}

export const getBudgetById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = idSchema.parse(req.params);
    const budget = await prisma.budget.findUnique({ where: { id }, include: {items: true} });

    if (!budget) {
      return res.status(404).json({ message: "Presupuesto no encontrado" });
    }

    return res.json(budget);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: error.errors });
    }

    return res.status(500).json({ message: "Error al obtener el presupuesto" });
  }
}

export const createBudget = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { title, userId, items } = budgetSchema.parse(req.body);

    const data: { title: string; userId: string; items?: { create: typeof items } } = {
      title,
      userId,
    }

    if (items?.length) {
      data.items = {
        create: items
      }
    }

    const budget = await prisma.budget.create({ data });

    return res.status(201).json(budget);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: error.errors });
    }

    return res.status(500).json({ message: "Error al crear el presupuesto" });
  }
}

export const editBudget = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = idSchema.parse(req.params);
    const { title, items } = budgetSchema.parse(req.body);

    const data: { title: string; items?: { create: typeof items } } = {
      title,
    }

    if (items?.length) {
      data.items = {
        create: items
      }
    }

    const budget = await prisma.budget.update({ where: { id }, data });

    return res.json(budget);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: error.errors });
    }

    return res.status(500).json({ message: "Error al editar el presupuesto" });
  }
}

export const deleteBudget = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = idSchema.parse(req.params);
    await prisma.budget.delete({ where: { id } });

    return res.json({ message: "Presupuesto eliminado" });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: error.errors });
    }

    return res.status(500).json({ message: "Error al eliminar el presupuesto" });
  }
}