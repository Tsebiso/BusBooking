import { useState, useEffect } from 'react'
import { useAuthContext } from './useAuthContext'
import { useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

export const Bookings = () => {
  const toast = useToast()
  const { user } = useAuthContext()
  const [error, setError] = useState()
  const navigate = useNavigate()
  const [isBooking, setIsBooking] = useState(null)
  const _url = 'https://voucher-system-gen.herokuapp.com'
  // const _url = 'http://localhost:8080'

  const reservation = async (bus_id, busname, route, seat, fare, departure) => {
    setError(null)
    setIsBooking(true)
    const token = user.token
    const email = user.email

    console.log(`bus_id: ${bus_id}, busname: ${busname}, route: ${route}, seat: ${seat}, fare: ${fare}, departure: ${departure}`)

    const response = await fetch(`${_url}/api/booking/record-booking`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bus_id, busname, route, seat, fare, departure, token })
    }).catch((err) => {
      console.log(err)
    })

    const res = await response.json()

    if (!response.ok) {
      setIsBooking(false)
      setError(res.error)
      toast({
        title: 'Ops! Error',
        description: `This is an HTTP error: The status is ${response.status}`,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }

    if (response.ok) {
      await deductFromAccount(fare, token)
      setIsBooking(false)
      toast({
        title: 'Success',
        description: "Check your email for a booking confirmation. We'll see you soon!",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      sendEmail(email)
      navigate('/booking-confirmation')
    }

  }

  const deductFromAccount = async (fare) => {
    setError(null)
    setIsBooking(true)
    const amount = fare
    const token = user.token

    const response = await fetch(`${_url}/api/account/deduct`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fare, token })
    }).catch((err) => {
      console.log(err)
    })

    const res = await response.json()

    if (!response.ok) {
      setIsBooking(false)
      setError(res.error)
    }

    if (response.ok) {
      setIsBooking(false)
      await recordTransactionType(amount, token)
      const account = await JSON.parse(sessionStorage.getItem('account'))
      account.balance = res.newBalance
      sessionStorage.setItem('account', JSON.stringify(account))
    }
  }

  const getUserBookings = async () => {
    setError(null)
    setIsBooking(true)
    const _id = user._id

    const response = await fetch(`${_url}/api/booking/current-user/${_id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }).catch((err) => {
      console.log(err)
    })

    const res = await response.json()

    if (!response.ok) {
      setIsBooking(false)
      setError(json.error)
    }

    if (response.ok) {
      setIsBooking(false)
      return res
    }
  }

  const updateBookingStatus = async (bookingno, bus_id) => {
    setError(null)
    setIsBooking(true)
    const token = user.token

    const response = await fetch(`${_url}/api/booking/booking-status`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookingno, token })
    }).catch((err) => {
      console.log(err)
    })

    const res = await response.json()

    if (!response.ok) {
      setIsBooking(false)
      setError(response.error)
    }

    if (response.ok) {
      await updateBusKilometer(bus_id)
      setIsBooking(false)
      return res
    }
  }

  const updateBusKilometer = async (bus_id) => {
    setError(null)
    setIsBooking(true)

    const response = await fetch(`${_url}/api/bus/update-table`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bus_id })
    }).catch((err) => {
      console.log(err)
    })

    const res = await response.json()

    if (!response.ok) {
      setIsBooking(false)
      setError(response.error)
    }

    if (response.ok) {
      setIsBooking(false)
      console.log({ res })
    }
  }

  const recordTransactionType = async (amount, token) => {
    setError(null)
    setIsBooking(true)

    const response = await fetch(`${_url}/api/deposits/debit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, token })
    }).catch((err) => {
      console.log(err)
    })

    const res = await response.json()

    if (!response.ok) {
      setIsBooking(false)
      setError(res.error)
    }

    if (response.ok) {
      setIsBooking(false)
      toast({
        title: 'Success',
        description: res.msg,
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
    }
  }

  const sendEmail = async (email) => {
    setError(null)

    const response = await fetch(`${_url}/send/mail`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    }).catch((err) => {
      console.log(err)
    })

    const res = await response.json()

    if (!response.ok) {
      setIsBooking(false)
      setError(res.error)
    }

    if (response.ok) {
      setIsBooking(false)
    }
  }

  return { reservation, getUserBookings, updateBookingStatus, isBooking, error }
}