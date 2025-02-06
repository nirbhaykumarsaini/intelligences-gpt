import mongoose from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;


const dbConnect = async () => {

    const connectionState = mongoose.connection.readyState;

    if(connectionState === 1){
          console.log("Database already connected !");
          return;
    }

    if(connectionState === 2){
        console.log("Connecting...");
        return;
    }

    try {
        mongoose.connect(MONGODB_URL!,{
            dbName:"intelgpt",
            bufferCommands:true
        });
        console.log("Connected !")
    } catch (error) {
        if(error instanceof Error){
            throw new Error("Error:",error)
        }
    }
};

export default dbConnect;