const Redis=require("ioredis")

const redis=new  Redis(`redis://default:HCJ3XSBAwQtjjPWFTLVxFsLZvEBeN25p@redis-13150.c295.ap-southeast-1-1.ec2.cloud.redislabs.com:13150`)

module.exports={redis}