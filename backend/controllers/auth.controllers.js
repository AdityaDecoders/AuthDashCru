import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const signup = async(req, res) =>{
    try{
        const {name, email, password } = req.body;

        if(!name || !email || !password){
            return res
            .status(400)
            .json({
                message: "All fields are required"
            });
        }

        const existingUser = await User.findOne({ email});

        if(existingUser){
            return res
            .status(404)
            .json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res
        .status(201)
        .json({
            message: "Signup successful"
        });
    } catch(error){
        console.error("Signup error:", error);
        res
        .status(500)
        .json({
            message: "Signup failed"
        });
    }
};

export const loginUser = async(req, res) =>{
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if(!user){
            return res
             .status(400)
             .json({
                message: "User not found"
             });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            return res
            .status(400)
            .json({
                message: "Invalid password"
            });
        }

        const token = jwt.sign(
            {userId: user._id},
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
        );

        res.json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                email: user.email
            }
        });
    } catch(error){
        res
         .status(500)
         .json({
            message: "Login unsuccessful", error
         });
    }
};