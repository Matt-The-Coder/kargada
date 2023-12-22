const express = require('express')
const fuelRoute = express.Router()
const fuelServices = require('../services/fuel/fuel')
const {getFuelList, addFuel } = fuelServices()
// Add Fuel
fuelRoute.post("/add-fuel", async (req, res) => {
    const {vehicle, driver, date, quantity, odometerReading, amount, remarks} = req.body
    const d = new Date()
    const year = d.getFullYear()
    const month = d.getMonth() + 1
    const day = d.getDate()
    const created_date = `${year}-${month}-${day}`
    const result = await addFuel(vehicle, driver, date, quantity, odometerReading, amount, remarks, created_date)
    res.json(result).status(200)
})
// Get Fuel
fuelRoute.get("/retrieve-fuel", async (req, res) => {
    const fuelData = await getFuelList()
    res.json(fuelData)
})

module.exports = fuelRoute