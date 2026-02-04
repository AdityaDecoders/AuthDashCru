import express from "express";
import { createdTask, getTasks, updateTask, deleteTask } from "../controllers/task.controllers.js";
import authMiddleweres from "../middleweres/auth.middleweres.js";

const router = express.Router();

router.use(authMiddleweres);

router.post("/", createdTask);
router.get("/", getTasks);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;