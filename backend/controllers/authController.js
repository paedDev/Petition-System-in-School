import User from "../models/User.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"


const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn:"1h"})
}

const registerUser = async(req,res) =>{ 
    const {fullName,username,email,password,profileImageUrl} = req.body;


    // validation check for missing fields
    if (!fullName || !username || !email || !password) {
        return res.status(400).json({message: "All fields are required"})

        
    }
    // validation check username format
    // Allows numbers charharcers and hyphens

    const usernameRegex = /^[a-zA-Z0-9-]+$/
    if (!usernameRegex.test(username)){
        return res.status(400).json({
            message: 
            "Invalid ID. Only alphanumeric characters and hyphens are allowed. No spaces are permitted. "
        })
    }
    try {
        //check if email already exist

        const existingUser = await User.findOne({email})
        if(existingUser) {
            return res.status(400).json({message: "Email already in use"})
        }
        const existingUsername = await User.findOne({username})
        if (existingUsername) {
            return res
            .status(400)
            .json({message: "ID not available. Use your school ID"})
        }
        
        const user = await User.create({
            fullName,
            username,
            email,
            password,
            profileImageUrl,

        })
        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id),

        })
    } catch (error) {
        res
        .status(500)
        .json({message: "Error registering user", error: error.message})
    }
}

export default registerUser;