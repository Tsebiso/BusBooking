import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { useCreditCard } from '../hooks/useCreditCard'
import { useSignout } from '../hooks/useSignout'
import { FaUserAlt, FaCreditCard, FaSignOutAlt } from 'react-icons/fa'
import { Load } from '../'
import './organisms.css'
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  ModalFooter,
  VStack,
  StackDivider,
  ListItem,
  ListIcon,
  List
} from '@chakra-ui/react'

const Navbar = () => {

  let navigate = useNavigate()
  const [balance, setBalance] = useState('0.00')
  const account = JSON.parse(sessionStorage.getItem('account'))

  const { signout } = useSignout()
  const { user } = useAuthContext()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { checkCreditCard, getUserAccountBalance, isLoading } = useCreditCard()

  const handleSignout = () => {
    signout()
    onClose()
    navigate('/login')
  }

  const toggleModal = () => {
    onOpen()
  }

  const goToProfile = () => {
    onClose()
    navigate('/profile')
  }

  const reservations = async () => {
    navigate('/reservations')
    onClose()
  }

  // delay useeffect
  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  )

  useEffect(() => {
    const getAvailableAmount = async () => {
      console.log('before')
      await delay(1000)

      const user = await JSON.parse(sessionStorage.getItem('user'))
      if (user) {
        const temp = parseInt(account.balance)
        if (temp) {
          setBalance(temp)
        }
        const customerId = user._id
        const response = await getUserAccountBalance(customerId)
        if (response) {
          setBalance(response.balance)
        }
      }
    }

    getAvailableAmount()
  }, [])

  // CHECK CARD IF EXISTS
  const fetchCard = async () => {
    const _id = await user._id
    onClose()

    const response = await checkCreditCard(_id)
    const isEmpty = Object.keys(response).length === 0
    if (isEmpty === false) {
      navigate('/deposit', { state: response })
    } else {
      navigate('/add-card')
    }
  }

  return (
    <nav className='navbar fixed-top-nav'>
      {isLoading ? <Load /> : null}
      <p className='navbar__logo' onClick={() => navigate(`/`)}>Bus Booking</p>
      {!user && (
        <div className='navbar__content'>
          <Button colorScheme='teal' onClick={() => navigate(`/login`)}>
            Login
          </Button>
        </div>
      )}

      {user && (
        <div className='navbar__content'>
          <Button onClick={fetchCard} colorScheme='teal'>
            Deposit
          </Button>
          <div className='navbar__content-user' onClick={toggleModal}>
            <span><FaUserAlt /></span>
            {parseInt(account.balance) ? <p className='balance'>R {parseInt(account.balance)}</p> :
              <p className='balance'>R {balance}</p>}
          </div>
        </div>
      )}

      <Modal onClose={onClose} size='xl' isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader background='teal' color='white'>
            Menu
          </ModalHeader>
          <ModalCloseButton color='white' />
          <ModalBody mt={4}>
            <VStack
              divider={<StackDivider borderColor='teal' />}
              spacing={4}
              align='stretch'
            >
              <List onClick={goToProfile} style={{ cursor: "pointer" }}>
                <ListItem>
                  <ListIcon as={FaUserAlt} color='teal' />
                  My Account
                </ListItem>
              </List>

              <List onClick={reservations} style={{ cursor: "pointer" }}>
                <ListItem>
                  <ListIcon as={FaCreditCard} color='teal' />
                  Reservation
                </ListItem>
              </List>

              <List onClick={handleSignout} style={{ cursor: "pointer" }}>
                <ListItem>
                  <ListIcon as={FaSignOutAlt} color='teal' />
                  Logout
                </ListItem>
              </List>

              <Button colorScheme='teal' onClick={fetchCard}>
                Deposit
              </Button>

            </VStack>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </nav>
  )
}

export default Navbar