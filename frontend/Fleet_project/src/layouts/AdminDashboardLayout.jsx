import {Outlet, Link, useNavigate} from 'react-router-dom'
import '../../public/assets/css/adminLayout/dashboard.css'
import { useEffect, useState } from 'react';
import RiseLoader from "react-spinners/RiseLoader";
import axios from 'axios';
const AdminDashboardLayout = ()=>{
  axios.defaults.withCredentials = true;
  const hostServer = import.meta.env.VITE_SERVER_HOST
  const nav = useNavigate(null)
  const [trackingDropdown, setTrackingDropdown] = useState(false)
  const [maintenanceDropdown, setMaintenanceDropdown] = useState(false)
  const [fuel, setFuel] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isAuth, setIsAuth] = useState(false)
  const [user, setUser] = useState(null)
  const [authError, setAuthError] = useState(null)
  const [mapStyle, setMapStyle] = useState('streets-v12')
  const toggleDropdown = (e) => {
      switch(e.id) {
        case'tracking': setTrackingDropdown(!trackingDropdown) 
        break;
        case'maintenance': setMaintenanceDropdown(!maintenanceDropdown) 
        break;
        case "fuel" : setFuel(!fuel)
        default:null;
      }


  }

  const override = {
    display: "block",
    margin: "0 auto",
    position: "fixed"
  };
  

  const checkAuthentication = async () => {

    try {
      const result = await axios.get(`${hostServer}/homeAuthentication`)
      if(result.data.message){
        setAuthError(result.data.message)
        nav("/login")
      }else{
        const userData = result.data
        setIsAuth(true);
        setUser(userData.authData.user[0])
      }
    } catch (error) {
      setAuthError("Cannot fetch, Internal server is down!")
    }
 

  }

  const handleLogout = async () => 
  {   
    try {
      setIsLoading(true)
      await axios.delete(`${hostServer}/logout`);
      setIsLoading(false)
      nav("/login")
    } catch (error) {
      console.log(error)
    }
  
  }
  useEffect(()=>
  {
    checkAuthentication()
  }, [])


    useEffect(() => {
        // Function to handle side menu item clicks
        const handleSideMenuItemClick = (e) => {
          const sideLinks = document.querySelectorAll('.adminSidebar .side-menu  li a:not(.logout)');
          sideLinks.forEach((item) => item.parentElement.classList.remove('active'));
          e.target.parentElement.classList.add('active');
        };


    
        // Function to handle menu bar click
        const handleMenuBarClick = () => {
          const adminSidebar = document.querySelector('.adminSidebar');
          const sideMenu = document.querySelectorAll('#subMenu');
          
          // Toggle the 'close' class on the adminSidebar
          adminSidebar.classList.toggle('close');
        
          // Check if the adminSidebar is closed
          if (adminSidebar.classList.contains('close')) {
            sideMenu.forEach((menu) => {
              // Apply styles for smooth hiding
              menu.style.opacity = '0.5';
            });
            adminSidebar.style.display = "none"
          } else {
            sideMenu.forEach((menu) => {
              // Apply styles for smooth showing
              menu.style.opacity = '1';
            });
            adminSidebar.style.display = "block"
          }
        };
        
    
        // Function to handle search button click
        const handleSearchBtnClick = (e) => {
          if (window.innerWidth < 576) {
            e.preventDefault(); // Fixed a missing function call 'preventDefault'
            const searchForm = document.querySelector('.content nav form');
            searchForm.classList.toggle('show');
            const searchBtnIcon = document.querySelector('.content nav form .form-input button .bx');
            if (searchForm.classList.contains('show')) {
              searchBtnIcon.classList.replace('bx-search', 'bx-x');
            } else {
              searchBtnIcon.classList.replace('bx-x', 'bx-search');
            }
          }
        };

        // // Function to handle window resize
        // const handleWindowResize = () => {
        //   const adminSidebar = document.querySelector('.adminSidebar');
        //   if (window.innerWidth < 768) {
        //     adminSidebar.classList.add('close');
        //   } else {
        //     adminSidebar.classList.remove('close');
        //   }
    
        //   const searchForm = document.querySelector('.content nav form');
        //   const searchBtnIcon = document.querySelector('.content nav form .form-input button .bx');
        //   if (window.innerWidth > 576) {
        //     searchBtnIcon.classList.replace('bx-x', 'bx-search');
        //     searchForm.classList.remove('show');
        //   }
        // };
    
        // Function to handle theme toggle
        const handleThemeToggle = () => {
          const toggler = document.getElementById('theme-toggle');
          if (toggler.checked) {
            document.body.classList.add('dark');
          } else {
            document.body.classList.remove('dark');
          }
        };
    
        // Attach event listeners
        const sideLinks = document.querySelectorAll('.adminSidebar .side-menu li a:not(.logout)');
        sideLinks.forEach((item) => {
          item.addEventListener('click', handleSideMenuItemClick);
        });
    
        const menuBar = document.querySelector('.content nav .bx.bx-menu');
        menuBar.addEventListener('click', handleMenuBarClick);
    
        const searchBtn = document.querySelector('.content nav form .form-input button');
        searchBtn.addEventListener('click', handleSearchBtnClick);
    
        // window.addEventListener('resize', handleWindowResize);
    
        const toggler = document.getElementById('theme-toggle');
        toggler.addEventListener('change', handleThemeToggle);
    
        // Clean up event listeners when the component unmounts
        return () => {
          sideLinks.forEach((item) => {
            item.removeEventListener('click', handleSideMenuItemClick);
          });
          menuBar.removeEventListener('click', handleMenuBarClick);
          searchBtn.removeEventListener('click', handleSearchBtnClick);
          // window.removeEventListener('resize', handleWindowResize);
          toggler.removeEventListener('change', handleThemeToggle);
        };
      
      }, []); // Empty dependency array ensures this code runs only once, like componentDidMount

      const setMapTheme = () => 
      {

        setTimeout(()=>{
          if(mapStyle == 'streets-v12')
          {
            setMapStyle('navigation-night-v1')
          }else{
            setMapStyle('streets-v12')
          }
        }, 100)
     
      }
    return(


       <div className='DashboardLayout'>

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
       <noscript>You need to enable JavaScript to run this app.</noscript>
        <div className="adminSidebar close">
    <a href="/admin/dashboard" className="logo">
      <img src="/assets/img/kargada-logo.png" alt="Company Logo"/>
      <div className="logo-name">
        <span>Kar</span>gada
      </div>
    </a>
    <ul className="side-menu">
      <li>
        <Link to="/admin/dashboard">
          <i className="bx bxs-dashboard" />
          Dashboard
        </Link>
      </li>
      
      
      <li id='maintenance' onClick={(e)=>{toggleDropdown(e.currentTarget)}}>
        <Link to="#">
        <i className='bx bx-wrench'></i>
          Maintenance
        </Link>
      </li>
      {maintenanceDropdown && (
        <>
      <li>
        <Link to="/admin/maintenance/list"  id='subMenu'>
        Maintenance List
        </Link> 
      </li >
      <li >
      <Link to="/admin/maintenance/add" id='subMenu'>
      Add Maintenance
      </Link> 
    </li>
    </>
    )
      } 
        <li id='fuel' onClick={(e)=>{toggleDropdown(e.currentTarget)}}>
        <Link to="#">
        <i className='bx bx-gas-pump'></i>
          Fuel
        </Link>
      </li>
      {
        fuel && (
          <>
          <li>
            <Link to="/admin/fuel/manage"  id='subMenu'>
            Fuel Management
            </Link> 
          </li >
          <li >
          <Link to="/admin/fuel/add" id='subMenu'>
          Add Fuel
          </Link> 
        </li>
        </>
        )
      }
      <li id='tracking' onClick={(e)=>{toggleDropdown(e.currentTarget)}}>
        <Link to="#">
        <i className='bx bx-navigation'></i>
          Tracking
        </Link>
      </li>
      {trackingDropdown && (
        <>
      {/* <li >
        <a href="/admin/tracking/history" id='subMenu'>
        History Tracking
        </a> 
      </li> */}
      <li >
      <a href="/admin/tracking/live" id='subMenu'>
      Live Tracking
      </a> 
    </li>
    </>
    )
      } 
      <li onClick={(e)=>{toggleDropdown(e.currentTarget)}}>
        <Link to="/admin/settings">
          <i className="bx bx-cog" />
          Settings
        </Link>
      </li>
    </ul>
    <ul className="side-menu">
      <li onClick={handleLogout} style={{cursor:"pointer"}}>
        <a className="logout">
          <i className="bx bx-log-out-circle" />
          Logout
        </a>
      </li>
    </ul>
  </div>
                
  {/* Main Content */}
  <div className="content">
    {/* Navbar */}
    <nav>
      <i className="bx bx-menu" />
      <form action="#">
        <div className="form-input">
          <input type="search" placeholder="Search..." />
          <button className="search-btn" type="submit">
            <i className="bx bx-search" />
          </button>
        </div>
      </form>
      <input type="checkbox" id="theme-toggle" hidden="" onClick={setMapTheme}/>
      <label htmlFor="theme-toggle" className="theme-toggle" onClick={setMapTheme} />
      <a href="#" className="profile">
        <img src="/assets/img/prof-pic.jpg" />
      </a>
    </nav>
    {/* End of Navbar */}
    <main>
         <Outlet context={{isLoading, setIsLoading, ...user, mapStyle, setMapStyle}}/>

    </main>
  </div>
               
             
        </div>
    )
}

export default AdminDashboardLayout;