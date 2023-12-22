

const FuelManagement = () => {
    return (
        <div className="FuelManagement">
            <div className="adminHeader">
                <div className="left">
                    <h1>Fuel Info</h1>
                    <ul className="breadcrumb">
                        <li><a href="#">
                            Analytics
                        </a></li>
                        /
                        <li><a href="#" className="active">Shop</a></li>
                    </ul>
                </div>
            </div>
            <div className="fuel-content">
                <div className="fuel-search">
                    <p>Search: </p>
                    <input type="text" id='search' />
                </div>
                <div className="fuel-list">
                    <table className='fuel-table'>
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Fill Date</th>
                                <th>Vehicle</th>
                                <th>Quantity</th>
                                <th>Total Price</th>
                                <th>Filled By</th>
                                <th>Odometer Reading</th>
                                <th>Remarks</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
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
                        </tbody>

                    </table>
                </div>
            </div>

        </div>
    )
}

export default FuelManagement;