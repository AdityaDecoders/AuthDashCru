import express from "express";
import { getMe, updateMe} from "../controllers/user.controllers.js";
import authMiddleweres from "../middleweres/auth.middleweres.js";

const router = express.Router();

router.get("/me", authMiddleweres, getMe);

router.put("/me", authMiddleweres, updateMe);

export default router;