import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSignup } from '../../hooks/useSignup'
import {
  Button,
  Input,
  Heading,
  Link,
  Stack,
  Text,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react'
import departing from '../../../assets/undraw_travelers.svg'
import './onboarding.css'

const Register = () => {
  let navigate = useNavigate()
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    userType: 'user',
    password: ''
  })

  const [isError, setIsError] = useState(null)
  const [isFirstName, setIsFirstName] = useState(false)
  const [isLastName, setIsLastName] = useState(false)
  const [isPhoneNumber, setIsPhoneNumber] = useState(false)
  const [isEmail, setIsEmail] = useState(false)
  const [isPassword, setIsPassword] = useState(false)
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  const { signup, isLoading, error } = useSignup()

  const handleFormChange = (event) => {
    const updatedForm = { ...form }
    updatedForm[event.target.name] = event.target.value

    setForm(updatedForm)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (form.firstName.length <= 2 || form.lastName.length <= 2) {
      setIsError(`Too Short!`)
      setIsFirstName(true)
      setIsLastName(true)
    } else
      if (form.firstName.length >= 20 || form.lastName.length >= 20) {
        setIsError(`Too Long!`)
        setIsFirstName(true)
        setIsLastName(true)
      }
      else
        if (form.phoneNumber.length > 10) {
          setIsError(`Too Long! phone number must be 10 characters in length`)
          setIsPhoneNumber(true)
        }
        else
          if (form.phoneNumber.length < 10) {
            setIsError(`Too Short! phone number must be 10 characters in length`)
            setIsPhoneNumber(true)
          }
          else
            if (!form.email) {
              setIsError(`Required`)
              setIsEmail(true)
            }
            else
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(form.email)) {
                setIsError(`Invalid email address`)
                setIsEmail(true)
              }
              else
                if (!form.password) {
                  setIsError(`Nice try! password required 🥱`)
                  setIsPassword(true)
                }
                else {
                  setIsFirstName(false)
                  setIsLastName(false)
                  setIsPhoneNumber(false)
                  setIsEmail(false)
                  setIsPassword(false)
                  setIsError(null)

                  let { firstName, lastName, phoneNumber, email, userType, password } = form
                  await signup(firstName, lastName, email, phoneNumber, userType, password)
                }
  }

  return (
    <section className='section__padding'>
      <div className='onboarding'>
        <div className='onboarding__form'>
          <Stack spacing={1} mb={4}>
            <Heading color='teal'>Welcome,</Heading>
            <Text>Create your free account</Text>
          </Stack>

          {error && <div className='error'>{error}</div>}
          {isError && <div className='error'>{isError}</div>}

          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <Stack direction='row' spacing={4} align='center'>
                <Input
                  type={`text`}
                  name={`firstName`}
                  value={form.firstName}
                  onChange={handleFormChange}
                  placeholder={`First Name`}
                  isInvalid={isFirstName}
                />

                <Input
                  type={`text`}
                  name={`lastName`}
                  value={form.lastName}
                  onChange={handleFormChange}
                  placeholder={`Last Name`}
                  isInvalid={isLastName}
                />
              </Stack>

              <Input
                type={`number`}
                name={`phoneNumber`}
                value={form.phoneNumber}
                onChange={handleFormChange}
                placeholder={`Phone Number`}
                isInvalid={isPhoneNumber}
              />

              <Input
                type={`email`}
                name={`email`}
                value={form.email}
                onChange={handleFormChange}
                placeholder={`Email`}
                isInvalid={isEmail}
              />

              <InputGroup size='md'>
                <Input
                  pr='4.5rem'
                  type={show ? 'text' : 'password'}
                  placeholder='Enter password'
                  name={`password`}
                  value={form.password}
                  onChange={handleFormChange}
                  isInvalid={isPassword}
                />
                <InputRightElement width='4.5rem'>
                  <Button h='1.75rem' size='sm' onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>

              <Button
                type='submit'
                colorScheme='teal'
                isLoading={isLoading}
                loadingText='Submitting'
              >
                Create Account
              </Button>

              <Text>
                Already have an account?{' '}
                <Link as='b' color='teal.500' onClick={() => navigate('/login')}>
                  Login here
                </Link>
              </Text>
            </Stack>
          </form>
        </div>
        <div className='onboarding__left'>
          <img src={departing} />
        </div>
      </div>
    </section>
  )
}
export default Register