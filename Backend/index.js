import express from 'express';
import serverConfig from './src/config/severConfig.js';
import connectDataBase from './src/config/dbConfig.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan'
import dotenv from 'dotenv';
import router from './src/routes/ownerRoute.js';
import employeeRoute from './src/routes/employeesRoute.js';
import guestRoute from './src/routes/guestRoute.js';

dotenv.config();

const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));



app.use("/api/owner",router);
app.use("/api/employee",employeeRoute)
app.use("/api/guest",guestRoute)


const startServer = async () => {
    try {
      await connectDataBase();
      console.log('DB connected successfully');
      app.listen(serverConfig.port, () => {
        console.log(`Server listening on Port ${serverConfig.port}`);
      });
  
    } catch (error) {
      console.error('Failed to connect to the database', error);
      process.exit(1); 
    }
  };

  startServer();


