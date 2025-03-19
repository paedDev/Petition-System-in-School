import User from "../models/User.js";
import Poll from "../models/Poll.js";


export const createPoll = async (req,res) => {
    const {question,type,option,creatorId} = req.body;

    if (!question || !type || !creatorId){
        return res
        .status(400)
        .json({message:"Question, type, and creatorId are required"})
    }

    try {
        let processedOption = [];
        switch(type){
            case "single-choice":
                if(!option || option.length < 2){
                    return res.status(400).json({
                        message: "Single-choice poll must have at least two options."
                    })
                }
                processedOption = option.map((opt) => ({optionText:opt}));
                break;
                
                case "rating":
                    processedOption =[1,2,3,4,5].map((value) => ({
                        optionText: value.toString(),
                    }));
                    break;

                case "yes/no":
                    processedOption = ["Yes","No"].map((option) => ({
                        optionText:option,
                    }))
                    break;

                case "image-based":
                    if(!option || option.length < 2) {
                        return res.status(400).json({
                            message : "Image-based poll must have at least two image URLs"
                        })
                    }
                    processedOption = option.map((url) => ({optionText:url}))
                    break;

                case "open-ended":
                processedOption = [];
                break;
                default:
                    return res.status(400).json({
                        message: "Invalid Poll Type"
                    })
        }

        const newPoll = await Poll.create({
            question,
            type,
            option: processedOption,
            creator: creatorId,
        });
        res.status(201).json({newPoll})
        
    } catch (error) {
        res
        .status(500)
        .json({message:"Error registering user",error:error.message})
    }
}