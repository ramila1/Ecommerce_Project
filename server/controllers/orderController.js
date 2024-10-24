export const getAllorderController = async(req,res)=>{
    try{

    }catch(error){
        console.log(error),
        res.status(500).send({
            message:'Error while fetching all order',
            success:false,
            error
        })
    }
}