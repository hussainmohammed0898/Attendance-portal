import express from'express';
import { staffLogin, staffLogout, staffRegister } from '../controllers/staffController.js';
import { createAttendance } from '../controllers/attendanceController.js';
import upload from '../middleware/uploadMiddleware.js';


const employeeRoute = express.Router();

employeeRoute.post("/register", staffRegister);
employeeRoute.get("/login", staffLogin);
employeeRoute.get("/logout", staffLogout);
employeeRoute.post("/mark-attendance", upload.single('imageUrl'),createAttendance);





export default employeeRoute

