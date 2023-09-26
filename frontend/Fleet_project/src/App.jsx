import {Routes, Route} from 'react-router-dom'
import AdminDashboardLayout from './layouts/AdminDashboardLayout'

import CustomerLogin from './pages/customerPages/CustomerLogin'
import CustomerRegister from './pages/customerPages/CustomerRegister'
import CustomerDashboard from './pages/customerPages/CutomerDashboard'
import {AdminDashboard, AdminLogin, Availability, Bookings, Customers, Drivers, Incomeexpense,
   Maintenance, Reminders, Reports, Settings, Tracking, Users, Vehicles} from './pages/adminPages/Components.js'
import Notfound from './pages/Notfound'

const App = () =>{


  return (
    <>
      <Routes>

     <Route element={<AdminDashboardLayout/>}>
        <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
        <Route path='/admin/availability' element={<Availability/>}/>
        <Route path='/admin/bookings' element={<Bookings/>}/>
        <Route path='/admin/customers' element={<Customers/>}/>
        <Route path='/admin/drivers' element={<Drivers/>}/>
        <Route path='/admin/incomeexpense' element={<Incomeexpense/>}/>
        <Route path='/admin/maintenance' element={<Maintenance/>}/>
        <Route path='/admin/reminders' element={<Reminders/>}/>
        <Route path='/admin/reports' element={<Reports/>}/>
        <Route path='/admin/settings' element={<Settings/>}/>
        <Route path='/admin/tracking' element={<Tracking/>}/>
        <Route path='/admin/users' element={<Users/>}/>
        <Route path='/admin/vehicles' element={<Vehicles/>}/>
      </Route>
           <Route path='/Login' element={<CustomerLogin/>}/>
          <Route path='/register' element={<CustomerRegister/>}/>
          <Route path='/admin/login' element={<AdminLogin/>}/>
           <Route path='/*' element={<Notfound/>}/>
      </Routes>
    </>
  )
}

export default App
