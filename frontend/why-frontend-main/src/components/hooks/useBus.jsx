import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { useNavigate, useLocation } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'

export const useBus = () => {

  const { user } = useAuthContext()
  const toast = useToast()
  const location = useLocation()
  const navigate = useNavigate()
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const [loading, setLoading] = useState(null)
  const _url = 'https://voucher-system-gen.herokuapp.com'
  // const _url = 'http://localhost:8080'

  // INSERT INTO BUS TABLE
  const insertIntoBus = async (busName, origin, destination, depart, arrive, fare) => {
    setLoading(true)
    setError(null)
    const token = user.token

    const response = await fetch(`${_url}/api/bus/insert-buses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ busName, origin, destination, depart, arrive, fare, token })
    }).catch((err) => {
      console.log(err)
    })

    const json = await response.json()

    if (!response.ok) {
      setLoading(false)
      setError(json.error)
    }

    if (response.ok) {
      setLoading(false)
      toast({
        title: 'added.',
        description: "Bus added successfully, Enjoy 😃",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  // SEARCH FOR BUS
  const searchForBusRoute = async (origin, destination, date) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch(`${_url}/api/route/search-route/${origin}/${destination}/${date}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }).catch((err) => {
      console.log(err)
    })
    const results = await response.json()
    console.log({ date })

    if (!response.ok) {
      setIsLoading(false)
      toast({
        title: 'Error',
        description: results.error,
        status: 'error',
        duration: 6000,
        isClosable: true,
      })
    }

    if (response.ok) {
      setIsLoading(false)
      navigate('/bus-schedules-results', { state: results })
    }
  }

  const getBusRoutes = async () => {
    setIsLoading(true)
    setError(null)

    const response = await fetch(`${_url}/api/route/routes`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }).catch((err) => {
      console.log(err)
    })
    const res = await response.json()
    console.log('all bus routes: ', res)

    if (!response.ok) {
      setIsLoading(false)
      setError(buses.error)
    }

    if (response.ok) {
      setIsLoading(false)
      return res
    }
  }

  return { insertIntoBus, searchForBusRoute, getBusRoutes, isLoading, loading, error, message }
}