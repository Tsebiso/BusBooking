import { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'

export const useReport = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const _url = 'https://voucher-system-gen.herokuapp.com'
  // const _url = 'http://localhost:8080'

  const busRouteReport = async () => {
    setIsLoading(true)
    setError(null)

    const response = await fetch(`${_url}/api/admin/route-report`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }).catch((err) => {
      console.log(err)
    })
    const res = await response.json()
    console.log({res})

    if (!response.ok) {
      setIsLoading(false)
    }

    if (response.ok) {
      setIsLoading(false)
      return res
    }
  }

  return { busRouteReport, isLoading, error }
}
