import { useEffect, useState } from 'react'
import { createContext } from 'react'

export const AccountContext = createContext()
export const AccountContextProvider = ({ children }) => {
  const [balance, setBalance] = useState('0.00')

  useEffect(() => {
    const account = JSON.parse(sessionStorage.getItem('account'))
    if (account) {
      setBalance(parseInt(account.balance))
    }
  }, [])

  console.log('Balance: ', balance)
  return (
    <AccountContext.Provider value={{ balance }}>
      {children}
    </AccountContext.Provider>
  )
}