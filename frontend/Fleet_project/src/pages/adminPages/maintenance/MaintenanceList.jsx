import { useEffect, useState } from 'react'
import '/public/assets/css/adminLayout/maintenance.css'
import axios from "axios"
import {Link} from "react-router-dom"
const MaintenanceList = () => {
    const [maintenanceData, setMaintenanceData] = useState([])
    const hostServer = import.meta.env.VITE_SERVER_HOST;
    useEffect( ()=> 
    {   const fetchData = async () => 
        {
            try {
                const data = await axios.get(`${hostServer}/maintenance-list`)
                setMaintenanceData(data.data)
            } catch (error) {
                throw error
            }
        }
        fetchData()

    }, [])
    return (
        <div className="Maintenance">
            <div className="adminHeader">
                <div className="left">
                    <h1>Maintenance</h1>
                    <ul className="breadcrumb" >
                        <li><Link to="/admin/dashboard" className="active">Dashboard</Link></li>
                        /
                        <li><a href="#">Maintenance</a></li>
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
                        <thead>
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
                            {
                                maintenanceData.forEach((data)=> 
                                {
                                    <tr>
                                        <td>{data?.m_id}</td>
                                        <td>{data?.m_v_id}</td>/
                                        <td>{data?.m_start_date}</td>
                                        <td>{data?.m_end_date}</td>
                                        <td>{data?.m_details}</td>
                                        <td>{data?.vendor_name}</td>
                                        <td>{data?.m_cost}</td>
                                        <td>{data?.status}</td>
                                        <td>Manage</td>
                                    </tr>
                                })
                            }
                        </tbody>

                    </table>
                </div>
            </div>

        </div>
    )
}

export default MaintenanceList;