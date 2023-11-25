import '/public/assets/css/adminLayout/maintenance.css'

const MaintenanceList = ()=>{
    return(
        <div className="Maintenance">
            <center><h1>List of Maintenance</h1></center>
            <div className="maintenance-list">
            <table className='maintenance-table'>
                    <tr>
                    <th>M.No</th>
                    <th>Vehicle</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Service Info</th>
                    <th>Vendor</th>
                    <th>Cost</th>
                    <th>Status</th>
                    <th>Manage</th>
                    </tr>
                    <tr>
                    <td>test</td>
                    <td>test</td>
                    <td>test</td>
                    <td>test</td>
                    <td>test</td>
                    <td>test</td>
                    <td>test</td>
                    <td>test</td>
                    <td>test</td>
                    </tr>
            </table>
            </div>
        </div>
    )
}

export default MaintenanceList;