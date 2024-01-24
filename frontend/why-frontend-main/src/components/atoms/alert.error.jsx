import { 
  Alert, 
  AlertIcon, 
  AlertTitle,
  AlertDescription
} from '@chakra-ui/react'

const ErrorAlert = ({ErrMessage, Title}) => {
  return (
    <Alert status='error'
      variant='subtle'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      textAlign='center'
      height='200px'
    >
      <AlertIcon boxSize='40px' mr={0} />
      <AlertTitle mt={4} mb={1} fontSize='lg'>
        {Title}
      </AlertTitle>
      <AlertDescription maxWidth='sm'>
        {ErrMessage}
      </AlertDescription>
    </Alert>
  )
}

export default ErrorAlert