import { z } from 'zod'

export const userSchema = z.object({
  email: z.string().email("El email no es válido"),
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  lastName: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres")
})