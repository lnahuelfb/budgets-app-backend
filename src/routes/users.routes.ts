import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { getUsers, getUserById, createUser, editUser, deleteUser } from "../controllers/userController";
import BudgetRoutes from './budgets.routes'

const router = Router();

router.use('/budgets', BudgetRoutes)
router.get("/", asyncHandler(getUsers));
router.get("/:id", asyncHandler(getUserById));
router.post("/", asyncHandler(createUser));
router.put("/:id", asyncHandler(editUser));
router.delete("/:id", asyncHandler(deleteUser));

export default router;
