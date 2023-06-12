const {validate}=require("../middleware/validate")
const {redis}=require("../config/redis")
const express=require("express")
const axios=require("axios")
const data=express.Router()

data.get("/",validate,async(req,res)=>{
    const {city}=req.query
    try {
        const rediscity=await redis.get(city)
        if(rediscity){
           return res.status(200).send(JSON.parse(rediscity))
        }
        const data= await axios.get(`http://api.weatherapi.com/v1/current.json?key=48168860069c4535801110022231206&q=${city}`)
        const weatherdata=data.data
        await redis.set(city,JSON.stringify(weatherdata),"EX",30*60)
       return res.send({"msg":[data.data]})
    } catch (error) {
        res.status(400).send({msg:error.message})
    }
    
})
module.exports={data}