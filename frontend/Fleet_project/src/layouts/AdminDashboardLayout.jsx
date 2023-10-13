import {Outlet, Link} from 'react-router-dom'
import '../../public/assets/css/adminLayout/dashboard.css'
import { useEffect, useState } from 'react';
import RiseLoader from "react-spinners/RiseLoader";

const AdminDashboardLayout = ()=>{
  const [driverDropdown, setDriverDropdown] = useState(false)
  const [vehicleDropdown, setVehicleDropdown] = useState(false)
  const [bookingDropdown, setBookingDropdown] = useState(false)
  const [customerDropdown, setCustomerDropdown] = useState(false)
  const [reminderDropdown, setReminderDropdown] = useState(false)
  const [trackingDropdown, setTrackingDropdown] = useState(false)
  const [reportsDropdown, setReportsDropdown] = useState(false)
  const [maintenanceDropdown, setMaintenanceDropdown] = useState(false)
  const [userDropdown, setUserDropdown] = useState(false)
  const [incomeExpenseDropdown, setIncomeExpenseDropdown] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const toggleDropdown = (e) => {
      switch(e.id) {
        case'drivers': setDriverDropdown(!driverDropdown) 
        break;
        case'vehicles': setVehicleDropdown(!vehicleDropdown) 
        break;
        case'bookings': setBookingDropdown(!bookingDropdown) 
        break;
        case'customers': setCustomerDropdown(!customerDropdown) 
        break;
        case'reminders': setReminderDropdown(!reminderDropdown) 
        break;
        case'tracking': setTrackingDropdown(!trackingDropdown) 
        break;
        case'reports': setReportsDropdown(!reportsDropdown) 
        break;
        case'users': setUserDropdown(!userDropdown) 
        break;
        case'ie': setIncomeExpenseDropdown(!incomeExpenseDropdown) 
        break;
        case'maintenance': setMaintenanceDropdown(!maintenanceDropdown) 
        break;
        default:null;
      }


  }

  const override = {
    display: "block",
    margin: "0 auto",
    position: "fixed"
  };
  

    useEffect(() => {
        // Function to handle side menu item clicks
        const handleSideMenuItemClick = (e) => {
          const sideLinks = document.querySelectorAll('.sidebar .side-menu  li a:not(.logout)');
          sideLinks.forEach((item) => item.parentElement.classList.remove('active'));
          e.target.parentElement.classList.add('active');
        };


    
        // Function to handle menu bar click
        const handleMenuBarClick = () => {
          const sideBar = document.querySelector('.sidebar');
          const sideMenu = document.querySelectorAll('#subMenu');
          
          // Toggle the 'close' class on the sidebar
          sideBar.classList.toggle('close');
        
          // Check if the sidebar is closed
          if (sideBar.classList.contains('close')) {
            sideMenu.forEach((menu) => {
              // Apply styles for smooth hiding
              menu.style.opacity = '0.5';
            });
          } else {
            sideMenu.forEach((menu) => {
              // Apply styles for smooth showing
              menu.style.opacity = '1';
            });
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

        // Function to handle window resize
        const handleWindowResize = () => {
          const sideBar = document.querySelector('.sidebar');
          if (window.innerWidth < 768) {
            sideBar.classList.add('close');
          } else {
            sideBar.classList.remove('close');
          }
    
          const searchForm = document.querySelector('.content nav form');
          const searchBtnIcon = document.querySelector('.content nav form .form-input button .bx');
          if (window.innerWidth > 576) {
            searchBtnIcon.classList.replace('bx-x', 'bx-search');
            searchForm.classList.remove('show');
          }
        };
    
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
        const sideLinks = document.querySelectorAll('.sidebar .side-menu li a:not(.logout)');
        sideLinks.forEach((item) => {
          item.addEventListener('click', handleSideMenuItemClick);
        });
    
        const menuBar = document.querySelector('.content nav .bx.bx-menu');
        menuBar.addEventListener('click', handleMenuBarClick);
    
        const searchBtn = document.querySelector('.content nav form .form-input button');
        searchBtn.addEventListener('click', handleSearchBtnClick);
    
        window.addEventListener('resize', handleWindowResize);
    
        const toggler = document.getElementById('theme-toggle');
        toggler.addEventListener('change', handleThemeToggle);
    
        // Clean up event listeners when the component unmounts
        return () => {
          sideLinks.forEach((item) => {
            item.removeEventListener('click', handleSideMenuItemClick);
          });
          menuBar.removeEventListener('click', handleMenuBarClick);
          searchBtn.removeEventListener('click', handleSearchBtnClick);
          window.removeEventListener('resize', handleWindowResize);
          toggler.removeEventListener('change', handleThemeToggle);
        };
      
      }, []); // Empty dependency array ensures this code runs only once, like componentDidMount
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
      
        <div className="sidebar">
    <Link to="/admin/dashboard" className="logo">
      <img src="/assets/img/kargada-logo.png" alt="Company Logo"/>
      <div className="logo-name">
        <span>Kar</span>gada
      </div>
    </Link>
    <ul className="side-menu">
      <li className='active'>
        <Link to="/admin/dashboard">
          <i className="bx bxs-dashboard" />
          Dashboard
        </Link>
      </li>
      <li>
        <Link to="/admin/availability">
        <i className='bx bx-calendar'></i>
          Availability
        </Link>
      </li>
      
      <li id='bookings' onClick={(e)=>{toggleDropdown(e.currentTarget)}}>
        <Link to="#">
        <i className='bx bx-book-reader'></i>
          Bookings
        </Link>
      </li>
      {bookingDropdown && (
        <>
      <li>
        <Link to="/admin/bookings/list" id='subMenu'> 
        Booking List
        </Link> 
      </li>
      <li >
      <Link to="/admin/bookings/add" id='subMenu'>
      Add Booking
      </Link> 
    </li>
    </>
    )
      } 
      <li id='drivers' onClick={(e)=>{toggleDropdown(e.currentTarget)}}>
        <Link to="#">
        <i className='bx bxs-id-card'></i>
          Drivers
        </Link>
      </li>
      {driverDropdown && (
        <>
      <li>
        <Link to="/admin/driver/list" id='subMenu'>
        Driver List
        </Link> 
      </li>
      <li>
      <Link to="/admin/driver/add" id='subMenu'>
      Add Driver
      </Link> 
    </li>
    </>
    )
      } 
      
      <li id='vehicles' onClick={(e)=>{toggleDropdown(e.currentTarget)}}>
        <Link to="#">
        <i className='bx bx-bus-school'></i>
          Vehicles
        </Link>
      </li>
      {
        vehicleDropdown && (<>
          <li>
        <Link to="/admin/vehicle/list"  id='subMenu'>
        Vehicle List
        </Link> 
      </li>
      <li>
        <Link to="/admin/vehicle/add"  id='subMenu'>
        Add Vehicle
        </Link> 
      </li>
      <li> 
        <Link to="/admin/vehicle/group"  id='subMenu'>
        Vehicle Group
        </Link> 
      </li>
        </>)
      }
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
      <li id='ie' onClick={(e)=>{toggleDropdown(e.currentTarget)}}>
        <Link to="#">
          <i className="bx bx-cog" />
          Income & Expense
        </Link>
      </li>
      {incomeExpenseDropdown && (
        <>
      <li >
        <Link to="/admin/incomeexpense/management" id='subMenu'>
         IE Management
        </Link> 
      </li>
      <li >
      <Link to="/admin/incomeexpense/add" id='subMenu'>
      Add IE
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
      <li >
        <Link to="/admin/tracking/history" id='subMenu'>
        History Tracking
        </Link> 
      </li>
      <li >
      <Link to="/admin/tracking/live" id='subMenu'>
      Live Tracking
      </Link> 
    </li>
    </>
    )
      } 
      <li id='reminders' onClick={(e)=>{toggleDropdown(e.currentTarget)}}>
        <Link to="#">
        <i className='bx bxs-bell'></i>
          Reminders
        </Link>
      </li>
      {reminderDropdown && (
        <>
      <li>
        <Link to="/admin/reminder/management"  id='subMenu'>
        Reminders Panel
        </Link> 
      </li>
      <li>
      <Link to="/admin/reminder/add" id='subMenu'>
      Add Reminders
      </Link> 
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
      <li id='reports' onClick={(e)=>{toggleDropdown(e.currentTarget)}}>
        <Link to="#">
        <i className='bx bx-message-dots'></i>
          Reports
        </Link>
      </li>
      {reportsDropdown && (
        <>
      <li>
        <Link to="/admin/report/list" id='subMenu'>
        Reports List
        </Link> 
      </li>
      <li>
      <Link to="/admin/report/add" id='subMenu'>
      Add Reports
      </Link> 
    </li>
    </>
    )
      } 
      <li id='users' onClick={(e)=>{toggleDropdown(e.currentTarget)}}>
        <Link to="#">
        <i className='bx bxs-group'></i>
          Users
        </Link>
      </li>
      {userDropdown && (
        <>
      <li>
        <Link to="/admin/users/management" id='subMenu'>
        User Panel
        </Link> 
      </li>
      <li>
      <Link to="/admin/users/add" id='subMenu'>
      Add User
      </Link> 
    </li>
    </>
    )
      } 
      <li id='customers' onClick={(e)=>{toggleDropdown(e.currentTarget)}}>
        <Link to="#">
        <i className='bx bx-user-check' ></i>
          Customers
        </Link>
      </li>
      {customerDropdown && (
        <>
      <li>
        <Link to="/admin/customers/management" id='subMenu'>
        Customer Panel
        </Link> 
      </li>
      <li>
      <Link to="/admin/customers/add" id='subMenu'>
      Add Customer
      </Link> 
    </li>
    </>
    )
      } 
    </ul>
    <ul className="side-menu">
      <li>
        <Link to="/admin/login" className="logout">
          <i className="bx bx-log-out-circle" />
          Logout
        </Link>
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
      <input type="checkbox" id="theme-toggle" hidden="" />
      <label htmlFor="theme-toggle" className="theme-toggle" />
      <a href="#" className="notif">
        <i className="bx bx-bell" />
        <span className="count">12</span>
      </a>
      <a href="#" className="profile">
        <img src="/assets/img/prof-pic.jpg" />
      </a>
    </nav>
    {/* End of Navbar */}
    <main>
         <Outlet context={[isLoading, setIsLoading]}/>

    </main>
  </div>
               
             
        </>
    )
}

export default AdminDashboardLayout;