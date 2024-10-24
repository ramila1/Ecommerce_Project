import mongoose, { connect } from 'mongoose';


const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB connect ${mongoose.connection.host}`);
    } catch (error) {
        console.log(`Error is ${error}`);
    }
}

export default connectDb;