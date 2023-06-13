const Redis=require("ioredis")
require("dotenv").config()
const redis=new  Redis(process.env.url2)

module.exports={redis}