import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext'
import { ChakraProvider } from '@chakra-ui/react'
import App from './App'
import './index.css'
import { AccountContextProvider } from './context/AccountContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <AccountContextProvider>
      <ChakraProvider>
        <Router>
          <App />
        </Router>
      </ChakraProvider>
    </AccountContextProvider>
  </AuthContextProvider>
)