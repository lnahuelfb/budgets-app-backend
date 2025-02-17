import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { createBudget, deleteBudget, editBudget, getBudgetById, getBudgets, } from "../controllers/budgetController";

const router = Router()

router.get("/", asyncHandler(getBudgets));
router.get("/:id", asyncHandler(getBudgetById));
router.post("/", asyncHandler(createBudget));
router.put("/:id", asyncHandler(editBudget));
router.delete("/:id", asyncHandler(deleteBudget));

export default router;