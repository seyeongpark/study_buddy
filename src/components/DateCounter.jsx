import React, { useState, useEffect } from 'react';
import { Stack, Text, Input, Box, Flex, Card, CardHeader, CardBody, CardFooter, Button, Radio, RadioGroup } from '@chakra-ui/react';
import { Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, FormControl, FormLabel, ButtonGroup, IconButton, useDisclosure } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';

function DateCounter() {
  const [inputDate, setInputDate] = useState('');
  const [inputEventName, setInputEventName] = useState('');
  const [counterType, setCounterType] = useState('future');
  const [result, setResult] = useState('Happy Day :)');
  const [storedInputEventName, setStoredInputEventName] = useState('');

  const { onOpen, onClose, isOpen } = useDisclosure();
  const firstFieldRef = React.useRef(null);

  const handleInputChange = (e) => {
    setInputDate(e.target.value);
  };

  const handleEventNameChange = (e) => {
    setInputEventName(e.target.value);
  };

  const handleCounterTypeChange = (value) => {
    setCounterType(value);
  };

  useEffect(() => {
    // Set initial state values from localStorage
    const storedEventName = localStorage.getItem('inputEventName');
    const storedDate = localStorage.getItem('inputDate');
    if (storedEventName) {
      setInputEventName(storedEventName);
      setStoredInputEventName(storedEventName); // Set the stored inputEventName as well
    }
    if (storedDate) {
      setInputDate(storedDate);
    }
  }, []);

  useEffect(() => {
    // Store inputEventName and inputDate in localStorage whenever they change
    localStorage.setItem('inputEventName', inputEventName);
    localStorage.setItem('inputDate', inputDate);
    calculateDateDifference();
  }, [inputEventName, inputDate]);

  const calculateDateDifference = () => {
    if(inputDate) {
      const currentDate = new Date();
      const selectedDate = new Date(inputDate);
      const timeDifference = selectedDate - currentDate;
      const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

      if (counterType === 'future') {
        if (daysDifference < 0) {
          setResult(`Date in the past ${daysDifference * -1} day(s)`);
        } else if (daysDifference === 0) {
          setResult('D-Day');
        } else {
          setResult(`Day-${daysDifference}`);
        }
      } else if (counterType === 'ongoing') {
        if (daysDifference < 0) {
          setResult(`Day ${daysDifference * -1}`);
        } else if (daysDifference === 0) {
          setResult('Day 1');
        } else {
          setResult(`Date counter will start ${daysDifference} day(s) later`);
        }
      }

      onClose();
    } 
  };

  return (
    <>
    <CardHeader fontSize='lg' marginBottom='-10'>
        <Text>{storedInputEventName}</Text>
    </CardHeader>
    <CardBody justifyContent='center'>
      <Flex align="center" justify="center">
        <Text fontSize={result.length < 13 ? '5xl' : '2xl'}>{result}</Text>
      </Flex>
    </CardBody>
    <CardFooter justifyContent="flex-end" marginTop='-10'>
      <Popover
        isOpen={isOpen}
        initialFocusRef={firstFieldRef}
        onOpen={onOpen}
        onClose={onClose}
        placement='right'
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <IconButton size='sm' icon={<EditIcon />} />
        </PopoverTrigger>
        <PopoverContent p={5}>
          <PopoverArrow />
          <PopoverCloseButton />
          <Form
            firstFieldRef={firstFieldRef}
            onCancel={onClose}
            inputEventName={inputEventName}
            handleEventNameChange={handleEventNameChange}
            counterType={counterType}
            handleCounterTypeChange={handleCounterTypeChange}
            inputDate={inputDate}
            handleInputChange={handleInputChange}
            calculateDateDifference={calculateDateDifference}
          />
        </PopoverContent>
      </Popover>
    </CardFooter>
    </>
  );
}

const TextInput = React.forwardRef((props, ref) => {
  return (
    <FormControl>
      <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
      <Input ref={ref} id={props.id} {...props} />
    </FormControl>
  );
});

const Form = ({
  firstFieldRef,
  onCancel,
  inputEventName,
  handleEventNameChange,
  counterType,
  handleCounterTypeChange,
  inputDate,
  handleInputChange,
  calculateDateDifference,
}) => {
  return (
    <Stack spacing={4}>
      <TextInput
        label='Event name'
        id='event-name'
        autoFocus
        value={inputEventName}
        onChange={handleEventNameChange}
      />
      <RadioGroup value={counterType} onChange={handleCounterTypeChange}>
        <Stack spacing={5} direction='row'>
          <Radio colorScheme='green' value='future'>
            Future
          </Radio>
          <Radio colorScheme='green' value='ongoing'>
            Ongoing
          </Radio>
        </Stack>
      </RadioGroup>
      <Input
        type="date"
        label='Event date'
        id='event-date'
        value={inputDate}
        onChange={handleInputChange}
      />
      {/* <ButtonGroup display='flex' justifyContent='flex-end'>
        <Button variant='outline' onClick={onCancel}>
          Cancel
        </Button>
        <Button colorScheme='teal' onClick={calculateDateDifference}>
          Save
        </Button>
      </ButtonGroup> */}
    </Stack>
  );
};

export default DateCounter;
