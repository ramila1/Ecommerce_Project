import mongoose, { connect } from 'mongoose';
import colors from 'colors';

const connectDb = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB connect ${mongoose.connection.host}`);
    }catch(error){
        console.log(`Error is ${error}`);
    }
}

export default connectDb;