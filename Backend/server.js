require('dotenv').config();
const express = require('express')
const app = express()
const port = process.env.PORT
const origin = process.env.ORIGIN
const axios = require('axios')
const cors = require('cors') 
const cookieParser = require('cookie-parser')
const session = require('express-session')
const VITE_MAPBOX_API = "pk.eyJ1Ijoibm9haGtseWRlMTciLCJhIjoiY2xvZTF3djYwMDczdTJtcGY3dXdibHR4aSJ9.0VgWjkWc6WcgV4DarLZTGw"
app.use(express.json());
app.use(cookieParser())
app.use(session({
      secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    proxy: true, // Required for Heroku & Digital Ocean (regarding X-Forwarded-For)
    name: 'MyCoolWebAppCookieName', // This needs to be unique per-host.
    cookie: {
      secure: true, // required for cookies to work on HTTPS
      httpOnly: false,
      sameSite: 'none'
    }
}))
var corsOptions = {
    origin: [origin],
    methods: ["POST", "GET", "DELETE"],
    credentials: true,
    optionsSuccessStatus: 200 
  }

const routes = require('./routes/adminRoute')
app.use(cors(corsOptions))
app.use(routes)
app.get('/getDirections', async (req, res)=>{
  const data = await axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/121.0021727%2C14.6676937%3B120.9839835%2C14.594973249999999?alternatives=true&annotations=speed&geometries=geojson&language=en&overview=full&steps=true&access_token=pk.eyJ1Ijoibm9haGtseWRlMTciLCJhIjoiY2xvaHluYnE2MDdnODJpbzV2MDB3aG5pMiJ9.doCuGnlTGiK8h44qAgBo6A`)
  res.json(data.data)
})
app.listen(port, ()=>{

    console.log(`Server started at port ${port}`)

})
