import jwt from 'jsonwebtoken';
import serverConfig from '../config/severConfig.js';

export const ownerToken = (owner)=>{
    if (!owner || !owner._id) {
        throw new Error('Owner object is required to generate a token');
      }
      const token =  jwt.sign({data:owner._id, email: owner.email},serverConfig.token,{expiresIn: "1d"});
      return token;
}

export const EmployeesToken = (employees)=>{
    const token =  jwt.sign({data:employees},serverConfig.token,{expiresIn: "1d"});
    return token;
}