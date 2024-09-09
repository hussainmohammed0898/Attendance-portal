import { HotelFeedback } from "../models/hotelFeedback.js";


export const createFeedback = async (req, res) => {
    try {
      const { ownerId,  rating, comments } = req.body;
  
      
      const newFeedback = new HotelFeedback({
        ownerId,
        rating,
        comments,
      });
  
   
      await newFeedback.save();
  
      res.status(201).json({
        success: true,
        message: 'Feedback submitted successfully',
        data: newFeedback,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to submit feedback',
        error: error.message,
      });
    }
  };

  export const getAllFeedback = async (req, res) => {
    try {
      const feedbacks = await HotelFeedback.find({ hotelId: req.params.hotelId })
      res.status(200).json({
        success: true,
        data: feedbacks,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch feedback',
        error: error.message,
      });
    }
  };