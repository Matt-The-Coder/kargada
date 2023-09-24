const express = require('express')
const route = express.Router()

route.get("/Home", (req, res)=>{
    res.send('hello')
})


module.exports = route