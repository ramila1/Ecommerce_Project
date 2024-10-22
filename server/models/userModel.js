import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is required']
    },
    email:{
        type:String,
        required:[true,'Email is required'],
        unique:[true,'Email already exists']
    },
    password:{
        type:String,
        required:[true,'Password is required'],
        minlength:[6,'Password length should be greater than 6']
    },
    address:{
        type:String,
        require:[true,'Address is required']
    },
    city:{
        type:String,
        required:[true,'City name is required']
    },
    country:{
        type:String,
        require:[true,'Country name is required']
    },
    phone:{
        type:String,
        require:[true,'Phone number is required']
    },
    profilePicture:{
        type:String
    }

},{timestamps:true});

export const userModel = mongoose.model("Users",userSchema);
export default userModel;