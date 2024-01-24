import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton
} from '@chakra-ui/react'

const ControlledUsage = ({PopoverText}) => {
  const { isOpen, onToggle, onClose } = useDisclosure()

  return (
    <Popover
      returnFocusOnClose={false}
      isOpen={isOpen}
      onClose={onClose}
      placement='right'
      closeOnBlur={false}
    >
      <PopoverContent>
        <PopoverHeader fontWeight='semibold'>Confirmation</PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          {PopoverText}
        </PopoverBody>
        <PopoverFooter display='flex' justifyContent='flex-end'>
          <ButtonGroup size='sm'>
            <Button variant='outline' onClick={onClose}>Cancel</Button>
            <Button colorScheme='teal'>Recharge</Button>
          </ButtonGroup>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  )
}

export default ControlledUsage