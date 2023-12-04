import { useEffect, useRef, useState } from 'react'
import '/public/assets/css/adminLayout/maintenance.css'

const AddMaintenance = ()=>{
        
        const [addedParts, setAddedParts] = useState([]);

        const addParts = () => {
            const parts = (
                <div className="parts-qty" key={addedParts.length}>
                    <div className="parts-name">
                        <h4>Parts Name</h4>
                        <select name="parts" id="parts">
                            <option value="parts1">Select Parts</option>
                        </select>
                    </div>
                    <div className="qty">
                        <h4>Quantity</h4>
                        <select name="quantity" id="quantity">
                            <option value="quantity">1</option>
                        </select>
                    </div>
                    <div className="add">
                        <i className='bx bxs-trash bx-tada' onClick={() => removeParts(addedParts.length)}></i>
                    </div>
                </div>
            );
            setAddedParts([...addedParts, parts]);
        };
    
        const removeParts = (index) => {
            const updatedParts = addedParts.filter((_, i) => i !== index);
            setAddedParts(updatedParts);
        };
    return(
        <div className="AddMaintenance">
            <div className="vehicle-maintenance">
                <div className="vehicle-details">
                    <div className="select-vehicle">
                    <h4>Select Vehicle</h4>
                    <select name="select-vehicle" id="select-vehicle">
                        <option value="Truck">Select Vehicle</option>
                    </select>
                    </div>
                    <div className="maintenance-date">
                        <div className="start">
                        <h4> <span>Maintenance</span>  Start Date</h4>
                        <input type="date" name="" id="" />
                        </div>
                        <div className="end">
                        <h4> <span>Maintenance</span>  End Date</h4>
                        <input type="date" name="" id="" />
                        </div>
                    </div>
                    <div className="service-details">
                        <h4>Service Details</h4>
                        <textarea name="service-details" id="service-details" cols="45" rows="6" placeholder='Enter Details'></textarea>
                    </div>
                    <div className="cost-vendor">
                    <div className="cost">
                        <h4>Total Cost</h4>
                        <input type="number" placeholder='Enter Price'/>
                    </div>
                    <div className="vendor">
                        <h4>Vendor Name</h4>
                        <input type="text" name="" id="" placeholder='Enter Name'/>
                    </div>
                    </div>
                    <div className="parts-qty">
                        <div className="parts-name">
                            <h4>Parts Name</h4>
                            <select name="parts" id="parts">
                                <option value="parts1">Select Parts</option>
                            </select>
                        </div>
                        <div className="qty">
                            <h4>Quantity</h4>
                            <select name="quantity" id="quantity">
                                <option value="quantity">1</option>
                            </select>
                        </div>
                        <div className="add">
                        <i className='bx bxs-add-to-queue' onClick={addParts}></i>
                        </div>
                    </div>
                    {addedParts}
                    <div className="maintenance-status">
                        <h4>Maintenance Status</h4>
                        <select name="maintenance-status" id="maintenance-status">
                            <option value="1">Choose Status</option>
                        </select>
                    </div>
                    <div className="save">
                        <button>Create</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddMaintenance;