import React, { useState, useEffect } from 'react'
import { useBus } from './components/hooks/useBus'
import { Routes, Route, useLocation } from 'react-router-dom'
import {
  Deposit,
  Login,
  Onboarding,
  Register,
  Profile,
  NewCard,
  Dashboard,
  BusList,
  ToBook,
  Reservation,
  BookingConfirmation
} from './components/pages'
import { Navbar, Load, NavbarDashboard } from './components'
import './App.css'

function App() {
  const { getBusRoutes } = useBus()
  const [busRoutes, setBusRoutes] = useState()

  useEffect(() => {
    const fetchData = async () => {
      const response = await getBusRoutes()
      if (response.length > 0) {
        setBusRoutes(response)
      }
      console.log({ response })
    }

    fetchData()
  }, [])

  let location = useLocation()

  const Admin = () => (
    <React.Fragment>
      <NavbarDashboard />
      <Dashboard />
    </React.Fragment>
  )

  return (
    <div className="App">
      {
        location.pathname !== '/login' && location.pathname !== '/register' && location.pathname !== '/admin/dashboard' && <Navbar />
      }
      <Routes>
        <Route path='/' element={<Onboarding data={busRoutes} />} />
        <Route path='/deposit' element={<Deposit />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/add-card' element={<NewCard />} />
        <Route path='/bus-schedules-results' element={<BusList />} />
        <Route path='/bus-schedules-results/book' element={<ToBook />} />
        <Route path='/reservations' element={<Reservation />} />
        <Route path='/booking-confirmation' element={<BookingConfirmation />} />

        <Route path='/admin/dashboard' element={<Admin />} />
      </Routes>
    </div>
  )
}

export default App