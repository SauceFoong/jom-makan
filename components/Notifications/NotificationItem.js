import React from "react";
import {
  Box,
  Heading,
  Flex,
  Avatar,
  Stack,
  Text,
  Divider,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { BellIcon } from "@chakra-ui/icons";

export const NotificationItem = () => {
  return (
    <Box>
      <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
        <Avatar
          src={"https://avatars0.githubusercontent.com/u/1164541?v=4"}
          alt={"Author"}
        />
        <Stack direction={"column"} spacing={0} fontSize={"sm"}>
          <Text fontWeight={600}>You have a new Jom</Text>
          <Text color={"gray.500"}>Achim Rolle just jommed your order</Text>
        </Stack>
      </Stack>
      <Divider
        orientation="horizontal"
        mt={5}
        mb={2}
        bgColor={useColorModeValue("gray.900", "gray.400")}
      />
    </Box>
  );
};
