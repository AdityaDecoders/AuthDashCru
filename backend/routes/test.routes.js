import express from "express";
import authMiddleweres from "../middleweres/auth.middleweres.js";

const router = express.Router();

router.get("/protected", authMiddleweres, (req, res) =>{
    res
     .json({
        message: "Token is valid",
        userId: req.userId,

     });
});

export default router;