import { useEffect, useRef, useState } from 'react';
import '/public/assets/css/adminLayout/maintenance.css';
import {Link} from "react-router-dom"
const AddMaintenance = () => {
  const [addedParts, setAddedParts] = useState([]);
  const [vehicle, setVehicle] = useState();
  const [sDate, setSDate] = useState();
  const [eDate, setEDate] = useState();
  const [details, setDetails] = useState();
  const [cost, setCost] = useState();
  const [vendor, setVendor] = useState();
  const [parts, setParts] = useState();
  const [quantity, setQuantity] = useState();
  const [status, setStatus] = useState();

  useEffect(()=>{
    console.log(addedParts)
  }, [addedParts])
  const addParts = () => {
    const newPart = {
      parts: '',
      quantity: '',
    };

    setAddedParts([...addedParts, newPart]);
  };

  const removeParts = (index) => {
    const updatedParts = [...addedParts];
    updatedParts.splice(index, 1);
    setAddedParts(updatedParts);
  };

  const handlePartChange = (index, e) => {
    const { name, value } = e.target;
    const updatedParts = [...addedParts];
    updatedParts[index][name] = value;
    setAddedParts(updatedParts);
  };

  return (
    <div className="AddMaintenance">
      <div className="adminHeader">
        <div className="left">
          <h1>Maintenance</h1>
          <ul className="breadcrumb">
            <li>
              <Link to="/admin/dashboard" className="active">Dashboard</Link>
            </li>
            /
            <li>
              <a href="#" >
                Vehicle Maintenance
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="vehicle-maintenance">
        <div className="vehicle-details">
          <div className="select-vehicle">
            <h4>Select Vehicle</h4>
            <select name="select-vehicle" id="select-vehicle" onChange={(e) => { setVehicle(e.currentTarget.value) }}>
              <option value="Truck">Select Vehicle</option>
            </select>
          </div>
          <div className="maintenance-date">
            <div className="start">
              <h4>
                <span>Maintenance</span> Start Date
              </h4>
              <input type="date" name="" id="" onChange={(e) => { setSDate(e.currentTarget.value) }} />
            </div>
            <div className="end">
              <h4>
                <span>Maintenance</span> End Date
              </h4>
              <input type="date" name="" id="" onChange={(e) => { setEDate(e.currentTarget.value) }} />
            </div>
          </div>
          <div className="service-details">
            <h4>Service Details</h4>
            <textarea name="service-details" id="service-details" onChange={(e) => { setDetails(e.currentTarget.value) }} cols="45" rows="6" placeholder='Enter Details'></textarea>
          </div>
          <div className="cost-vendor">
            <div className="cost">
              <h4>Total Cost</h4>
              <input type="number" placeholder='Enter Price' onChange={(e) => { setCost(e.currentTarget.value) }} />
            </div>
            <div className="vendor">
              <h4>Vendor <span>Name</span> </h4>
              <input type="text" name="" id="" placeholder='Enter Name' onChange={(e) => { setVendor(e.currentTarget.value) }} />
            </div>
          </div>
          <div className="parts-qty">
            <div className="parts-name">
              <h4>Parts Name</h4>
              <select name="parts" id="parts" onChange={(e) => { setParts(e.currentTarget.value) }}>
                <option value="parts1">Select Parts</option>
              </select>
            </div>
            <div className="qty">
              <h4>Quantity</h4>
              <select name="quantity" id="quantity" onChange={(e) => { setQuantity(e.currentTarget.value) }}>
                <option value="quantity">1</option>
              </select>
            </div>
            <div className="add">
              <i className='bx bxs-add-to-queue' onClick={addParts}></i>
            </div>
          </div>
          {addedParts.map((part, index) => (
            <div className="parts-qty" key={index}>
              <div className="parts-name">
                <h4>Parts Name</h4>
                <select name="parts" id="parts" value={part.parts} onChange={(e) => handlePartChange(index, e)}>
                  <option value="parts1">Select Parts</option>
                </select>
              </div>
              <div className="qty">
                <h4>Quantity</h4>
                <select name="quantity" id="quantity" value={part.quantity} onChange={(e) => handlePartChange(index, e)}>
                  <option value="quantity">1</option>
                </select>
              </div>
              <div className="add">
                <i className='bx bxs-trash bx-tada' onClick={() => removeParts(index)}></i>
              </div>
            </div>
          ))}
          <div className="maintenance-status">
            <h4>Maintenance Status</h4>
            <select name="maintenance-status" id="maintenance-status" onChange={(e) => { setStatus(e.currentTarget.value) }}>
              <option value="1">Choose Status</option>
            </select>
          </div>
          <div className="save">
            <button>Create</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMaintenance;