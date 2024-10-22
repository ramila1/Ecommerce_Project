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
        res.status(200).cookie("token",token,{
            expires: new Date(Date.now()+15*24*60*60*1000),
            secure: process.env.NODE_ENV === "development" ? true : false,
            httpOnly: process.env.NODE_ENV === "development" ? true: false,

        }).send({
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

//profile
export const getUserProfile = async(req,res)=>{
    try{
        const user = await userModel.findById(req.user._id);
        user.password = undefined;
        res.status(200).send({
            message:"Profile fetch successfully",
            success:true,
            user
        });
    }catch(error){
        console.log(error);
        return res.status(500).send({
            message:"Profile Error",
            success:false,
            error
        });
    }
};

//logout
export const logout = async(req,res) =>{
    try{
        await res.status(200).cookie("token","",{
            expires: new Date(Date.now()),
            secure:process.env.NODE_ENV === "development" ? true:false,
            httpOnly: process.env.NODE_ENV === "development" ? true:false
        }).send({
            message:"LOGOUT SUCCESSFULLY",
            success:true
        });

    }catch(error){
        console.log(error);
        return res.status(500).send({
            message:"Logout error",
            success:true,
            error
        });
    }
};

//Update

export const updateUser = async(req,res)=>{
    try{
        const user = await userModel.findById(req.user._id);
        const {name,email,password,address,city,country,phone} = req.body;
        if(name) user.name = name
        if(email) user.email = email
        if(password) user.password = password
        if(address) user.address = address
        if(city) user.city = city
        if(country) user.country = country
        if(phone) user.phone = phone

        await user.save();

        res.status(200).send({
            message:"Update Successfully",
            success:true,
            user
        });

    }catch(error){
        console.log(error);
        res.status(500).send({
            message:"Update Error",
            success:false,
            error
        });
    }
};

//update password
export const updatePassword = async(req,res) =>{
    try{
        const user = await userModel.findById(req.user._id);
        const {oldpassword,newpassword} = req.body;
        if(!oldpassword || !newpassword){
            return res.status(404).send({
                message:"Password is Incorrect",
                success:false,
                error
            });
        }
        const isMatch = await user.comparePassword(oldpassword);
        if(!isMatch){
            return res.status(500).send({
                message:"Invalid Old Password",
                success:false
            });
        }
        user.password = newpassword;
        user.save();
        res.status(200).send({
            message:"Password Update Successfully",
            success:true,
            user
        })
    }catch(error){
        console.log(error);
        return res.status(500).send({
            message:"Error in Updating Password",
            success:false,
            error
        });
    }
};
//prfile pic
export const profilePic = async(req,res)=>{
    try{
        const user = await userModel.findById(req.user._id)

    }catch(error){
        console.log(error),
        res.status(500).send({
            message:"ProfilePic Error",
            success:true,
            error
        });
    }
};