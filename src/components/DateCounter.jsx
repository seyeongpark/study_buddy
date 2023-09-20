import React, { useState, useEffect } from 'react';
import { Stack, Text, Input,
  Box, Grid, Flex, Spacer,
  Tabs, TabList, TabPanels, Tab, TabPanel,
  Card, CardHeader, Heading, CardBody, CardFooter, Button,
  UnorderedList, ListItem } from '@chakra-ui/react';

function DateCounter() {
  const [inputDate, setInputDate] = useState('');
  const [inputEventName, setInputEventName] = useState('');
  const [counterType, setCounterType] = useState('future');
  const [result, setResult] = useState('');
  const [storedInputEventName, setStoredInputEventName] = useState('');
  const [storedInputDate, setStoredInputDate] = useState('');

  const handleInputChange = (e) => {
    setInputDate(e.target.value);
  };

  const handleEventNameChange = (e) => {
    setInputEventName(e.target.value);
  };

  const handleCounterTypeChange = (e) => {
    setCounterType(e.target.value);
  };

  useEffect(() => {
    // Store inputEventName and inputDate in localStorage
    localStorage.setItem('inputEventName', inputEventName);
    localStorage.setItem('inputDate', inputDate);
  }, [inputEventName, inputDate]);

  useEffect(() => {
    // Retrieve values from localStorage
    const storedEventName = localStorage.getItem('inputEventName');
    const storedDate = localStorage.getItem('inputDate');
    if (storedEventName) {
      setStoredInputEventName(storedEventName);
    }
    if (storedDate) {
      setStoredInputDate(storedDate);
    }

    console.log('storedEventName', storedEventName);
    console.log('storedDate', storedDate);
  }, []);

  const calculateDateDifference = () => {
    const currentDate = new Date();
    const selectedDate = new Date(inputDate);
    const timeDifference = selectedDate - currentDate;
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

    if (counterType === 'future') {
      if (daysDifference < 0) {
        setResult(`Date in the past ${daysDifference} day(s)`);
      } else if (daysDifference === 0) {
        setResult('D-Day');
      } else {
        setResult(`Day -${daysDifference}`);
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
  };

  return (
    <>
    <CardHeader fontSize='lg' marginBottom='-10'>
        <Text>{storedInputEventName}</Text>
    </CardHeader>
    <CardBody justifyContent='center'>
      <Flex align="center" justify="center">
        <Text fontSize='5xl'> {result} </Text>
      </Flex>
    </CardBody>
    <CardFooter justifyContent="flex-end" marginTop='-10'>
      <Button
        onClick={()=> {}}
        colorScheme='gray'
        _hover={{ 
          bg: 'green',
          color: '#fff',
          transform: 'scale(0.98)',
          }}
          size='sm'
        >
        Change
      </Button>
    </CardFooter>


      {/* <div>
        <input type="text" value={inputEventName} onChange={handleEventNameChange} />
        <label>Date:</label>
        <input type="date" value={inputDate} onChange={handleInputChange} />
        <br />
        <label>Counter Type:</label>
        <select value={counterType} onChange={handleCounterTypeChange}>
          <option value="future">Future</option>
          <option value="ongoing">Ongoing</option>
        </select>
        <div>
          Event Name: {storedInputEventName}  
          <br/>
          Event Date: {storedInputDate}  
        </div>
      </div>
      <button onClick={calculateDateDifference}>Calculate</button>
      <div>
        <p>{result}</p>
      </div> */}
    </>
  );
}

export default DateCounter;
