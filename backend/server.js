import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import protectedRoutes from "./routes/protected.routes.js";
import testRoutes from "./routes/test.routes.js";
import userRoutes from "./routes/user.routes.js";
import taskRoutes from"./routes/task.routes.js";


dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/auth", authRoutes);
app.use("/api", protectedRoutes);
app.use("/api/test", testRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1/tasks", taskRoutes);

app.get("/",(req,res) =>{
    res.send("Api running");
});

app.listen(5000,() => {
    console.log("Server running on port 5000")
});