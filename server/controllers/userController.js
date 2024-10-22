import userModel from '../models/userModel.js';
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
        res.status(201).res.send({
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