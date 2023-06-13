const express = require("express")
const { connection } = require("./config/db")
const { user } = require("./routs/user.routs")
const { data } = require("./routs/weather")
const { auth } = require("./middleware/auth")
const cookies = require("cookie-parser")
// const { error } = require("console")
// const winston=require("winston")
// const expresswinston=require("express-winston")
// const mongoDb=require("winston-mongodb")
require("dotenv").config()
const app = express()
app.use(express.json())
app.use(cookies())

// app.use( expresswinston.logger({
//     transports:[
//         new winston.transports.Console(),
//         new winston.transports.MongoDB({
//             db:process.env.url,
//             option:{useUnifieldTopology:true},
//             collection:"error",
//             level:"error"
//         })
//     ]
// }))
// app.get("/",(req,res)=>{
//     throw error()
//     res.status(404)
// })


app.use("/user", user)

app.use(auth)

app.use("/data", data)
let port = process.env.port || 7080
app.listen(port, async () => {
    try {
        await connection
        console.log("connected db")
    } catch (error) {
        console.log(error)
    }
    console.log("server started")
})

