import express from "express";
import authMiddleweres from "../middleweres/auth.middleweres.js";


const router = express.Router();

router.get("/dashboard", authMiddleweres, (req, res) =>{
    res
     .json({
        message: "Welcome to dashboard",
        userId: req.userId
     });
});

export default router;