import {Routes, Route} from 'react-router-dom'
import AdminDashboardLayout from './layouts/AdminDashboardLayout'
import CustomerDashboard from './pages/customerPages/CutomerDashboard'
import {AdminDashboard, Login, Availability, AddBookings, BookingList, AddCustomer, CustomerManagement,
   AddDriver, DriversList, LiveTracking, HistoryTracking,
 AddIncomeexpense, IeManagement, VehicleGroup, VehicleList, AddVehicle, ReportList, AddReport, AddUser, UserPanel,
   MaintenanceList, AddMaintenance, AddReminder, ReminderPanel, Settings, LandingPage} from './pages/adminPages/Components.js'
import Notfound from './pages/Notfound'

const App = () =>{


  return (
    <>
      <Routes>

     <Route element={<AdminDashboardLayout/>}>
        <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
        <Route path='/admin/availability' element={<Availability/>}/>
        <Route path='/admin/bookings/add' element={<AddBookings/>}/>
        <Route path='/admin/bookings/list' element={<BookingList/>}/>
        <Route path='/admin/customers/management' element={<CustomerManagement/>}/>
        <Route path='/admin/customers/add' element={<AddCustomer/>}/>
        <Route path='/admin/driver/add' element={<AddDriver/>}/>
        <Route path='/admin/driver/list' element={<DriversList/>}/>
        <Route path='/admin/incomeexpense/add' element={<AddIncomeexpense/>}/>
        <Route path='/admin/incomeexpense/management' element={<IeManagement/>}/>
        <Route path='/admin/maintenance/add' element={<AddMaintenance/>}/>
        <Route path='/admin/maintenance/list' element={<MaintenanceList/>}/>
        <Route path='/admin/reminder/management' element={<ReminderPanel/>}/>
        <Route path='/admin/reminder/add' element={<AddReminder/>}/>
        <Route path='/admin/report/list' element={<ReportList/>}/>
        <Route path='/admin/report/add' element={<AddReport/>}/>
        <Route path='/admin/settings' element={<Settings/>}/>
        <Route path='/admin/tracking/live' element={<LiveTracking/>}/>
        <Route path='/admin/tracking/history' element={<HistoryTracking/>}/>
        <Route path='/admin/users/add' element={<AddUser/>}/>
        <Route path='/admin/users/management' element={<UserPanel/>}/>
        <Route path='/admin/vehicle/add' element={<AddVehicle/>}/>
        <Route path='/admin/vehicle/list' element={<VehicleList/>}/>
        <Route path='/admin/vehicle/group' element={<VehicleGroup/>}/>
       
      </Route>
           <Route path='/' element={<LandingPage/>}/>
          <Route path='/login' element={<Login/>}/>
           <Route path='/*' element={<Notfound/>}/>
      </Routes>
    </>
  )
}

export default App
