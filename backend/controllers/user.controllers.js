import User from "../models/User.js";

export const getMe = async (req, res) =>{
    try {
        const user = await User.findById(req.userId).select("-password");

        if(!user){
            return res 
              .status(404)
              .json({
                message: "User not found"
              });
        }
        res
         .json(user)
    } catch (error) {
        res
         .status(500)
         .json({
            message: "Server error"
         });
        
    }
};

export const updateMe = async (req, res) =>{
    try {
        const user = await User.findByIdAndUpdate(
            req.userId,
            {name: req.body.name},
            {new: true}
        ).select("-password");

        res.json(user);
    } catch (error) {
        res
         .status(500)
         .json({
            message: "Update failed"
         });
    }
};
