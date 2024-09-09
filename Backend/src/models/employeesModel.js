import mongoose, { Schema } from 'mongoose';

const employeesSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['waiter', 'security', 'chef', 'accountant'],
        required:true
    },
    wallet:{
        type:Number,
    },
    
},
{timestamps:true}
)

export const Employees = mongoose.model('Employees', employeesSchema)
    