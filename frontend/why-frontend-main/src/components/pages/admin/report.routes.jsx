import {
  Table, Thead, Tbody,
  Tr, Th, Td, Button,
  Box, TableContainer
} from '@chakra-ui/react'
import Pagination from './pagination'
import { useState } from 'react'
import { animateScroll as scroll } from 'react-scroll'
import { BsFillSignpostSplitFill } from 'react-icons/bs'

const RoutesReport = ({ routes, routeReport }) => {

  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(9)
  const [order, setOrder] = useState('asc')
  const [sortField, setSortField] = useState('');

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentElements = routes.slice(indexOfFirstPost, indexOfLastPost)

  const previousPage = () => {
    if (currentPage !== 1) {
      scroll.scrollToTop()
      setCurrentPage(currentPage - 1);
    }
  }

  const nextPage = () => {
    if (currentPage !== Math.ceil(routes.length / postsPerPage)) {
      scroll.scrollToTop()
      setCurrentPage(currentPage + 1)
    }
  }

  const GenerateReport = () => {
    return (
      <Button rightIcon={<BsFillSignpostSplitFill />} colorScheme='teal' variant='outline'
        onClick={routeReport}
      >
        Routes Report
      </Button>
    )
  }

  // 👇sort by Numeric property ASCENDING (1 - 100)
  const numAscending = [...routes].sort((a, b) => a.bus_id - b.bus_id)

  // 👇sort by Numeric property DESCENDING (100 - 1)
  const numDescending = [...routes].sort((a, b) => b.bus_id - a.bus_id)

  // 👇sort by String property ASCENDING (A - Z)
  const strAscending = [...routes].sort((a, b) => a.busname > b.busname ? 1 : -1)

  // 👇sort by String property DESCENDING (A - Z)
  const strDescending = [...routes].sort((a, b) => a.busname > b.busname ? 1 : -1)

  return (
    <>
      <TableContainer>
        <Table variant='striped' colorScheme='teal' size='sm'>
          <Thead>
            <Tr>
              <Th>Busname</Th>
              <Th>Mileage (Km)</Th>
              <Th>Origin</Th>
              <Th>Destination</Th>
              <Th>Trips</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentElements.map(element => {
              return (
                <Tr key={element.bus_id}>
                  <Td>{element.busname}</Td>
                  <Td>{element.totdistance}</Td>
                  <Td>{element.origin}</Td>
                  <Td>{element.destination}</Td>
                  <Td>{element.tottrips}</Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <Box display='flex' alignItems='center' justifyContent='space-between'>
        <GenerateReport />
        <Pagination
          previousPage={previousPage}
          nextPage={nextPage}
        />
      </Box>
    </>
  );
}

export default RoutesReport;