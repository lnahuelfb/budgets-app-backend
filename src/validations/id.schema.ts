import { z } from 'zod'

export const idSchema = z.object({
  id: z.string().uuid("El id no es válido")
})