import '/public/assets/css/adminLayout/maintenance.css'

const MaintenanceList = () => {
    return (
        <div className="Maintenance">
            <div class="adminHeader">
                <div class="left">
                    <h1>Maintenance</h1>
                    <ul class="breadcrumb">
                        <li><a href="#">
                            Analytics
                        </a></li>
                        /
                        <li><a href="#" class="active">Shop</a></li>
                    </ul>
                </div>
            </div>
            <div className="maintenance-details">
                <div className="maintenance-search">
                    <p>Search: </p>
                    <input type="text" id='search' />
                </div>
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

        </div>
    )
}

export default MaintenanceList;