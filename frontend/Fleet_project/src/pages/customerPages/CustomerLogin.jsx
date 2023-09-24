import { useState } from "react";
import CustomerForm from "../../components/customerAuth/CustomerForm";
const CustomerLogin = ()=>{
    const [authType, setAuthType] = useState('Login')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const handleSubmit = (e) => {
        debugger;
        e.preventDefault()
        console.log('hl')
    }
    return(
        <div className="CustomerLogin">
               
               <CustomerForm authType={authType} submitForm={handleSubmit}
             setUsername={setUsername} setPassword={setPassword}/>
        </div>
    )
}

export default CustomerLogin;