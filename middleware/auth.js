const jwt = require("jsonwebtoken")
const { redis } = require("../config/redis")
const auth = async (req, res, next) => {
  const token = await redis.get("token")
  const black_list = await redis.get("black-list")
  if (token === black_list) {
    res.status(401).send("unauthorize")
  } else {
    const decode = jwt.verify(token, "supper")
    if (decode) {
      req.body.user_id = decode.user_id
      next()
    } else {
      res.status(401).send("unauthorize")
    }
  }
}
module.exports = { auth }