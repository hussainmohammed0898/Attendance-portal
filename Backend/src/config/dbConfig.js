import mongoose from "mongoose";
import serverConfig from "./severConfig.js";


const connectDataBase =async ()=>{
    try {
        await mongoose.connect(serverConfig.db);
      console.log("DB connected successfully")
    } catch (error) {
        console.log(error.message);
        
    }
};

export default connectDataBase;