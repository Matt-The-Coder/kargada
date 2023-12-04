

const FuelManagement = ()=>{
    return(
        <div className="FuelManagement">

                <div className="fuel-search">
                <p>Search: </p>
                <input type="text" id='search' />
            </div>
            <div className="fuel-list">
            <table className='fuel-table'>
                    <tr>
                    <th>S.No</th>
                    <th>Fuel Fill Date</th>
                    <th>Vehicle</th>
                    <th>Quantity</th>
                    <th>Fuel Total Price</th>
                    <th>Fuel Filled By</th>
                    <th>Odometer Reading</th>
                    <th>Remarks</th>
                    <th>Action</th>
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

export default FuelManagement;