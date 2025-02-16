import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { getUsers, getUserById, createUser, editUser } from "../controllers/userController";

const router = Router();

router.get("/", asyncHandler(getUsers));
router.post("/", asyncHandler(createUser));
router.get("/:id", asyncHandler(getUserById));
router.put("/:id", asyncHandler(editUser));

export default router;
