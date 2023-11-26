const express = require('express')
const route = express.Router()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const db = require('../database/connection')
const axios = require('axios')

const verifyToken = (req, res, next) => 
{
  const token = req.session.token
    if(token){
        req.sessionToken = token
        // req.userToken = req.cookies.token
        next()
    }else {
      return res.json({message:'No token provided.'});
    }

}
route.get('/alreadyauthenticated', (req, res) => 
{

  if(req.session.token){
    res.json({auth: true})
  }
  else{
    res.json({auth:false})
  }
})
route.get('/homeAuthentication', verifyToken, (req, res) => {
    jwt.verify(req.sessionToken, "secretkey", (err, authData)=>{
        if(err){
          return res.json({message: "token is expired, not valid!"})
        }else {
          return res.json({authData})
        }
    })
})

route.delete("/logout", (req, res) => 
{
  // res.clearCookie("token")
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.status(500).json({ message: 'Failed to logout' });
    }
    return res.json({ message: 'Logout Successful!' });
  });
})

route.post('/login', async (req, res)=>
{
  try { 
    const {userName, password} = req.body
    const user = await db(`Select * from accounts where u_username = '${userName}'`)
    if(user == 0){
     return res.json({message: "User does not exist"})
    }
    else{
     const checkPassword =  await bcrypt.compare(password, user[0].u_password)
      if (!checkPassword) {
          return res.json({message: "Password is Incorrect!"})
      }
      else {

         jwt.sign({user: user}, "secretkey", {expiresIn: '1d'}, (err, token)=>{
          if(err){
            return res.json({message: "Cannot create token"})
          }
          // res.cookie('token', token)
          req.session.token = token
          return res.json({success:"Login Success!", token})
        })
      }
    }
 
  } catch (error) {
    console.log('You have an error', error)
  }
})



route.get('/register', async (req, res)=>
{
  try {
    const email = 'ralphmatthewmanabat@gmail.com'
    const username = 'rm'
    const name = 'rm'
    const password = '123'
    const hashedPassword = await bcrypt.hash(password, 10)
    const sqlQuery = `INSERT INTO accounts (u_name, u_username, u_password, u_email) VALUES('${name}', 
    '${username}', '${hashedPassword}', '${email}')`;
    await db(sqlQuery)

  } catch (error) {
    console.error(error)
  }

})
// Calculate Emissions and Consumptions
route.post('/calculateFuelConsumptionWithPrice', (req, res)=>
{
  const {miles, weightInKG} = req.query
  // Fuel Consumption
    const runMiles = miles
    const milesPerLiter = 21.58
    const fuelConsumptionPerLiter = runMiles / milesPerLiter
    const dieselFuelPricePerLiter = 66.52
    const totalCostForAllDieselUsed = fuelConsumptionPerLiter * dieselFuelPricePerLiter
  // Carbon Emissions
    const truckEmissionFactorInGramsPerTonMiles = 161.8
    const cargoWeightInTons = weightInKG / 1000
    const totalAmountOfTonMiles = runMiles * cargoWeightInTons;
    const carbonEmissionsInGrams = totalAmountOfTonMiles * truckEmissionFactorInGramsPerTonMiles
    res.json({fuelConsumption: fuelConsumptionPerLiter, fuelCost:totalCostForAllDieselUsed, 
      carbonEmission: carbonEmissionsInGrams})
})

route.get('/weatherdata', async (req, res)=> 
{   
  let latitude = req.query.lat;
  let longitude = req.query.lon
    const API = process.env.WEATHER_API
    const weatherData = await axios.get(`https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=${API}`)
    const weatherAlert = await axios.get(`https://api.weatherbit.io/v2.0/alerts?lat=${latitude}&lon=${longitude}&key=${API}`);
    res.json({weatherData:weatherData.data.data[0], weatherAlert:weatherAlert.data})
})

module.exports = route