import {Routes, Route} from 'react-router-dom'
import AdminDashboardLayout from './layouts/AdminDashboardLayout'
import {AdminDashboard, Login, LiveTracking,TrackingTrips,
   MaintenanceList, AddMaintenance, Settings, LandingPage, AddFuel, FuelManagement} from './pages/adminPages/Components.js'
import Notfound from './pages/Notfound'

const App = () =>{


  return (
    <>
      <Routes>

     <Route element={<AdminDashboardLayout/>}>
        <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
        <Route path='/admin/maintenance/add' element={<AddMaintenance/>}/>
        <Route path='/admin/maintenance/list' element={<MaintenanceList/>}/>
        <Route path='/admin/settings' element={<Settings/>}/>
        <Route path='/admin/tracking/trips' element={<TrackingTrips/>}/>
        <Route path='/admin/tracking/live' element={<LiveTracking/>}/>
        <Route path='/admin/fuel/manage' element={<FuelManagement/>}/>
        <Route path='/admin/fuel/add' element={<AddFuel/>}/>
      </Route>
           <Route path='/' element={<LandingPage/>}/>
          <Route path='/login' element={<Login/>}/>
           <Route path='/*' element={<Notfound/>}/>
      </Routes>
    </>
  )
}

export default App
