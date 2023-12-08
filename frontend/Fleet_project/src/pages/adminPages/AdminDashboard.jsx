import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

const AdminDashboard = () => {
    const { u_name } = useOutletContext()
    return (
            <div className="adminDashboard">
            <div class="adminHeader">
                <div class="left">
                    <h1>Dashboard</h1>
                    <ul class="breadcrumb">
                        <li><a href="#">
                            Analytics
                        </a></li>
                        /
                        <li><a href="#" class="active">Shop</a></li>
                    </ul>
                </div>
            </div>
            
            <center><h1>This is admin dashboard and the user is {u_name}</h1></center>
       
            </div>

    )
}

export default AdminDashboard;