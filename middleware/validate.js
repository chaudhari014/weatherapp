const validate= (req,res,next)=>{
  const  {city}=req.query
  const regex= /^[a-zA-Z\s.'-]{2,50}$/;
  const data=regex.test(city)
  if(data){
    next()
  }else{
    res.send({"msg":"invalid input city"})
  }

}
module.exports={validate}