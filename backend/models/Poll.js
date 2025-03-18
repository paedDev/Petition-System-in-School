
import mongoose from "mongoose";

const PollSchema = new mongoose.Schema({
    question : {type: String, required:true},
    type: {type:String,required :true},
    option: [
        {
            optionText:{type:String,required:true},
            votes:{type:Number, default:0}, 
            //for vote tracking
        },
    ],
    responses: [
        {
            voterId : { type:mongoose.Schema.Types.ObjectId, ref: "User"}, //for open ended poll
            responseText : {type:String},
            createdAt: { type:Date, default:Date.now},
        },
    ],

    creator: {type:mongoose.Schema.Types.ObjectId, ref: "User", required:true},
    voters: [{ type:mongoose.Schema.Types.ObjectId,ref:"User"}], // to prevent multiple votes
    createdAt : {type:Date,default:Date.now},
    closed:{type:Boolean, default:false},
});

export default mongoose.model("Poll",PollSchema)