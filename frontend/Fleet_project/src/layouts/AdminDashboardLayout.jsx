import {Outlet, Link} from 'react-router-dom'
import '../assets/css/adminLayout/dashboard.css'
import { useEffect } from 'react';
const AdminDashboardLayout = ()=>{

    useEffect(() => {
        // Function to handle side menu item clicks
        const handleSideMenuItemClick = (e) => {
          const sideLinks = document.querySelectorAll('.sidebar .side-menu li a:not(.logout)');
          sideLinks.forEach((item) => item.parentElement.classList.remove('active'));
          e.target.parentElement.classList.add('active');
        };
    
        // Function to handle menu bar click
        const handleMenuBarClick = () => {
          const sideBar = document.querySelector('.sidebar');
          sideBar.classList.toggle('close');
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
        <div className="sidebar">
    <Link to="/admin/dashboard" className="logo">
      <img src="/assets/img/kargada-logo.png" alt="Company Logo"/>
      <div className="logo-name">
        <span>Kar</span>gada
      </div>
    </Link>
    <ul className="side-menu">
      <li>
        <Link to="/admin/dashboard">
          <i className="bx bxs-dashboard" />
          Dashboard
        </Link>
      </li>
      <li>
        <Link to="/admin/availability">
        <i class='bx bx-calendar'></i>
          Availability
        </Link>
      </li>
      <li>
        <Link to="/admin/bookings">
        <i class='bx bx-book-reader'></i>
          Bookings
        </Link>
      </li>
      <li className="active">
        <Link to="/admin/drivers">
        <i class='bx bxs-id-card'></i>
          Drivers
        </Link>
      </li>
      <li>
        <Link to="/admin/vehicles">
        <i class='bx bx-bus-school'></i>
          Vehicles
        </Link>
      </li>
      <li>
        <Link to="/admin/maintenance">
        <i class='bx bx-wrench'></i>
          Maintenance
        </Link>
      </li>
      <li>
        <Link to="/admin/incomeexpense">
          <i className="bx bx-cog" />
          Income & Expense
        </Link>
      </li>
      <li>
        <Link to="/admin/tracking">
        <i class='bx bx-navigation'></i>
          Tracking
        </Link>
      </li>
      <li>
        <Link to="/admin/reminders">
        <i class='bx bxs-bell'></i>
          Reminders
        </Link>
      </li>
      <li>
        <Link to="/admin/settings">
          <i className="bx bx-cog" />
          Settings
        </Link>
      </li>
      <li>
        <Link to="/admin/reports">
        <i class='bx bx-message-dots'></i>
          Reports
        </Link>
      </li>
      <li>
        <Link to="/admin/users">
        <i class='bx bxs-group'></i>
          Users
        </Link>
      </li>
      <li>
        <Link to="/admin/customers">
        <i class='bx bx-user-check' ></i>
          Customers
        </Link>
      </li>
      
    </ul>
    <ul className="side-menu">
      <li>
        <Link to="#" className="logout">
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
      <img src="" alt="" />
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
         <Outlet/>

    </main>
  </div>
               
             
        </>
    )
}

export default AdminDashboardLayout;