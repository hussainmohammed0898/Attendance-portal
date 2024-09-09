import mongoose, { Schema } from 'mongoose';

const guestSchema = new Schema({
    name:{
        type:String,
        required:true
    }
})

export const Guest = mongoose.model('Guest', guestSchema);