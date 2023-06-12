const winston=require("winston")
const expresswinston=require("express-winston")
const mongoDb=require("winston-mongodb")
require("dotenv").config()

function winstonlogger(){
    winston.createLogger({
        transports:[
            new winston.transports.Console(),
            new winston.transports.MongoDB({
                db:process.env.url,
                // option:{useUnifieldTopology:true}
                collection:"error",
                level:"error"
            })
        ]
    })
}
module.exports={winstonlogger}