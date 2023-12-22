import { useEffect, useState } from 'react';
import '/public/assets/css/adminLayout/fuel.css'
import axios from 'axios'
const AddFuel = () => {
    const [vehicle, setVehicle] = useState("")
    const [driver, setDriver] = useState("")
    const [date, setDate] = useState("")
    const [quantity, setQuantity] = useState("")
    const [odometerReading, setOdometerReading] = useState("")
    const [amount, setAmount] = useState("")
    const [remarks, setRemarks] = useState("")
    const hostServer = import.meta.env.VITE_SERVER_HOST;
    const AddFuel = async (e) => 
    {
        e.preventDefault()
        const result = await axios.post(`${hostServer}/add-fuel`, 
        {vehicle, driver, date, quantity, odometerReading, amount, remarks})
        console.log(result)
    }
    return (
        <div className="AddFuel">
            <div className="adminHeader">
                <div className="left">
                    <h1>Add Fuel</h1>
                    <ul className="breadcrumb">
                        <li><a href="#">
                            Fuel
                        </a></li>
                        /
                        <li><a href="#" className="active">Add Fuel</a></li>
                    </ul>
                </div>
            </div>

                <div className="fuel-details">
                <form onSubmit={(e)=>{AddFuel(e)}}>
                    <div className="first-row">
                        <div className="vehicle">
                            <h4>Vehicle</h4>
                            <select name="vehicle" onChange={(e)=>{setVehicle(e.currentTarget.value)}} required>
                                <option value="">Select Vehicle</option>
                                <option value="1">Toyota</option>
                            </select>
                        </div>
                        <div className="driver">
                            <h4>Driver</h4>
                            <select required  onChange={(e)=>{setDriver(e.currentTarget.value)}}>
                                <option value="">Select Driver</option>
                                <option value="Matthew">Matthew</option>
                            </select>
                        </div>
                        <div className="fill-date" >
                            <h4>Fill Date</h4>
                            <input type="date"  required onChange={(e)=>{setDate(e.currentTarget.value)}}/>
                        </div>
                        <div className="quantity">
                            <h4>Quantity</h4>
                            <input type="number"  required placeholder='Enter Volume' onChange={(e)=>{setQuantity(e.currentTarget.value)}}/>
                        </div>
                    </div>
                    <div className="second-row">
                        <div className="odometer-reading">
                            <h4>Odometer Reading</h4>
                            <input type="number" placeholder='Enter Usage' required onChange={(e)=>{setOdometerReading(e.currentTarget.value)}} />
                        </div>
                        <div className="amount">
                            <h4>Amount</h4>
                            <input type="number" placeholder='Enter Price'  required onChange={(e)=>{setAmount(e.currentTarget.value)}} />
                        </div>
                        <div className="comment">
                            <h4>Remarks</h4>
                            <input type="text" placeholder='Enter Comment' onChange={(e)=>{setRemarks(e.currentTarget.value)}}/>
                        </div>
                    </div>
                    <div className="add-button">
                        <button type='submit'>Add Fuel</button>
                    </div>
                    </form>
                </div>




        </div>
    )
}

export default AddFuel;