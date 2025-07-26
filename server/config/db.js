import mongoose from "mongoose";
import process from 'process';

const connectDB = async () => {
    mongoose.connection.on('connected',()=>console.log('Database connected'))
    await mongoose.connect(`${process.env.MONGODB_URI}/job_portal_application`)
}

export default connectDB;