const express = require('express')
const maintenanceRouter = express.Router()
const maintenanceServices = require('../services/maintenance/maintenance')
const {addMaintenance, getMaintenanceList} = maintenanceServices()
maintenanceRouter.get("/maintenance-list", async (req, res) => 
{
    const data = await getMaintenanceList()
    res.json(data)
})

maintenanceRouter.post("/add-maintenance", async () => 
{
    const {vehicle, startDate, endDate, details, cost, vendor, parts, quantity, status,
        createdDate, modifiedDate} = req.body
    const data = await addMaintenance(vehicle, startDate, endDate, details, cost, 
        vendor, parts, quantity, status, createdDate, modifiedDate)
    res.json(data)
})

module.exports = maintenanceRouter