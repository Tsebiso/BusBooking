import { useState } from 'react'
import { useCreditCard } from '../../hooks/useCreditCard'
import { FaUserAlt } from 'react-icons/fa'
import { BsFillCreditCard2FrontFill, BsFillCalendar2WeekFill } from 'react-icons/bs'
import { IoIosKeypad } from 'react-icons/io'
import {
  Button,
  Input,
  Heading,
  Stack,
  InputGroup,
  InputLeftElement
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import './accounts.css'
import moment from 'moment/moment'

const Deposit = () => {

  const { createCard, isLoading, error } = useCreditCard()
  const [isCard, setIsCard] = useState(false)
  const [isName, setIsName] = useState(false)
  const [isDate, setIsDate] = useState(false)
  const [isCVV, setIsCVV] = useState(false)
  const navigate = useNavigate()
  const [form, setForm] = useState({
    cardName: '',
    cardNumber: '',
    expiaryDate: '',
    cvvNumber: ''
  })

  const [validate, setValidate] = useState(null)
  const today = moment().format('MM')
  const currentYear = moment().format('YY')


  const handleChange = (event) => {
    const updatedForm = { ...form };
    updatedForm[event.target.name] = event.target.value
    setForm(updatedForm)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const regex = new RegExp('^[0-9]{13,18}$')
    const dateRegex = new RegExp('[0-9]{2}/[0-9]{2}')
    let { cardNumber, cardName, expiaryDate, cvvNumber } = form

    setIsCard(false)
    setIsDate(false)
    setIsName(false)
    setIsCVV(false)

    if (cardNumber.length == 0) {
      setValidate('Unknown card type')
      setIsCard(true)
    }
    else
      if (cardNumber.length <= 15 ) {
        setValidate('Too short! Card number must be 16 numbers long')
        setIsCard(true)
      }
      else
        if (cardNumber == '5490997771092064') {
          setValidate('Warning! This credit card number is associated with a scam attempt')
          setIsCard(true)
        }
        else
          if (cardNumber.length > 16) {
            setValidate('Warning! card number can not be more than 16 numbers')
            setIsCard(true)
          }
          else
            if (cardName.length <= 2) {
              setValidate('Too Short!')
              setIsName(true)
            }
            else
              if (cardName.length >= 40) {
                setValidate('Too Long!')
                setIsName(true)
              }
              else
                if (!dateRegex.test(expiaryDate)) {
                  setValidate('Invalid date format')
                  setIsDate(true)
                }
                else
                  if (dateRegex.test(expiaryDate)) {
                    const month = expiaryDate.split('/')[0]
                    const year = expiaryDate.split('/')[1]

                    if (month > 12) {
                      setValidate('Nice try! 😎 we have no month beyond 12 month and the format should be: MM/YY')
                      setIsDate(true)
                    } else
                      if (month <= 0) {
                        setValidate(`There's no such month ZERO`)
                        setIsDate(true)
                      }
                      else
                        if (year <= 21) {
                          setValidate(`Card you trying to use has expired or choose another year and month if you think it's a TYPO`)
                          setIsDate(true)
                        } else
                          if (month <= today && year <= currentYear) {
                            setValidate(`Card you trying to use has expired or choose another year and month if you think it's a TYPO`)
                            setIsDate(true)
                          }
                          else
                            if (cvvNumber.length > 3) {
                              setValidate('CVV number too long, must be 3 digits in length')
                              setIsCVV(true)
                            } else
                              if (cvvNumber.length < 3) {
                                setValidate('CVV number too short, must be 3 digits in length')
                                setIsCVV(true)
                              }
                              else {
                                await createCard(cardNumber, cardName, expiaryDate, cvvNumber)

                              }
                  }
  }


  return (
    <section className='section__padding img__url'>
      {error && <div className='status'>{error}</div>}
      {validate && <div className='status'>{validate}</div>}
      <div className='payment'>
        <div className='payment__form'>
          <Heading as='h4' size='md'>Credit/Debit Card</Heading>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <InputGroup>
                <InputLeftElement
                  pointerEvents='none'
                  children={<BsFillCreditCard2FrontFill color='teal' />}
                />
                <Input type='number'
                  name='cardNumber'
                  value={form.cardNumber}
                  onChange={handleChange}
                  placeholder='xxxx-xxxx-xxxx-xxxx'
                  background='white'
                  isInvalid={isCard}
                  errorBorderColor='red.300'
                />
              </InputGroup>

              <InputGroup>
                <InputLeftElement
                  pointerEvents='none'
                  children={<FaUserAlt color='teal' />}
                />
                <Input type='text'
                  name='cardName'
                  value={form.cardName}
                  onChange={handleChange}
                  placeholder='Card Holder'
                  background='white'
                  isInvalid={isName}
                  errorBorderColor='red.300'
                />
              </InputGroup>

              <Stack direction='row' spacing='4' >
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    children={<BsFillCalendar2WeekFill color='teal' />}
                  />
                  <Input type='text'
                    name='expiaryDate'
                    value={form.expiaryDate}
                    onChange={handleChange}
                    pattern='[0-9]{2}/[0-9]{2}'
                    placeholder='MM/YY'
                    background='white'
                    isInvalid={isDate}
                    errorBorderColor='red.300'
                    title='MM/YY'
                  />
                </InputGroup>

                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    children={<IoIosKeypad color='teal' />}
                  />
                  <Input type='text'
                    name='cvvNumber'
                    value={form.cvvNumber}
                    onChange={handleChange}
                    placeholder='CVV'
                    background='white'
                    isInvalid={isCVV}
                    errorBorderColor='red.300'
                  />
                </InputGroup>
              </Stack>
              <Stack direction='row' spacing={4} align='center' justify='right' >
                <Button colorScheme='teal' variant='outline' type='cancel'
                  border='2px'
                  onClick={() => navigate('/')}
                  background='white'
                >
                  Cancel
                </Button>
                <Button
                  isLoading={isLoading}
                  loadingText='Submitting'
                  colorScheme='teal'
                  type='submit'
                >
                  Confirm
                </Button>
              </Stack>
            </Stack>

          </form>
        </div>
      </div>
    </section>
  )
}

export default Deposit