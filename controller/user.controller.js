const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const {userModel}=require("../models/user.model")
const {winstonlogger}=require("../middleware/winston")
const {redis}=require("../config/redis")
const REGISTER= async(req,res)=>{
        try {
            const hash = bcrypt.hashSync(req.body.pass, 3);
            if(hash){
                req.body.pass=hash
            }else{
                res.send("not save hash is invalid")
            }
            const user= new userModel(req.body)
            await user.save()
            res.status(200).send({"msg":"register successfully"})
        } catch (error) {
            // winstonlogger.error(error.message)
            res.send(error)
        }
}

const LOGIN=  async (req,res)=>{
     try {
        const user= await userModel.findOne({email:req.body.email})
        console.log(user)
        if(!user){
            res.status(401).send({msg:"not register"})
        }
        const resultpass=bcrypt.compareSync(req.body.pass, user.pass)
        if(resultpass){
           const token= jwt.sign({user_id:user._id}, 'supper',{ expiresIn: '1h' })
           await redis.set("token",token,"EX",60*60)
           res.cookie("token",token,"expires",60*60)
           res.send({"token":token})
        }
     } catch (error) {
        // winstonlogger.logger(error.message)
        res.status(401).send("not get")
     }
}

const LOGOUT=async (req,res)=>{
       const token= await redis.get("token")
       const blacklist= await redis.set("black-list",token)
    //    await redis.del("token")
       res.status(200).send({"msg":"logout successfully"})
}

module.exports={REGISTER,LOGIN,LOGOUT}