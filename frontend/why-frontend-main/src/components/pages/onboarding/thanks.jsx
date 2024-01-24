import { Heading, Stack, Text, Button } from '@chakra-ui/react'
import { MdAttachEmail } from 'react-icons/md'
import { BsLaptopFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { GoArrowLeft } from 'react-icons/go'

const ThankYou = () => {
  const navigate = useNavigate()

  return (
    <section className='section__padding thank__you'>
      <Stack spacing={4} alignItems='center' justifyContent='center'>
        <Heading as='h2' size='3xl' color='teal'>Thank you.</Heading>
        <Text fontSize='2xl' as='b' color='white'>Your ticket booking was completed successfully.</Text>
        <Stack spacing={4} direction='row' alignItems='center'>
          <MdAttachEmail size='50px' color='teal' />
          <Text fontSize='sm' noOfLines={3} color='teal'>
            An email receipt including the details about your ticket has been sent to the email address
            provided. Please keep it for your records.
          </Text>
        </Stack>
        <Stack spacing={4} direction='row' alignItems='center'>
          <Text color='white'>You can visit My Account page at any time to check the status of your trip</Text>
          <BsLaptopFill color='white' />
        </Stack>
      </Stack>
      <Stack alignItems='center' justifyContent='center' mt={2}>
        <Button leftIcon={<GoArrowLeft />} onClick={() => navigate('/')} colorScheme='teal' variant='solid'>
          Email
        </Button>
      </Stack>
    </section>
  )
}

export default ThankYou