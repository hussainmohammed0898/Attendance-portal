import { cloudinaryInstance } from "../config/cloudinaryConfig.js";
import { Attendance } from "../models/attendenceModel.js";

export const createAttendance = async(req, res)=>{

    try {
        console.log("file:",req.file);
        
        if(!req.file){
            return res.status(404).json({success: false, message: 'No file uploaded'});
        }
        cloudinaryInstance.uploader.upload(req.file.path, async (err, result) => {
            if (err) {
              console.log(err, "error");
              return res.status(500).json({
                success: false,
                message: "Internal server error",
              });
            }

            const imageUrl = result.url;
           console.log(imageUrl);
            const {employeesId, status, location} = req.body;
      
            const attendanceMarked = new Attendance({
                employeesId,
                status,
                imageUrl,
                location,
            });
            await attendanceMarked.save();
            
            if (!attendanceMarked) {
              return res.status(404).json({message:"Attendance not created"});
            }
            res.status(200).json({ message: "Attendance created successfully", attendance: attendanceMarked});
          });
    } catch (error) {
        console.log("Error in createAttendance controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });  
    }

}

export const getAllAttendances = async (req, res) => {
    try {
      const attendances = await Attendance.find().populate('employeesId', 'name');
      res.status(200).json({
        success: true,
        data: attendances
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch attendances',
        error: error.message
      });
    }
  };

  export const getAttendanceById = async (req, res) => {
    try {
      const attendance = await Attendance.findById(req.params.id).populate('employeesId', 'name');
      if (!attendance) {
        return res.status(404).json({
          success: false,
          message: 'Attendance not found'
        });
      }
      res.status(200).json({
        success: true,
        data: attendance
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch attendance',
        error: error.message
      });
    }
  };

  export const updateAttendance = async (req, res) => {
    try {
      const { status, imageUrl, location } = req.body;
  
      const updatedAttendance = await Attendance.findByIdAndUpdate(
        req.params.id,
        { status, imageUrl, location },
        { new: true }
      );
  
      if (!updatedAttendance) {
        return res.status(404).json({
          success: false,
          message: 'Attendance not found'
        });
      }
  
      res.status(200).json({
        success: true,
        message: 'Attendance updated successfully',
        data: updatedAttendance
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to update attendance',
        error: error.message
      });
    }
  };

  export const deleteAttendance = async (req, res) => {
    try {
      const deletedAttendance = await Attendance.findById(req.params.id);
      console.log("Deleted Attendance:", deletedAttendance);
  
      if (!deletedAttendance) {
        return res.status(404).json({
          success: false,
          message: 'Attendance not found'
        });
      }
      const imageUrl = deletedAttendance.imageUrl;
      const publicId = imageUrl.split('/').pop().split('.')[0];
      console.log("Extracted publicId:", publicId);

      await cloudinaryInstance.uploader.destroy(publicId);
      await Attendance.deleteOne({ _id: req.params.id });
  
      res.status(200).json({
        success: true,
        message: 'Attendance deleted successfully',
        data: deletedAttendance
      });
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).json({
        success: false,
        message: 'Failed to delete attendance',
        error: error.message
      });
    }
  };
  