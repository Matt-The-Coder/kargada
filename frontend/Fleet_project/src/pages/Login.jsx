import axios from 'axios';
import '../../public/assets/css/login/login.css'
import { useEffect, useRef, useState} from 'react';
import {Link, useNavigate, useOutletContext} from 'react-router-dom'
import RiseLoader from "react-spinners/RiseLoader";
const AdminLogin = ()=>{
  const nav = useNavigate(null)
  const [isLoading, setIsLoading] = useState(false)
  const hostServer = import.meta.env.VITE_SERVER_HOST
  axios.defaults.withCredentials = true;
  const [userName, setUserName] = useState(null)
  const [password, setPassword] = useState(null)
  const eye = useRef(null)
  const mainContainer = useRef(null)
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
  const isAlreadyAuthenticated = async () => 
  {
    const res = await axios.get(`${hostServer}/alreadyauthenticated`)
    if(res.data.auth){
        nav('/admin/dashboard')

    }
  }
  const handleSignUp = () => 
  {
      mainContainer.current.classList.add("sign-up-mode")
  }
  const handleSignIn = () => 
  {
    mainContainer.current.classList.remove("sign-up-mode")
  }

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true)
      const result = await axios.post(`${hostServer}/login`, { userName, password });
      if(result.data.success) {
        setIsLoading(false)
        console.log(result.data.token)
        nav('/admin/dashboard')
      }
      else {
        setIsLoading(false)
        alert(result.data.message)
      }
      
    } catch (error) {
      console.error(error)
    }
  };
    useEffect(()=>
    {
        isAlreadyAuthenticated()
    }, [])
   
    const override = {
      display: "block",
      margin: "0 auto",
      position: "fixed"
    };

    return(
  
            <>
                  {isLoading && (
       <>
  <div className="loadingScreen"></div>
  <div className="loadingHandler">
  <RiseLoader
  id='loader'
  color="#1976D2"
  cssOverride={override}
  speedMultiplier={0.8}
/>
  </div>
       </>)}
  <div className="AdminLogin" ref={mainContainer}>
  <div className="forms-container">
    <div className="signin-signup">
      <form action="#" className="sign-in-form" onSubmit={handleLogin}>
        <h2 className="title">Sign in</h2>
        <div className="input-field">
          <i className="fas fa-user" />
          <input type="text" placeholder="Username"
          onChange={(e)=>{setUserName(e.currentTarget.value)}}/>
        </div>
        <div className="input-field">
          <i className="fas fa-lock" />
          <input type="password" placeholder="Password" ref={passwordInput}
          onChange={(e)=>{setPassword(e.currentTarget.value)}}/>
           {/* <i className="fa fa-eye-slash" id='eyes' aria-hidden="true" 
           style={{position:"relative", left:"23vw", bottom: "4.1vw"}}
            onClick={showPassword} ref={eye}></i> */}
        </div>
        <input type="submit" value="Login" className="btn solid" />
        {/* <p className="social-text">Or Sign in with social platforms</p>
        <div className="social-media">
          <a href="#" className="social-icon">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="#" className="social-icon">
            <i className="fab fa-twitter" />
          </a>
          <a href="#" className="social-icon">
            <i className="fab fa-google" />
          </a>
          <a href="#" className="social-icon">
            <i className="fab fa-linkedin-in" />
          </a>
        </div> */}
      </form>
      <form action="#" className="sign-up-form">
        <h2 className="title">Sign up</h2>
        <div className="input-field">
          <i className="fas fa-user" />
          <input type="text" placeholder="Username" />
        </div>
        <div className="input-field">
          <i className="fas fa-envelope" />
          <input type="email" placeholder="Email" />
        </div>
        <div className="input-field">
          <i className="fas fa-lock" />
          <input type="password" placeholder="Password" />
        </div>
        <input type="submit" className="btn" value="Register" />
        {/* <p className="social-text">Or Sign up with social platforms</p>
        <div className="social-media">
          <a href="#" className="social-icon">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="#" className="social-icon">
            <i className="fab fa-twitter" />
          </a>
          <a href="#" className="social-icon">
            <i className="fab fa-google" />
          </a>
          <a href="#" className="social-icon">
            <i className="fab fa-linkedin-in" />
          </a>
        </div> */}
      </form>
    </div>
  </div>
  <div className="panels-container">
    <div className="panel left-panel">
      <div className="loginContent">
        <h3>New here ?</h3>
        <p>
        Ready to ship with ease?
Sign up now and experience seamless freight management!

        </p>
        <button className="btn transparent" id="sign-up-btn" onClick={handleSignUp} >
          Sign up
        </button>
      </div>
      <img src="/assets/img/log.svg" className="image" alt="" />
    </div>
    <div className="panel right-panel">
      <div className="loginContent">
        <h3>One of us ?</h3>
        <p>
        Welcome aboard the kargada freight services!
Join us and experience seamless shipping like never before.
        </p>
        <button className="btn transparent" id="sign-in-btn" onClick={handleSignIn}>
          Sign in
        </button>
      </div>
      <img src="/assets/img/register.svg" className="image" alt="" />
    </div>
  </div>


  </div>
</>


    )
}

export default AdminLogin;