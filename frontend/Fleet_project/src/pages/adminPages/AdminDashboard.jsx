import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

const AdminDashboard = ()=>{
    const {u_name} = useOutletContext()
    return(
        <div className="AdminDashboard">
            <center><h1>This is admin dashboard and the user is {u_name}</h1></center>
        </div>
    )
}

export default AdminDashboard;