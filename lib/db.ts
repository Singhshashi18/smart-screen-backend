import mongoose from "mongoose";

const MONGODB_URI=process.env.MONGODB_URI!;

export const connectDB=async()=>{
    if(mongoose.connection.readyState === 0){
        try {
           await mongoose.connect(MONGODB_URI);
           console.log("mongodb connected successfully :)")
        } catch (error) {
            console.error("mongodb connection error :(",error)
        }
    }
}