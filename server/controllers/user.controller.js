import { User } from "../modles/user.modle.js";

export const fetchUserById = async (req, res)=>{
    const userid = req.user;
    
    try {
        const user = await User.findById(userid.id);
        res.status(201).json({id:user._id, name:user.name, email:user.email, address:user.address});
    } catch (error) {
        res.status(400).json(error);
    } 
}

export const getAllUsers = async (req, res)=>{
    try {
        const users = await User.find();
        if (!users) {
            res.status(400).json({ success: true, message:"Users not found"});
        }
        res.status(201).json({ success: true, users});
    } catch (error) {
        res.status(400).json(error);
    } 
}

export const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.user.id,  {$set: req.body}, {new:true});
        if (!updatedUser) {
            res.status(400).json({ success: false, message:"User not found"});
        }
        res.status(200).json({ success: true, updatedUser, message:"Address add successfuly"});
    } catch (error) {
    res.status(500).json({ message: error.message });
    }
}

export const updateAdminUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.userId,  {$set: req.body}, {new:true});
        if (!updatedUser) {
            res.status(400).json({ success: false, message:"User not found"});
        }
        res.status(200).json({ success: true, updatedUser, message:"User update successfuly"});
    } catch (error) {
    res.status(500).json({ message: error.message });
    }
}

