import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

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
        require:[true,'Phone number is required'],
        unique:[true,'Check your Phone Number']
    },
    profilePicture:{
        type:String
    }

},{timestamps:true});

//encrypt password
userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcryptjs.hash(this.password,10);
});

//decrypt password
userSchema.methods.comparePassword = async function(plainPassword){
    return await bcryptjs.compare(plainPassword,this.password);
};

//JWT Token
userSchema.methods.generateToken = async function(){

    return await jwt.sign({_id:this._id},process.env.JWT_SECRET,{
        expiresIn:"7d",
    });
};

export const userModel = mongoose.model("Users",userSchema);
export default userModel;