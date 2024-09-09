import mongoose, { Schema } from 'mongoose';

const attendanceSchema = new Schema({
    employeesId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Employee',
    },
       status:{
        type:String,
        enum:['present', 'absent']
       },
       imageUrl:{
        type:String,
        required:true
       },
       location: {
        latitude: Number,
        longitude: Number,
      }, 
},
{timestamps:true}
)

export const Attendance = mongoose.model('Attendance',attendanceSchema)