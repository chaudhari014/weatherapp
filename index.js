const express=require("express")
const {connection}=require("./config/db")
const {winstonlogger}=require("./middleware/winston")
const {user}=require("./routs/user.routs")
const {data}=require("./routs/weather")
const {auth}=require("./middleware/auth")
const cookies=require("cookie-parser")
require("dotenv").config()
const app=express()
app.use(express.json())
app.use(cookies())

app.use("/user",user)

app.use(auth)

app.use("/data",data)
let port=process.env.port || 7080
app.listen(port,async()=>{
    try {
        await connection 
        console.log("connected db")
    } catch (error) {
        console.log(error)
    }
    console.log("server started")
})

