const db = require('../../database/connection')
module.exports = () => 
{
    const getMaintenanceList = async () => 
    {
        const query = "Select * from maintenance"
        try {
            const data = await db(query)
            return data
        } catch (error) {
            throw error
        }
    }
    const addMaintenance = async (vehicle, startDate, endDate, details, cost, vendor, parts, quantity, status,
        createdDate, modifiedDate) => 
    {
        const query = `Insert into maintenance 	(m_v_id, m_start_date, m_end_date,
        m_details, m_cost, m_vendor_name, m_parts, m_quantity, m_status, v_created_date, v_modified_date) 
        values(${vehicle}, ${startDate}, ${endDate}, ${details}, ${cost}, ${vendor}, 
            ${parts}, ${quantity}, ${status}, ${createdDate}, ${modifiedDate})`

        const data = await db(query)
        return data
    }

    return {
        getMaintenanceList,
        addMaintenance
    }
}