import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'
import { useSignout } from './useSignout'

export const useDeleteAccont = () => {
  const navigate = useNavigate()
  const { user } = useAuthContext()
  const { signout } = useSignout()
  const [error, setError] = useState(null)
  const [isDeleting, setIsDeleting] = useState(null)
  const { dispatch } = useAuthContext()
  const toast = useToast()
  const _url = 'https://voucher-system-gen.herokuapp.com'
  // const _url = 'http://localhost:8080'


  const deleteAccount = async () => {
    setIsDeleting(true)
    setError(null)
    const _id = user._id

    const response = await fetch(`${_url}/api/user/delete-account/${_id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    }).catch((err) => {
      console.log(err)
    })
    const json = await response.json()

    if (!response.ok) {
      setIsDeleting(false)
      setError(json.error)
    }

    if (response.ok) {
      setIsDeleting(false)
      signout()
      toast({
        title: 'SAD TO SEE YOU GO 😔',
        description: json.msg,
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  return { deleteAccount, isDeleting, error }
}