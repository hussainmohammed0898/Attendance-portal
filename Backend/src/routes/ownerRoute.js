import express from 'express';
import { logout, signIn, signUp } from '../controllers/ownerController.js';
import { deleteAttendance } from '../controllers/attendanceController.js';
import { getAllFeedback } from '../controllers/hotelFeedbackController.js';

const router = express.Router();


router.post("/register", signUp);
router.get("/login", signIn);
router.get("/logout", logout);
router.delete("/delete-attendance/:id", deleteAttendance)
router.get("/get-all-feedback", getAllFeedback)
export default router
