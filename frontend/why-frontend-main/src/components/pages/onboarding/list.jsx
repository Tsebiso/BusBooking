import {
  Box,
  Stack,
  Text,
  VStack,
  StackDivider,
  Heading,
  Button,
  useToast
} from '@chakra-ui/react'
import { BiCurrentLocation } from 'react-icons/bi'
import { HiLocationMarker } from 'react-icons/hi'
import { BsFillClockFill } from 'react-icons/bs'
import { FaBus } from 'react-icons/fa'
import moment from 'moment/moment'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const ListBuses = () => {

  const { state } = useLocation()
  console.log({ state })
  const navigate = useNavigate()
  const [noBooking, setNoBooking] = useState(null)
  const toast = useToast()

  const [startDate, setStartDate] = useState(new Date())
  const time = moment(startDate).format('HH:mm')
  const today = moment(startDate).format('ddd, MMM D')
  console.log({
    time: time,
    today: today
  })

  const handleClickEvent = (e) => {
    e['date'] = state.date

    if (state.date === today && e.depart < time) {
      console.log(`today is ${today} and the time is ${time}`)
      toast({
        title: 'Try to book for a different date 🗓',
        description: "You can't book this bus, bus not available past this hour mark 😣",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    } else {
      navigate('/bus-schedules-results/book', { state: e })
    }
  }

  return (
    <section className='section__padding background'>
      <Stack direction='row'>
        <Heading as='h4' size='md' color='teal'>SEARCH</Heading>
        <Heading as='h4' size='md' color='pink.400'>Results</Heading>
      </Stack>

      <Stack spacing={2}>
        {state.response.map(x => {
          return (
            <Box
              p='20px'
              color='teal'
              mt='4'
              bg='blackAlpha.800'
              rounded='md'
              shadow='md'
              cursor='pointer'
              key={x.id}
            >
              <VStack
                divider={<StackDivider borderColor='teal' />}
                spacing={4}
                align='stretch'
              >
                <Stack direction='row' justifyContent='space-between' alignItems='center'>
                  <Stack direction='row' spacing={2}>
                    <Text as='b'>{x.origin}</Text>
                    <Text color='white'>to</Text>
                    <Text as='b'>{x.destination}</Text>
                  </Stack>
                  <Stack>
                    <Heading as='h4' size='md' color='pink.400'>R {x.fare}</Heading>
                  </Stack>
                </Stack>

                <Stack direction='row' spacing={2}>
                  <Text color='white'>Depart:</Text>
                  <Text as='b'>{state.date} {x.depart}</Text>
                  <Text color='red'>|</Text>
                  <Text color='white'>Arrive:</Text>
                  <Text as='b'>{state.date} {x.arrive}</Text>
                </Stack>

                <Stack direction='row' spacing={2}>
                  <Text color='white'>Bus driver:</Text>
                  <Text as='b'>{x.firstname}</Text>
                  <Text as='b'>{x.lastname}</Text>
                </Stack>

                <Stack direction='row' justifyContent='space-between' alignItems='center'>
                  <Stack direction='row' spacing={2}>
                    <Text as='b' color='pink.400'>{x.busname}</Text>
                  </Stack>
                  <Stack>
                    <Button colorScheme='teal'
                      onClick={() => handleClickEvent(x)}
                    >
                      View
                    </Button>
                  </Stack>
                </Stack>
              </VStack>
            </Box>
          )
        })}
      </Stack>
    </section>
  )
}

export default ListBuses