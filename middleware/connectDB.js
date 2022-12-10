import  mongoose  from "mongoose"

const connectDB = handler => async (req, res)=>{
    if(mongoose.connections[0].readyState){
        console.log("database already connected...");
        return handler(req, res);
    };
    mongoose.connect(process.env.MONGO_URL);
    console.log("database connected sucessfully...");
    return handler(req, res);
}

export default connectDB;