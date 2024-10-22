import userModel from '../models/userModel.js';
import cookieParser from 'cookie-parser';
export const userController = async(req,res) =>{
    try{
        const {name,email,password,address,city,country,phone} = req.body;

        //validation 
        if(!name || !email || !password || !address || !city || !country){
            return res.staus(500).send({
                message:"Provide All Fields",
                success:false,
            });
        }
        //for existing user
        const existingUser = await userModel.findOne({email})

        if(existingUser){
            res.status(500).send({
                message:"User already exist",
                success:false
            });
        }
        const user = await userModel.create({
            name,
            email,
            password,
            address,
            city,
            country,
            phone
        });

        res.status(201).send({
            message:"Registration Success",
            success:true,
            user
        });
    }catch(error){
        console.log(error);
        res.status(500).send({
            message:"Error in Register",
            success:false,
            error
        });
    }
};

export default userController;

//login

export const userLoginController = async (req,res) =>{
    try{
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(500).send({
                message:"Provide all Fields",
                success:false
            });

        }
        //check user
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).send({
                message:"Email is not register",
                success:false
            });
        }
        const isCompare = await user.comparePassword(password);

        if(!isCompare){
            return res.status(500).send({
                message:"Password is Incorrect",
                success:false
            });
        }
        const token = await user.generateToken();
        return res.status(200).cookie("token",token).send({
            message:"Login Successfull",
            success:true,
            token,
            user
    
        });
    }catch(error){
        console.log(error);
        res.status(500).send({
            message:"Login Failed",
            success:false,
            error
        });
    }
};
