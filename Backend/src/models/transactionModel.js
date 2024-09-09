import mongoose, { Schema } from 'mongoose';



const staffTipTransactionSchema = new mongoose.Schema({
  guestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Guest', 
    required: true,
  },
  staffId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employees', 
    required: true,
  },
  tipAmount: {
    type: Number,
    required: true,
    min: 0, 
  },
  
  transactionDate: {
    type: Date,
    default: Date.now,
  },
  transactionStatus: {
    type: String,
    enum: ['Pending', 'Completed', 'Failed'],
    default: 'Pending',
  },
  notes: {
    type: String,
    maxlength: 500, 
  },
});

export const StaffTipTransaction = mongoose.model('StaffTipTransaction', staffTipTransactionSchema);

