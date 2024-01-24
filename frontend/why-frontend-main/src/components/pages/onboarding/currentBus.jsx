import {
  Box,
  Button,
  Heading,
  Icon,
  Stack,
  StackDivider,
  Text,
  VStack,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure
} from '@chakra-ui/react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { Bookings } from '../../hooks/useBooking'
import { useCreditCard } from '../../hooks/useCreditCard'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { useLocation, useNavigate } from 'react-router-dom'
import { BiCurrentLocation } from 'react-icons/bi'
import { HiLocationMarker } from 'react-icons/hi'
import { BsFillClockFill } from 'react-icons/bs'
import { FaBus, FaMoneyCheckAlt } from 'react-icons/fa'
import React, { useState } from 'react'

const ToBook = () => {

  const { user } = useAuthContext()
  const { state } = useLocation()
  console.log({ state })
  const navigate = useNavigate()
  const [isTrigger, setIsTrigger] = useState(false)
  const { checkCreditCard, isLoading } = useCreditCard()
  const { reservation, isBooking, error } = Bookings()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()
  const account = JSON.parse(sessionStorage.getItem('account'))
  const balance = parseInt(account.balance)

  const fetchCard = async () => {
    const _id = await user._id

    const response = await checkCreditCard(_id)
    const isEmpty = Object.keys(response).length === 0
    if (isEmpty === false) {
      navigate('/deposit', { state: response })
    } else {
      navigate('/add-card')
    }
  }

  const closeEvent = () => {
    setIsTrigger(false)
  }


  const proceedReservation = async () => {
    const busname = state.busname
    const route = `${state.origin} - ${state.destination}`
    const seat = Math.floor(Math.random() * (60 - 1 + 1)) + 1
    const fare = state.fare
    const departure = `${state.depart} ${state.date}`
    const bus_id = state.bus_id

    await reservation(bus_id, busname, route, seat, fare, departure)
    setIsTrigger(false)
  }

  const bookTicket = (x) => {
    if (balance >= state.fare) {
      setIsTrigger(true)
    } else {
      onOpen()
    }
  }

  const AlertToast = () => {
    return (
      <AlertDialog
        isOpen={isTrigger}
        leastDestructiveRef={cancelRef}
        onClose={isTrigger}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold' color='teal'>
              Booking confirmation
            </AlertDialogHeader>

            <AlertDialogBody>
              You are about to make a ticket reservation, still want to continue with this action?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={closeEvent} colorScheme='teal'
                variant='outline' border='2px'
                disabled={isBooking}
              >
                Cancel
              </Button>
              <Button colorScheme='teal' onClick={proceedReservation} ml={3}
                isLoading={isBooking}
                loadingText='Booking'
              >
                Confirm
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    )
  }

  return (
    <section className='section__padding background'>
      <Stack spacing={6}>
        <Box
          p='40px'
          mt='4'
          bg='teal.500'
          rounded='md'
          shadow='md'
        >
          <Stack spacing={4} direction='row'
            justifyContent='space-between' alignItems='center'
          >
            <Heading as='h3' size='lg' color='white'>Book your ticket</Heading>
            <Button leftIcon={<ArrowBackIcon />} colorScheme='gray'
              onClick={() => navigate(-1)}
              color='teal'
            >
              Back
            </Button>
          </Stack>
        </Box>
        <Box
          p='40px'
          mt='4'
          bg='whiteAlpha.800'
          rounded='md'
          shadow='md'
          justifyContent='space-around'
        >
          <VStack
            divider={<StackDivider borderColor='teal' />}
            spacing={4}
            align='stretch'
          >
            <Stack direction='row' justifyContent='space-between' alignItems='center'>
              <Stack direction='row' spacing={2} alignItems='center'>
                <Icon as={FaBus} />
                <Heading as='h4' size='md' textAlign='center'>{state.busname}</Heading>
              </Stack>
              <Stack direction='row' spacing={2} alignItems='center'>
                <Heading as='h4' size='md' textAlign='center'>R {state.fare}</Heading>
                <Icon as={FaMoneyCheckAlt} color='teal' />
              </Stack>
            </Stack>
            <Stack>
              <Stack direction='row' spacing={2} alignItems='center'>
                <Icon as={BiCurrentLocation} color='teal' />
                <Text as='b' color='teal' >From:</Text>
                <Text>{state.origin}</Text>
              </Stack>
              <Stack direction='row' spacing={2} alignItems='center'>
                <Icon as={BsFillClockFill} color='teal' />
                <Text as='b' color='teal' >Time:</Text>
                <Text>{state.depart}</Text>
              </Stack>
            </Stack>
            <Stack direction='row' justifyContent='space-between' alignItems='center'>
              <Stack>
                <Stack direction='row' spacing={2} alignItems='center'>
                  <Icon as={HiLocationMarker} color='teal' />
                  <Text as='b' color='teal' >Destination:</Text>
                  <Text>{state.destination}</Text>
                </Stack>
                <Stack direction='row' spacing={2} alignItems='center'>
                  <Icon as={BsFillClockFill} color='teal' />
                  <Text as='b' color='teal' >Arrives:</Text>
                  <Text>{state.arrive}</Text>
                </Stack>
              </Stack>
              <Stack>
                <Button
                  isLoading={isLoading}
                  loadingText='Booking'
                  colorScheme='teal'
                  onClick={bookTicket}
                >
                  Book Now
                </Button>
              </Stack>
            </Stack>
          </VStack>
        </Box>

        <Box
          p='40px'
          mt='4'
          bg='whiteAlpha.800'
          rounded='md'
          shadow='md'
          justifyContent='space-around'
        >
          <Heading as='h4' size='md' textAlign='center'>Driver: {' '}
            <Text as='b' color='teal' >{state.firstname} {' '} {state.lastname}</Text>
          </Heading>
        </Box>
      </Stack>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold' color='red.500'>
              Ops! Insufficient Funds
            </AlertDialogHeader>

            <AlertDialogBody>
              Unable to continue with booking, would you like to deposit now 💸?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} colorScheme='teal'
                variant='outline' border='2px'
              >
                Cancel
              </Button>
              <Button colorScheme='teal' onClick={fetchCard} ml={3}
                isLoading={isLoading}
                loadingText='Hang On'
              >
                Confirm
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <AlertToast />
    </section>
  )
}

export default ToBook