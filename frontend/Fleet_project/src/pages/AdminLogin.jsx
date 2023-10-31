import axios from 'axios';
import '../../public/assets/css/adminLayout/login.css'
import { useEffect, useRef, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom'
const AdminLogin = ()=>{
  const nav = useNavigate(null)
  const hostServer = import.meta.env.VITE_SERVER_HOST
  axios.defaults.withCredentials = true;
  const [userName, setUserName] = useState(null)
  const [password, setPassword] = useState(null)
  const eye = useRef(null)
  const passwordInput = useRef(null)
  const showPassword = () =>
  { 
    if(passwordInput.current.type == "password"){
      passwordInput.current.type = "text"
      eye.current.classList = "fa fa-eye"
    }
    else{
      passwordInput.current.type = "password"
      eye.current.classList = "fa fa-eye-slash"
    }
  }

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const result = await axios.post(`${hostServer}/login`, { userName, password });
      if(result.data.success) {
        console.log(result.data.success)
        nav('/admin/dashboard')
      }
      else {
        alert(result.data.message)
      }
      
    } catch (error) {
      console.error(error)
    }
  };
    useEffect(()=>
    {
        const inputs = document.querySelectorAll(".input");
        function addcl(){
            let parent = this.parentNode.parentNode;
            parent.classList.add("focus");
        }
        
        function remcl(){
            let parent = this.parentNode.parentNode;
            if(this.value == ""){
                parent.classList.remove("focus");
            }
        }
            
        inputs.forEach(input => {
            input.addEventListener("focus", addcl);
            input.addEventListener("blur", remcl);
        });
        
    }, [])
   


    return(
  
            <>
  <div className="background-image"></div>
  <div className="AdminLogin">
    <div className="img">
      <Link to="/">
      <img src="/assets/img/kargada-logo-name.png" />
      </Link>
     
    </div>
    <div className="login-content">
      <form action="index.html" onSubmit={handleLogin}>
       <Link to='/' id='image-link'><img src="/assets/img/avatar.svg"/></Link> 
        <h2 className="title">Welcome</h2>
        <div className="input-div one">
          <div className="i">
            <i className="fas fa-user" />
          </div>
          <div className="div">
            <h5>Username</h5>
            <input type="text" className="input" name='username' onChange={(e)=>{setUserName(e.currentTarget.value)}} />
          </div>
        </div>
        <div className="input-div pass">
          <div className="i">
            <i className="fas fa-lock" />
          </div>
          <div className="div">
            <h5>Password</h5>
            <input type="password" className="input" ref={passwordInput} name='password'
             onChange={(e)=>{setPassword(e.currentTarget.value)}}/>
            <i className="fa fa-eye-slash" id='eye' aria-hidden="true" onClick={showPassword} ref={eye}></i>
          </div>
        </div>
        <a href="#">Forgot Password?</a>
      
      <button type='submit' className='btn'>Login</button>

      </form>
    </div>
  </div>
</>


    )
}

export default AdminLogin;