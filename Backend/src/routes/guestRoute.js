import express from 'express';
import { createFeedback } from '../controllers/hotelFeedbackController.js';
import { guest } from '../controllers/guestController.js';

const guestRoute = express.Router();


guestRoute.post("/hotel-feedback", createFeedback);
guestRoute.post("/create-guest", guest);




export default guestRoute

