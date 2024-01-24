import { useState } from 'react'
import { useCreditCard } from '../../hooks/useCreditCard'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  Button,
  Input,
  Stack,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text
} from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'
import { CreditCard } from '../..'
import './accounts.css'

const Deposit = () => {

  const { state } = useLocation()
  const navigate = useNavigate()
  const { makeDeposit, isLoading, error } = useCreditCard()
  const [isInvalid, setIsInvalid] = useState(false)
  const [isAmount, setIsAmount] = useState(false)
  const [isMessage, setIsMessage] = useState(null)
  const [matchCVV, setMatchCVV] = useState(null)
  const [deposit, setDeposit] = useState({
    amount: 0,
    cvv: ''
  })

  const creditNumber = state.cardnumber
  let joy = creditNumber.match(/.{1,4}/g);


  const handleChange = (event) => {

    const updateDeposit = { ...deposit }
    updateDeposit[event.target.name] = event.target.value

    setDeposit(updateDeposit)
  }


  const handleDeposit = async (event) => {
    event.preventDefault()
    let cardNumber = state.cardnumber
    let amount = deposit.amount


    if (deposit.amount >= 50 && deposit.amount <= 2000) {
      setIsMessage(null)
      setIsAmount(false)
      if (deposit.cvv.length > 3) {
        setMatchCVV('CVV number too long, must be 3 digits in length')
        setIsInvalid(true)
      } else
        if (deposit.cvv.length < 3) {
          setMatchCVV('CVV number too short, must be 3 digits in length')
          setIsInvalid(true)
        } else
          if (deposit.cvv != state.cvvnumber) {
            setMatchCVV('Invalid cvv number, please check if your cvv match with your card')
            setIsInvalid(true)
          }
          else {
            setMatchCVV(null)
            await makeDeposit(amount)
          }
    } else {
      setIsMessage('Invalid amount, amount should be between 50.00 ZAR and 2000.00 ZAR')
      setIsAmount(true)
    }
  }

  return (
    <section className='section__padding img__url'>
      {error && <div className='status'>{error}</div>}
      {matchCVV && <div className='status'>{matchCVV}</div>}
      {isMessage && <div className='status'>{isMessage}</div>}
      <div className='card-exists'>
        <div className='credit-card'>
          <CreditCard
            cardNumber={joy.join(' ')}
            name={state.cardname}
            date={state.expiarydate}
            cvv={state.cvvnumber}
          />
        </div>
        <form onSubmit={handleDeposit}>
          <Stack spacing={4}>
            <div>
              <InputGroup>
                <InputLeftElement
                  pointerEvents='none'
                  color='gray.300'
                  fontSize='1.2em'
                  children='R'
                />
                <Input placeholder='Enter amount'
                  type='number'
                  name='amount'
                  onChange={handleChange}
                  isInvalid={isAmount}
                  errorBorderColor='red.300'
                  background='white'
                />
                <InputRightElement children={<CheckIcon color='green.500' />} />
              </InputGroup>
              <Text fontSize='xs' color='white'>Min: 50.00 ZAR Max: 2000.00 ZAR</Text>
            </div>
            <Input type='number'
              name='cvv'
              onChange={handleChange}
              required='ture'
              placeholder='CVV'
              isInvalid={isInvalid}
              errorBorderColor='red.300'
              background='white'
            />

            <Stack direction='row' spacing={4} align='center' justify='right' >
              <Button colorScheme='teal' variant='outline'
                border='2px'
                type='cancel'
                onClick={() => navigate('/')}
                background='white'
              >
                Cancel
              </Button>
              <Button type='submit' colorScheme='teal'
                isLoading={isLoading}
                loadingText='Submitting'
              >
                Deposit
              </Button>
            </Stack>
          </Stack>
        </form>
      </div>
    </section>
  )
}

export default Deposit