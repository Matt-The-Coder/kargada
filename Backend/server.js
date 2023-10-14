require('dotenv').config();
const express = require('express')
const app = express()
const port = process.env.PORT
const cors = require('cors') 
app.use(express.json());

var corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200 
  }

const routes = require('./routes/adminRoute')
app.use(cors())
app.use(routes)
app.listen(port, ()=>{

    console.log(`Server started at port ${port}`)

})
