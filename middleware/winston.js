const winston=require("winston")
const expresswinston=require("express-winston")
const mongoDb=require("winston-mongodb")
require("dotenv").config()


const winstonlogger=(req,res,next)=>{
    expresswinston.logger({
        transports:[
            new winston.transports.Console(),
            new winston.transports.MongoDB({
                db:process.env.url,
                option:{useUnifieldTopology:true},
                collection:"error",
                level:"error"
            })
        ]
    })
}
module.exports={winstonlogger}