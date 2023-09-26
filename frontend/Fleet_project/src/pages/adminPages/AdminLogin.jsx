import '../../../public/assets/css/adminLayout/login.css'
import { useEffect, useRef} from 'react';
import {Link} from 'react-router-dom'
const AdminLogin = ()=>{
  const eye = useRef(null)
  const passwordInput = useRef(null)
  const showPassword = () =>
  { 
    if(passwordInput.current.type == "password"){
      passwordInput.current.type = "text"
      eye.current.classList = "fa fa-eye"
      console.log(eye.current)
    }
    else{
      passwordInput.current.type = "password"
      eye.current.classList = "fa fa-eye-slash"
    }
  }
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

  <div className="AdminLogin">
    <div className="img">
      <img src="/assets/img/kargada-logo-name.png" />
    </div>
    <div className="login-content">
      <form action="index.html">
        <img src="/assets/img/avatar.svg" />
        <h2 className="title">Welcome</h2>
        <div className="input-div one">
          <div className="i">
            <i className="fas fa-user" />
          </div>
          <div className="div">
            <h5>Username</h5>
            <input type="text" className="input" />
          </div>
        </div>
        <div className="input-div pass">
          <div className="i">
            <i className="fas fa-lock" />
          </div>
          <div className="div">
            <h5>Password</h5>
            <input type="password" className="input" ref={passwordInput}/>
            <i class="fa fa-eye-slash" id='eye' aria-hidden="true" onClick={showPassword} ref={eye}></i>
          </div>
        </div>
        <a href="#">Forgot Password?</a>
        <Link to="/admin/dashboard">
        <button type='submit' className='btn'>Login</button>
        </Link>    
      </form>
    </div>
  </div>
</>


    )
}

export default AdminLogin;