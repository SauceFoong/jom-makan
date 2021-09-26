import { Button, Center, Th, Tr, Text } from "@chakra-ui/react";
import React from "react";

const JomTable = ({ jom, updatefunc }) => {
  return (
    <Tr key={jom.id}>
      <Th key={jom.id}>{jom.user_name}</Th>
      <Th>{jom.remark}</Th>
      <Th>
        <Center>
          {jom.pay ? (
            <Text>Paid</Text>
          ) : (
            <Button onClick={() => updatefunc(jom.id, jom)}>Pay</Button>
          )}
        </Center>
      </Th>
    </Tr>
  );
};

export default JomTable;
