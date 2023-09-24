import { Link } from "react-router-dom";
const CustomerForm = ({authType, submitForm, setUsername, setPassword})=>{

    return(
        <div className="CustomerForm">
                <form onSubmit={(e)=>{submitForm(e.target)}}>
                {authType == 'Login'? <h3 >Login</h3> :
                         <h3 >Register</h3>}
                    <label>Username:</label>
                    <input type="text" name="userName" id="userName"
                    onChange={e => {setUsername(e.target.value)}}/>
                    <label>password:</label>
                    <input type="password" name="password" id="password"
                    onChange={e => {setPassword(e.target.value)}}/>
                  
                        {authType == 'Login'? <button type="Submit">Login</button> :
                         <button type="Submit">Register</button>}
                         {authType == 'Login'? <Link to='/register'>Create Account?</Link> :
                         <Link to='/login'>Already have an account?</Link>}
                   
                  
                </form>
        </div>
    )
}

export default CustomerForm;