import { useLocation } from 'react-router-dom'
import {
  Table, Input, Button,
  Thead, Tbody, Box,
  Tr, Th, Td, Skeleton,
  TableCaption, TableContainer,
  Tabs, TabList, TabPanels, Tab,
  TabPanel, Stack, VStack,
  Stat, StatLabel, StatNumber,
  StatHelpText, StatArrow,
  StatGroup,
} from '@chakra-ui/react'
import { useBus } from '../../hooks/useBus'
import { HiDocumentReport } from 'react-icons/hi'
import { useState } from 'react'
import { useReport } from './useAdmin'
import jsPDF from "jspdf"
import autoTable from 'jspdf-autotable';
import RoutesReport from './report.routes'


const Dashboard = () => {
  const { state } = useLocation()
  const [isFilter, setIsFilter] = useState()
  const [isData, setIsData] = useState()
  const { busRouteReport, isLoading } = useReport()
  const [form, setForm] = useState({
    busName: '',
    origin: '',
    destination: '',
    depart: '',
    arrive: '',
    fare: ''
  })

  const { insertIntoBus, loading } = useBus()

  const handleFormChange = (event) => {
    const updatedForm = { ...form }
    updatedForm[event.target.name] = event.target.value

    setForm(updatedForm)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log({ form })
    let { busName, origin, destination, depart, arrive, fare } = form
    await insertIntoBus(busName, origin, destination, depart, arrive, fare)
  }

  const fetchReport = async () => {
    const response = await busRouteReport()
    if (response) {
      setIsData(response)
    }

    const busyRoute = response.map(item => {
      return item.tottrips
    })

    const max = Math.max(...busyRoute)
    const searchObject = response.find(items => items.tottrips == max)
    console.log({ searchObject })
    setIsFilter(searchObject)
  }

  const routeReport = async () => {
    const columns = [
      { title: " ", dataKey: "bus_id" },
      { title: "Busname", dataKey: "busname" },
      { title: "Mileage (KM)", dataKey: "totdistance" },
      { title: "Trips", dataKey: "tottrips" },
      { title: "Origin", dataKey: "origin" },
      { title: "Destination", dataKey: "destination" },
      { title: "Route Fare", dataKey: "fare" },
    ]

    const doc = new jsPDF('p', 'pt')
    doc.autoTable(columns, isData, {
      styles: { fillColor: [100, 255, 255] },
      columnStyles: {
        bus_id: { fillColor: 255 }
      },
      margin: { top: 60 },
      didDrawPage: function (data) {
        doc.text("Header", 40, 30);
      }
    });
    doc.save('table.pdf');
  }

  const _url = 'https://voucher-system-gen.herokuapp.com/api/admin/users-report'
  // const _url = 'http://localhost:8080/api/admin/users-report'

  const RenderStats = () => {
    return (
      <StatGroup mb={4}>
        {isFilter ?
          <Stat>
            <StatLabel>Busy Route</StatLabel>
            <StatNumber>{isFilter.origin} - {isFilter.destination}</StatNumber>
            <StatHelpText>
              <StatArrow type='increase' />
              {isFilter.tottrips} %
            </StatHelpText>
          </Stat> : null
        }

        {isFilter ?
          <Stat>
            <StatLabel>Higher Mileage (KM)</StatLabel>
            <StatNumber>{isFilter.totdistance}</StatNumber>
            <StatHelpText>
              <StatArrow type='decrease' />
              9.05%
            </StatHelpText>
          </Stat> : null
        }
      </StatGroup>
    )
  }

  return (
    <section className='section__padding'>

      <Tabs>
        <TabList>
          <Tab>Users</Tab>
          <Tab onClick={fetchReport}>Report</Tab>
          {/* <Tab>Add Buses</Tab> */}
        </TabList>

        <TabPanels>
          <TabPanel>
            <TableContainer>
              <Table variant='striped' colorScheme='teal' size='sm'>
                <TableCaption>Imperial to metric conversion factors</TableCaption>
                <Thead>
                  <Tr>
                    <Th>First Name</Th>
                    <Th>Last Name</Th>
                    <Th>Contact Number</Th>
                    <Th>Created at</Th>
                    <Th>Last updated at</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {state.map(x => {
                    return (
                      <Tr key={x._id}>
                        <Td>{x.firstname}</Td>
                        <Td>{x.lastname}</Td>
                        <Td>{x.phonenumber}</Td>
                        <Td>{x.createdat}</Td>
                        <Td>{x.updatedat}</Td>
                      </Tr>
                    )
                  })}
                </Tbody>
              </Table>
            </TableContainer>
            <Box>
              <a href={_url} download>
                <Button rightIcon={<HiDocumentReport />} colorScheme='teal' variant='outline'>
                  Generate Report
                </Button>
              </a>
            </Box>
          </TabPanel>

          <TabPanel>
            <RenderStats />
            <Stack>
              {isData ?
                <RoutesReport routes={isData} routeReport={routeReport} /> :
                <Stack>
                  <Skeleton height='20px' />
                  <Skeleton height='20px' />
                  <Skeleton height='20px' />
                </Stack>
              }
            </Stack>
          </TabPanel>

          <TabPanel>
            <Box
              p='40px'
              mt='4'
              bg='blackAlpha.800'
              rounded='md'
              shadow='md'
            >
              <form onSubmit={handleSubmit}>
                <Stack spacing={4}>
                  <Input
                    type={`text`}
                    name={`busName`}
                    value={form.busName}
                    onChange={handleFormChange}
                    placeholder={`Bus Company Name`}
                    variant='outline'
                    background='white'
                    required={true}
                  />

                  <Input
                    type={`text`}
                    name={`origin`}
                    value={form.origin}
                    onChange={handleFormChange}
                    placeholder={`e.g Pretoria`}
                    variant='outline'
                    background='white'
                    required={true}
                  />

                  <Input
                    type={`text`}
                    name={`destination`}
                    value={form.destination}
                    onChange={handleFormChange}
                    placeholder={`e.g Free State`}
                    variant='outline'
                    background='white'
                    required={true}
                  />
                  <Stack direction='row' alignItems='center' spacing={4}>
                    <Input
                      type={`time`}
                      name={`depart`}
                      value={form.depart}
                      onChange={handleFormChange}
                      variant='outline'
                      background='white'
                      required={true}
                    />

                    <Input
                      type={`time`}
                      name={`arrive`}
                      value={form.arrive}
                      onChange={handleFormChange}
                      variant='outline'
                      background='white'
                      required={true}
                    />
                  </Stack>

                  <Input
                    type={`number`}
                    name={`fare`}
                    value={form.fare}
                    onChange={handleFormChange}
                    placeholder={`Ticke Price`}
                    variant='outline'
                    background='white'
                    required={true}
                  />

                  <Button
                    type='submit'
                    colorScheme='teal'
                    loadingText='Submitting'
                    isLoading={loading}
                  >
                    Submit
                  </Button>
                </Stack>
              </form>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </section>
  )
}

export default Dashboard