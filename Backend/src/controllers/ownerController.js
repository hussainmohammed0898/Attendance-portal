import { Owner } from "../models/ownerModel.js";
import bcrypt from 'bcrypt';
import { ownerToken } from "../utilities/generalToken.js";

export const signUp = async(req, res)=>{
    console.log("hitting");
    
    const {email, name, password} =req.body;

  try {
    const ownerExist = await Owner.findOne({email});

    if(ownerExist){
       return res.status(400).json({message:'owner already exist'})
    }

    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(password, saltRound);

    const newOwner = new Owner({
        name,
        email,
        password:hashedPassword,
        role:'owner'
    })

    await newOwner.save();

    return res.status(201).json({message:"Signup successfully"})
  } catch (error){
    console.log("Show Error", error);
    res.status(500).json({message:"Something went wrong"}) 
  }

}

  export const signIn = async(req, res)=>{
    const {email, password}=req.body

    try {

        const owner = await Owner.findOne({email});

        if(!owner){
            return res.status(404).json({message:"owner not found"});
        }
        const comparePassword = bcrypt.compare(password, owner.password);
        if(!comparePassword){
            return res.status(401).json({message:"Password doesn't match"});
        }

        const token = ownerToken(owner);
        res.cookie('token', token,{httpOnly:true});
        res.status(201).json({message:"login successfully completed",token});
    } catch (error) {
        console.log("show error", error);
        res.status(500).json({message:"Something went wrong"}); 
    }

  }

  export const logout = (req, res)=>{
    console.log("hitting");
    
    try {
        const token = req.cookies.token;
        console.log("token:", token);
        res.clearCookie('token', token,{ httpOnly: true});
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.log("show error:", error);
        res.status(500).json({message:"something went wrong"})   
    }
  }

    
    







