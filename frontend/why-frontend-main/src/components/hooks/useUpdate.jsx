import { useState } from 'react'
import { useToast } from '@chakra-ui/react'

export const useUpdate = () => {

  const toast = useToast()
  const [error, setError] = useState(null)
  const [status, setStatus] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const _url = 'https://voucher-system-gen.herokuapp.com'

  const update = async (firstName, lastName, email, phoneNumber, token) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch(`${_url}/api/user/update-profile`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, email, phoneNumber, token })
    }).catch((err) => {
      console.log(err)
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
      toast({
        title: 'Error',
        description: json.error,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }

    if (response.ok) {
      setIsLoading(false)
      const newUser = await JSON.parse(sessionStorage.getItem('user'))
        newUser.firstName = firstName,
        newUser.lastName = lastName,
        newUser.phoneNumber = phoneNumber

      sessionStorage.setItem('user', JSON.stringify(newUser))
      toast({
        title: 'Updated 😎.',
        description: "Personal details updated successfully!",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  return { update, isLoading, error, status }
}