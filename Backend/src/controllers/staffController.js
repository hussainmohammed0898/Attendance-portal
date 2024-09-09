import { Employees } from "../models/employeesModel.js";
import bcrypt from 'bcrypt';
import { EmployeesToken } from "../utilities/generalToken.js";


export const staffRegister = async(req, res)=>{
    console.log("hitting");
    
    const {email, name, password, role} =req.body;

  try {
    const staffExist = await Employees.findOne({email});

    if(staffExist){
       return res.status(400).json({message:'Employee already exist'})
    }

    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(password, saltRound);

    const newEmployee = new Employees({
        name,
        email,
        password:hashedPassword,
        role
    })

    await newEmployee.save();

    return res.status(201).json({message:"Signup successfully"})
  } catch (error){
    console.log("Show Error", error);
    res.status(500).json({message:"Something went wrong"}) 
  }

}

  export const staffLogin = async(req, res)=>{
    const {email, password}=req.body

    try {

        const employee = await Employees.findOne({email});

        if(!employee){
            return res.status(404).json({message:"employee not found"});
        }
        const comparePassword = bcrypt.compare(password, employee.password);
        if(!comparePassword){
            return res.status(401).json({message:"Password doesn't match"});
        }

        const token = EmployeesToken(employee);
        res.cookie('token', token,{httpOnly:true});
        res.status(201).json({message:"login successfully completed",token});
    } catch (error) {
        console.log("show error", error);
        res.status(500).json({message:"Something went wrong"}); 
    }

  }

  export const staffLogout = (req, res)=>{
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

    