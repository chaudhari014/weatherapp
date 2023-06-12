const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    email:String,
    pass:String
})

const userModel=mongoose.model("user",userSchema)

module.exports={userModel}