import dotenv from 'dotenv';

dotenv.config();


export default {
    port :process.env.PORT || 3001,
    db:process.env.MONGOOSE_CONNECT || "",
    token:process.env.SECRET_KEY
}