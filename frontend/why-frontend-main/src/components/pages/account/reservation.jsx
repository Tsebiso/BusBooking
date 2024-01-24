import {
  Box,
  Stack,
  StackDivider,
  Skeleton,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  VStack,
  Heading,
  Button,
  Text,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Bookings } from '../../hooks/useBooking'

const Reservation = () => {

  const { getUserBookings, updateBookingStatus, isBooking } = Bookings()
  const [isComplete, setIsComplete] = useState()
  const [isInComplete, setIsInComplete] = useState()
  useEffect(() => {
    const bookings = async () => {
      const response = await getUserBookings()
      if (response) {

        const complete = response.filter(res => {
          return res.status === 'Complete'
        })

        const incomplete = response.filter(res => {
          return res.status === 'Incomplete'
        })

        setIsComplete(complete)
        setIsInComplete(incomplete)
      }
    }

    bookings()
  }, [])

  const handleClickEvent = async (data) => {
    const bookingno = data.bookingno
    const bus_id = data.bus_id
    const response = await updateBookingStatus(bookingno, bus_id)
    if (response) {
      const complete = response.filter(res => {
        return res.status === 'Complete'
      })

      const incomplete = response.filter(res => {
        return res.status === 'Incomplete'
      })

      setIsComplete(complete)
      setIsInComplete(incomplete)
    }
  }

  return (
    <section className='section__padding background'>
      <Tabs>
        <TabList>
          <Tab color='white'>Incoming</Tab>
          <Tab color='white'>Completed</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            {isInComplete ? <Stack spacing={2}>
              {isInComplete.map(x => {
                return (
                  <Box
                    p='20px'
                    color='teal'
                    mt='4'
                    bg='blackAlpha.800'
                    rounded='md'
                    shadow='md'
                    cursor='pointer'
                    key={x.bookingno}
                  >
                    <VStack
                      divider={<StackDivider borderColor='teal' />}
                      spacing={4}
                      align='stretch'
                    >
                      <Stack direction='row' justifyContent='space-between' alignItems='center'>
                        <Stack direction='row' spacing={2}>
                          <Text color='white'>Route</Text>
                          <Text as='b'>{x.route}</Text>
                        </Stack>
                        <Stack>
                          <Heading as='h4' size='md' color='pink.400'>R {x.fare}</Heading>
                        </Stack>
                      </Stack>

                      <Stack direction='row' spacing={2}>
                        <Text color='white'>Depart:</Text>
                        <Text as='b'>{x.departure}</Text>
                      </Stack>

                      <Stack direction='row' justifyContent='space-between' alignItems='center'>
                        <Stack direction='row' spacing={2}>
                          <Text as='b' color='pink.400'>{x.busname}</Text>
                        </Stack>
                        <Stack>
                          <Button colorScheme='teal'
                            loadingText='Please wait...'
                            onClick={() => handleClickEvent(x)}
                          >
                            Complete Trip
                          </Button>
                        </Stack>
                      </Stack>
                    </VStack>
                  </Box>
                )
              })}
            </Stack> : <Stack>
              <Skeleton height='20px' />
              <Skeleton height='20px' />
              <Skeleton height='20px' />
            </Stack>}
          </TabPanel>
          <TabPanel>
            {isComplete ? <Stack spacing={2}>
              {isComplete.map(x => {
                return (
                  <Box
                    p='20px'
                    color='teal'
                    mt='4'
                    bg='blackAlpha.800'
                    rounded='md'
                    shadow='md'
                    cursor='pointer'
                    key={x.bookingno}
                  >
                    <VStack
                      divider={<StackDivider borderColor='teal' />}
                      spacing={4}
                      align='stretch'
                    >
                      <Stack direction='row' justifyContent='space-between' alignItems='center'>
                        <Stack direction='row' spacing={2}>
                          <Text color='white'>Route</Text>
                          <Text as='b'>{x.route}</Text>
                        </Stack>
                        <Stack>
                          <Heading as='h4' size='md' color='pink.400'>R {x.fare}</Heading>
                        </Stack>
                      </Stack>

                      <Stack direction='row' spacing={2}>
                        <Text color='white'>Depart:</Text>
                        <Text as='b'>{x.departure}</Text>
                      </Stack>

                      <Stack direction='row' justifyContent='space-between' alignItems='center'>
                        <Stack direction='row' spacing={2}>
                          <Text as='b' color='pink.400'>{x.busname}</Text>
                        </Stack>
                        <Stack>
                          <Text as='b'>Trip Complete</Text>
                        </Stack>
                      </Stack>
                    </VStack>
                  </Box>
                )
              })}
            </Stack> : <Stack>
              <Skeleton height='20px' />
              <Skeleton height='20px' />
              <Skeleton height='20px' />
            </Stack>}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </section>
  )
}

export default Reservation