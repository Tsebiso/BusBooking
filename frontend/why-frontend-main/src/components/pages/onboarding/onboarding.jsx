import React, { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useBus } from '../../hooks/useBus'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment/moment'
import { Button, Heading, Link, Text, Select, Stack, Skeleton } from '@chakra-ui/react'
import './home.css'
import { useLocation, useNavigate } from 'react-router-dom'

const Onboarding = ({ data }) => {

  const { user } = useAuthContext({ data })
  const { searchForBusRoute, isLoading } = useBus()
  const navigate = useNavigate()
  const [startDate, setStartDate] = useState(new Date())
  console.log(startDate)

  const time = moment(startDate).format('HH:mm')

  const [form, setForm] = useState({
    origin: '',
    destination: '',
    date: ''
  })


  if (data) {
    var origin = [...new Set(data.map(
      item => item.origin
    ))]
    var destination = [...new Set(data.map(
      item => item.destination
    ))]
  }

  const handleFormChange = (event) => {
    const updatedForm = { ...form };
    updatedForm[event.target.name] = event.target.value;

    setForm(updatedForm);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    let { origin, destination, date } = form
    if (!date) {
      date = moment(startDate).format('ddd, MMM D')
      await searchForBusRoute(origin, destination, date)
    } else {
      await searchForBusRoute(origin, destination, date)
    }
  }

  const getDate = (date) => {
    const formattedDate = moment(date).format('ddd, MMM D')
    setStartDate(date)
    form.date = formattedDate
  }

  return (
    <div className='section'>
      <section className='section__padding'>
        {!user && (
          <Stack spacing={2} mb={5}>
            <Heading as='h2' size='3xl' color='teal'>A bus ticket in a time convenient for you 😎</Heading>
            <Text color='white'>Start by {' '}
              <Link color='pink' as='b'
                onClick={() => navigate('/register')}
              >
                Signing up
              </Link>
            </Text>
          </Stack>
        )}

        {user && (
          <div>
            <Stack spacing={2} mb={5}>
              <Heading as='h2' size='3xl' color='teal'>
                Your bus ticket is here!
              </Heading>
              <Text Text fontSize='lg' color='white'>
                Bus Booking helps you to plan, compare and book your bus travel!
              </Text>
            </Stack>
            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                {origin ?
                  <Select name={`origin`} id='origin' variant='outline'
                    background='white'
                    onChange={handleFormChange}
                    required={true}
                  >
                    <option value={form.origin}>--Please select origin--</option>
                    {origin.map(x => {
                      return (
                        <option value={x} key={x}>{x}</option>
                      )
                    })}
                  </Select> : <Stack>
                    <Skeleton height='40px' />
                  </Stack>}
                {destination ?
                  <Select name={`destination`} id='destination'
                    variant='outline' background='white'
                    onChange={handleFormChange}
                    required={true}
                  >
                    <option value={form.destination}>--Please select destination--</option>
                    {destination.map(x => {
                      return (
                        <option value={x} key={x}>{x}</option>
                      )
                    })}
                  </Select> : <Stack>
                    <Skeleton height='40px' />
                  </Stack>}

                <DatePicker
                  selected={startDate}
                  onChange={getDate}
                  minDate={startDate}
                  closeOnScroll={true}
                  dateFormat='MMM dd, yyyy'
                  className='datepicker'
                />

                <Button colorScheme='teal' size='md' type='submit'
                  isLoading={isLoading}
                  loadingText='Submitting'
                >
                  Find Bus
                </Button>
              </Stack>
            </form>
          </div>
        )}
      </section>
    </div>
  );
}

export default Onboarding;