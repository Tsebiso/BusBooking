import {
  IconButton,
  Wrap,
  WrapItem
} from '@chakra-ui/react'
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'

const Pagination = ({ page, routes, previousPage, nextPage }) => {
  const pageNumber = []
  for (let i = 1; i <= Math.ceil(routes / page); i++) {
    pageNumber.push(i)
  }

  return (
    <>
      <Wrap spacing={3}>
        <WrapItem onClick={previousPage}>
          <IconButton
            colorScheme='teal'
            aria-label='Call Segun'
            icon={<ArrowLeftIcon />}
          />
        </WrapItem>
        <WrapItem onClick={nextPage}>
          <IconButton
            colorScheme='teal'
            aria-label='Call Segun'
            icon={<ArrowRightIcon />}
          />
        </WrapItem>
      </Wrap>
    </>
  );
}

export default Pagination;