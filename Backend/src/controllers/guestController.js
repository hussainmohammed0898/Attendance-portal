import { Guest } from "../models/guestModel.js";


export const guest = async (req, res)=>{

    const {name}= req.body;

    try {
        const newUser = new Guest({
            name
        })

       await newUser.save();
       res.status(200).json({message:"ok"})
        
    } catch (error) {
        console.log("show error", error);
        res.status(500).json({message:"something went wrong"}) 
    }
}