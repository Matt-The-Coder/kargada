import '/public/assets/css/adminLayout/fuel.css'

const AddFuel = ()=>{
    return(
        <div className="AddFuel">
            <div className="fuel-details">
                <div className="first-row">
                    <div className="vehicle">
                        <h4>Vehicle</h4>
                        <select name="" id="">
                            <option value="">Select Vehicle</option>
                        </select>
                    </div>
                    <div className="driver">
                    <h4>Driver</h4>
                        <select name="" id="">
                            <option value="">Select Driver</option>
                        </select>
                    </div>
                    <div className="fill-date">
                        <h4>Fill Date</h4>
                        <input type="date" name="" id="" />
                    </div>
                    <div className="quantity">
                        <h4>Quantity</h4>
                        <input type="number" name="" id="" placeholder='Enter Volume'/>
                    </div>
                </div>
                <div className="second-row">
                    <div className="odometer-reading">
                        <h4>Odometer Reading</h4>
                        <input type="number" placeholder='Enter Usage' />
                    </div>
                    <div className="amount">
                    <h4>Amount</h4>
                        <input type="number" placeholder='Enter Price' />
                    </div>
                    <div className="comment">
                    <h4>Remarks</h4>
                        <input type="text" placeholder='Enter Comment'/>
                    </div>
                </div>
                <div className="add-button">
                    <button>Add Fuel</button>
                </div>
            </div>


        </div>
    )
}

export default AddFuel;