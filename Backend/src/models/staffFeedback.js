import mongoose, { Schema } from 'mongoose';

const staffFeedbackSchema = new mongoose.Schema({
    staffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employees', 
      required: true,
    },
    guestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Guest', 
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    comments: {
      type: String,
      maxlength: 500,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  export const StaffFeedback = mongoose.model('StaffFeedback', staffFeedbackSchema);
  
 
  