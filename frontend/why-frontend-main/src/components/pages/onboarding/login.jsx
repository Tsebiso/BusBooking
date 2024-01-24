import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLogin } from '../../hooks/useLogin'
import {
  Button,
  Input,
  Heading,
  Link,
  Stack,
  Text,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react'
import departing from '../../../assets/undraw_departing.svg'
import './onboarding.css'

const Login = () => {

  let navigate = useNavigate()
  const [isValid, setIsInvalid] = useState(null)
  const [isEmail, setIsEmail] = useState(false)
  const [isPassword, setIsPassword] = useState(false)
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const { login, error, isLoading } = useLogin()

  const handleFormChange = (event) => {
    const updatedForm = { ...form };
    updatedForm[event.target.name] = event.target.value;

    setForm(updatedForm);
  }

  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)


  const handleSubmit = async (event) => {
    event.preventDefault();


    if (!form.email || !form.password) {
      setIsInvalid('Field required! 😛')
      setIsEmail(true)
      setIsPassword(true)
    } else {
      setIsEmail(false)
      setIsPassword(false)
      let { email: username, password } = form
      await login(username, password)
    }
  }

  return (
    <section className='section__padding'>
      <div className='onboarding'>
        <div className='onboarding__form'>
          <Stack spacing={1} mb={4}>
            <Heading color='teal'>Welcome,</Heading>
            <Text>Login to continue</Text>
          </Stack>

          {error && <div className='error'>{error}</div>}
          {isValid && <div className='error'>{isValid}</div>}

          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <Input
                type='email'
                name={`email`}
                value={form.email}
                onChange={handleFormChange}
                placeholder='example@example.com'
                className='invalid'
                isInvalid={isEmail}
                errorBorderColor='red.300'
              />

              <InputGroup size='md'>
                <Input
                  type={show ? 'text' : 'password'}
                  name={`password`}
                  value={form.password}
                  onChange={handleFormChange}
                  placeholder={`Password`}
                  isInvalid={isPassword}
                  errorBorderColor='red.300'
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
                Login
              </Button>

              <Text>
                Don't have an account?{' '}
                <Link as='b' color='teal.500' onClick={() => navigate('/register')}>
                  Sign up here
                </Link>
              </Text>
            </Stack>
          </form>
        </div>
        <div className='onboarding__left'>
          <img src={departing} alt="" />
        </div>
      </div>
    </section>
  )
}
export default Login