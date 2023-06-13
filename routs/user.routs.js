const express = require("express")
const { REGISTER, LOGIN, LOGOUT } = require("../controller/user.controller")
const user = express.Router()
user.get("/", (req, res) => {
    res.send("ok")
})
user.post("/register", REGISTER)
user.post("/login", LOGIN)
user.get("/logout", LOGOUT)

module.exports = { user }