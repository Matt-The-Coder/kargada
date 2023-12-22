const db = require('../../database/connection')
module.exports = () => {

    const getFuelList = async () => 
    {
        const query = "Select * from fuel"
        try {
            const data = await db(query)
            return data
        } catch (error) {
            throw error
        }
    }
    const addFuel =  async (vehicle, driver, date, quantity, odometerReading, amount, remarks, created_date) => 
    {
        const query = `INSERT INTO fuel (v_id, v_fuel_quantity, v_odometerreading,	
            v_fuelprice, v_fuelfilldate, v_fueladdedby,	v_fuelcomments,	v_created_date)
            values (${vehicle}, ${quantity}, ${odometerReading}, ${amount}, 
                '${date}', '${driver}', '${remarks}', '${created_date}')`
        try {
            const data = await db(query)
            return data
        } catch (error) {
            throw error
        }
    }
    return{
        getFuelList,
        addFuel
    }
}