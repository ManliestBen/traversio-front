// npm modules
import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

// pages
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import Profiles from './pages/Profiles/Profiles'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import ResetPassword from './pages/ResetPassword/ResetPassword'
import Properties from './pages/Properties/Properties'
import NewProperty from './pages/NewProperty/NewProperty'
import PropertyDetails from './pages/PropertyDetails/PropertyDetails'
import ProfileDetails from './pages/ProfileDetails/ProfileDetails'
import NewTrip from './pages/NewTrip/NewTrip'

// components
import NavBar from './components/NavBar/NavBar'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

// services
import * as authService from './services/authService'

// styles
import './App.css'

// Build profile details page (should work for self or others, conditionally)
  // list trips
// add a trip (button on PropertyDetails)
  // build a NewTrip page

function App() {
  const [user, setUser] = useState(authService.getUser())
  const navigate = useNavigate()

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleAuthEvt = () => {
    setUser(authService.getUser())
  }

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Landing user={user} />} />
        <Route
          path="/profiles"
          element={
            <ProtectedRoute user={user}>
              <Profiles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profiles/:profileId"
          element={
            <ProtectedRoute user={user}>
              <ProfileDetails user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/properties"
          element={
            <ProtectedRoute user={user}>
              <Properties />
            </ProtectedRoute>
          }
        />
        <Route
          path="/properties/:propertyId"
          element={
            <ProtectedRoute user={user}>
              <PropertyDetails user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/properties/:propertyId/newTrip"
          element={
            <ProtectedRoute user={user}>
              <NewTrip user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/properties/new"
          element={
            <ProtectedRoute user={user}>
              <NewProperty />
            </ProtectedRoute>
          }
        />
        <Route
          path="/auth/signup"
          element={<Signup handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path="/auth/login"
          element={<Login handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path="/auth/change-password"
          element={
            <ChangePassword handleAuthEvt={handleAuthEvt} />
          }
        />
        <Route
          path="/auth/reset-password"
          element={
            <ResetPassword handleAuthEvt={handleAuthEvt} />
          }
        />
      </Routes>
    </>
  )
}

export default App
