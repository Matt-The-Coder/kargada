require('dotenv').config();
const express = require('express')
const app = express()
const port = process.env.PORT
const origin = process.env.ORIGIN
const cors = require('cors') 
const cookieParser = require('cookie-parser')
app.use(express.json());
app.use(cookieParser())
var corsOptions = {
    origin: [origin],
    methods: ["POST", "GET", "DELETE"],
    credentials: true,
    optionsSuccessStatus: 200 
  }

const routes = require('./routes/adminRoute')
app.use(cors(corsOptions))
app.use(routes)
app.listen(port, ()=>{

    console.log(`Server started at port ${port}`)

})
