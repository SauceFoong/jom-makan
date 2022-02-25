import React, { Component, useState } from "react";
import WheelComponent from "react-wheel-of-prizes";
import { Box, SimpleGrid, Heading, Text, UnorderedList, ListItem, Input, Button, FormControl, HStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

const App = () => {
  const [segments, setSegments] = useState([]);
  const [winner, setWinner] = useState();
  const { handleSubmit, register } = useForm();

  const segColors = [
    "#EE4040",
    "#F0CF50",
    "#815CD1",
    "#3DA5E0",
    "#34A24F",
    "#F9AA1F",
    "#EC3F3F",
    "#FF9000",
    "#EE4040",
    "#F0CF50",
    "#815CD1",
    "#3DA5E0",
    "#34A24F",
    "#F9AA1F",
    "#EC3F3F",
    "#FF9000"
  ];
  const onFinished = (winner) => {
    setWinner(winner);
  };

  const onSubmit = async (data) => {
    var newArr = segments.slice();
    newArr.push(data.choice);

    setSegments([...newArr]);
  }

  const clear = () => {
    setSegments([]);
    setWinner();
  }

  return (
    <Box>
      <SimpleGrid columns={2} spacing={10} minChildWidth='500px'>
        <WheelComponent
          key={segments.length} //set a key to recreate element because wont update with state
          segments={segments}
          segColors={segColors}
          isOnlyOnce={false}
          size={200}
          upDuration={100}
          downDuration={1000}
          onFinished={(winner) => onFinished(winner)}
          primaryColor="black"
          contrastColor="white"
          buttonText="Spin"
        />
        <Box paddingTop={'20px'} paddingRight={'20px'}>
          <Heading>Randomizer Spinner</Heading>
          <Text fontSize='xl' noOfLines={[6]}>
            Unsure of what to eat?
            Nobody wants to make a decision?
            Too many choices to pick from?
            Just want to get a random pick from a random list?
            Just let the wheel decide!</Text>
          <br />
          {winner && <Text><b>The wheel has picked: {winner}</b></Text>}
          <br />
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <Input id='choice' {...register("choice")} placeholder='Enter a choice for the spinner' />
              <HStack spacing='24px' marginTop='10px' marginBottom='10px'>
                <Button backgroundColor='blue.300' type="submit">Add to list</Button>
                <Button backgroundColor='red.300' onClick={clear}>Clear list</Button>
              </HStack>
            </FormControl>
          </form>
          <Text fontSize='2xl' as={'b'}>Current choices:</Text>
          {segments.length == 0 ?
            <Text fontSize='xl'>No choices yet. Use the input box to add some.</Text>
            : (<UnorderedList>
              {/* {console.log('start', segments)} */}
              {segments.map((segment, i) => (
                <ListItem key={i}>{segment}</ListItem>
              ))}
            </UnorderedList>)}
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default App;
