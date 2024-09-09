import mongoose, { Schema } from 'mongoose';

const owner = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['owner', 'admin'],
        required:true
    }
},
{timestamps:true}
)

export const Owner = mongoose.model('Owner', owner )