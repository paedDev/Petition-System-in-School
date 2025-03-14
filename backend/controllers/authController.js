import User from "../models/User.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"


const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn:"1h"})
}

export const registerUser = async(req,res) =>{ 
    const {fullName,userID,email,password,profileImageUrl} = req.body;


    // validation check for missing fields
    if (!fullName || !userID || !email || !password) {
        return res.status(400).json({message: "All fields are required"})

        
    }
    // validation check userID format
    // Allows numbers charharcers and hyphens

    const userIDRegex = /^[a-zA-Z0-9-]+$/
    if (!userIDRegex.test(userID)){
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
        const existinguserID = await User.findOne({userID})
        if (existinguserID) {
            return res
            .status(400)
            .json({message: "ID not available. Use your school ID"})
        }
        
        const user = await User.create({
            fullName,
            userID,
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
export const loginUser = async(req,res) =>{
    const {email,password} = req.body;
     // validation check for missing fields
     if (!email || !password) {
        return res.status(400).json({message: "All fields are required"})
    }
    try {
        const user = await User.findOne({email})
        if (!user || !(await user.comparePassword(password))){
            return res.status(400).json({message: "Invalid credentials"})
        }
        res
        .status(200)
        .json({
            id:user._id,
            user:{
                ...user.toObject(),
                totalPollsCreated : 0,
                totalPollsVotes: 0,
                totalPollsBookMarked: 0,
            },
            token:generateToken(user._id),
        })
    } catch (error) {
        res
        .status(500)
        .json({message: "Error registering user", error: error.message})
    }
}
export const getUserInfo = async(req,res) =>{
    try {
        const user = await User.findById(req.user.id).select("-password")
        
        if(!user){
            return res.status(404).json({message: "User not found"})
        }
        // add the new att to the response
        const userInfo ={
            ...user.toObject(),
            totalPollsCreated:0,
            totalPollsVotes:0,
            totalPollsBookMarked:0,
        }
        res.status(200).json(userInfo)
    } catch (error) {
        res
        .status(500)
        .json({message: "Error registering user", error: error.message})
    }
}
  
