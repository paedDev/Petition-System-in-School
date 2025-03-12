import mongoose from "mongoose";

import bcrypt from "bcryptjs"

const UserSchema = new mongoose.Schema({
    username : {type: String, required:true},
    fullName : {type: String, required:true},
    email : {type: String, required:true, unique:true},
    password : {type: String, required:true},
    profileImageURl : {type: String, default:null},
    bookmarkedPolls: [{type: mongoose.Schema.Types.ObjectId, ref:"Poll"}],
},{timestamps:true})

//hash password before saving
UserSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10)
    next();
})

//compare passwords
UserSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword,this.password)
    
}
 export default mongoose.model("User",UserSchema)