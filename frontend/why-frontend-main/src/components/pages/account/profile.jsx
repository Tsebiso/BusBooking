import React, { useState, useEffect } from 'react'
import { useUpdate } from '../../hooks/useUpdate'
import {
  AlertDialog, Checkbox,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Box, Button, Grid,
  GridItem, Heading,
  Image, Input, Stack,
  Tabs, TabList, TabPanels, Tab, TabPanel, Text,
  Skeleton, useDisclosure, StackDivider, VStack
} from '@chakra-ui/react'
import profile__image from '../../../assets/undraw_profile.svg'
import { useTransactions } from '../../hooks/useTransactions'
import { FaCcVisa } from 'react-icons/fa'
import { HiDotsHorizontal, HiPlusSm } from 'react-icons/hi'
import { useDeleteAccont } from '../../hooks/useDeleteAccount'
import moment from 'moment/moment'

const Profile = () => {

  const { update, isLoading } = useUpdate()
  const { deleteAccount, isDeleting } = useDeleteAccont()
  const { getAllUserTransactions, getAllCard, loading, error } = useTransactions()
  const [data, setData] = useState()
  const [card, setCard] = useState()
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
  })
  const [isTrigger, setIsTrigger] = useState(false)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()

  useEffect(() => {
    const fetchUser = async () => {
      const user = await JSON.parse(sessionStorage.getItem('user'))
      if (user) {
        setForm({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          token: user.token
        })
      }
    }

    const fetchCreditCard = async () => {
      const response = await getAllCard()
      console.log({ response })
      if (response.length > 0) {
        setCard(response)
      }
    }

    const fetchProfile = async () => {
      const response = await getAllUserTransactions()
      if (response) {
        setData(response)
      }
    }

    fetchUser().catch(console.error)
    fetchCreditCard()
    fetchProfile()
  }, [])

  const handleFormChange = (event) => {
    const updatedForm = { ...form }
    updatedForm[event.target.name] = event.target.value

    setForm(updatedForm)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    let { firstName, lastName, email, phoneNumber, token } = form
    await update(firstName, lastName, email, phoneNumber, token)
    onClose()
  }

  // moment(data.transactiondate).format('ddd, MMM D')

  const deleteAccountForever = () => {
    setIsTrigger(true)
  }

  const closeEvent = () => {
    setIsTrigger(false)
  }

  const confirm = async () => {
    await deleteAccount()
  }

  const AlertToast = () => {
    return (
      <AlertDialog
        isOpen={isTrigger}
        leastDestructiveRef={cancelRef}
        onClose={isTrigger}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold' color='teal'>
              Delete Account😨😨!
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={closeEvent} colorScheme='teal'
                variant='outline' border='2px'
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button colorScheme='teal' onClick={confirm} ml={3}
                isLoading={isDeleting}
                loadingText='Booking'
              >
                Confirm
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    )
  }

  return (
    <section className='section__padding'>

      <Tabs>
        <TabList>
          <Tab>Profile</Tab>
          <Tab>Payment</Tab>
          <Tab>Transactions</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Heading mb={4}>Personal Details</Heading>
            <Grid templateColumns='repeat(2, 1fr)' gap={6} alignItems='center'>
              <GridItem w='100%'>
                <form onSubmit={handleSubmit}>
                  <Stack spacing={4}>
                    <Input
                      type={`text`}
                      name={`firstName`}
                      value={form.firstName}
                      onChange={handleFormChange}
                      placeholder={`First Name`}
                    />

                    <Input
                      type={`text`}
                      name={`lastName`}
                      value={form.lastName}
                      onChange={handleFormChange}
                      placeholder={`Last Name`}
                    />

                    <Input
                      type={`number`}
                      name={`phoneNumber`}
                      value={form.phoneNumber}
                      onChange={handleFormChange}
                      placeholder={`Phone Number`}
                    />

                    <Input
                      type={`email`}
                      name={`email`}
                      value={form.email}
                      onChange={handleFormChange}
                      placeholder={`Email`}
                      disabled={true}
                      background='white'
                    />

                    <Stack>
                      <Button colorScheme='teal'
                        variant='solid'
                        onClick={onOpen}
                      >
                        Save
                      </Button>
                      <Button colorScheme='red'
                        variant='solid'
                        onClick={deleteAccountForever}
                      >
                        Delete Account
                      </Button>
                    </Stack>
                  </Stack>

                  <AlertDialog
                    isOpen={isOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                  >
                    <AlertDialogOverlay>
                      <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                          Update details
                        </AlertDialogHeader>

                        <AlertDialogBody>
                          Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                          <Button ref={cancelRef} onClick={onClose}>
                            Cancel
                          </Button>
                          <Button colorScheme='teal' ml={3}
                            isLoading={isLoading}
                            loadingText='Saving'
                            onClick={handleSubmit}
                            type='submit'
                          >
                            Save
                          </Button>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialogOverlay>
                  </AlertDialog>
                </form>
              </GridItem>
              <GridItem w='100%'>
                <Box width='100%'>
                  <Image src={profile__image} alt='Dan Abramov' />
                </Box>
              </GridItem>
            </Grid>
          </TabPanel>
          <TabPanel>
            <Text>Payment Methods</Text>
            {card ?
              card.map((x) => {
                return (
                  <Box
                    p='10px 20px'
                    color='white'
                    mt='4'
                    bg='teal.500'
                    rounded='md'
                    shadow='md'
                    key={x.cardnumber}
                  >
                    <VStack
                      divider={<StackDivider borderColor='teal' />}
                      spacing={4}
                      align='stretch'
                    >
                      <Stack spacing={4} direction='row' alignItems='center' justifyContent='space-between'>
                        <Stack direction='row' alignItems='center'>
                          <FaCcVisa size='32px' color='#1A365D' />
                          <Stack spacing={1} direction='row' alignItems='center'>
                            <Stack direction='row' alignItems='center' spacing='unset'>
                              <HiDotsHorizontal />
                            </Stack>
                            <Text>{x.cardnumber.substr(x.cardnumber.length - 4)}</Text>
                          </Stack>
                        </Stack>
                        <Checkbox
                          isChecked={x.cardstatus}
                        ></Checkbox>
                      </Stack>
                    </VStack>
                  </Box>
                )
              })
              : <Stack>
                <Skeleton height='20px' />
                <Skeleton height='20px' />
                <Skeleton height='20px' />
              </Stack>
            }

            {/* <Stack spacing={4} mt='8'>
              <Button leftIcon={<HiPlusSm />} colorScheme='teal' variant='solid'>
                Add Card
              </Button>
            </Stack> */}
          </TabPanel>
          <TabPanel>
            {data ?
              <Stack spacing={4}>
                {data.map(x => {
                  return (
                    <Box
                      p='20px'
                      color='white'
                      bg='teal.500'
                      rounded='md'
                      shadow='md'
                      key={x.transactionid}
                    >
                      <Stack direction='row' justifyContent='space-between' alignItems='center'>
                        <Text fontSize='md'>{moment(x.transactiondate).format('DD/MM/YY')}, {moment(x.transactiondate).format('HH:mm')}</Text>
                        <Text fontSize='md' color='pink'>ZAR {' '}
                          {x.transactiontype === 'Credit' ? '+' + x.amount : x.amount}
                        </Text>
                      </Stack>
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

      <AlertToast />
    </section>
  )
}

export default Profile