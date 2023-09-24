import { useEffect, useState } from "react";
import CustomerForm from "../../components/customerAuth/CustomerForm";
const CustomerRegister = ()=>{
    const [authType, setAuthType] = useState('Register')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault()
    }
    return(
        <div className="CustomerRegister">
       
            <CustomerForm authType={authType} submitForm={handleSubmit}
             setUsername={setUsername} setPassword={setPassword}/>
        </div>
    )
}

export default CustomerRegister;