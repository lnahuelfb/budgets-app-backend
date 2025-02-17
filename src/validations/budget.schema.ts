import { z } from 'zod';

export const budgetSchema = z.object({
  title: z.string().min(1, "El título es requerido"),
  userId: z.string().uuid("ID de usuario inválido"),
  items: z.array(
    z.object({
      name: z.string().min(1, "El nombre es requerido"),
      quantity: z.number().int().positive("La cantidad debe ser mayor a 0"),
      unitPrice: z.number().positive("El precio debe ser mayor a 0"),
    })
  ).optional(),
});
