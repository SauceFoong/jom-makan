import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Link,
  List,
  ListItem,
  ListIcon,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react";
import { TimeIcon, CheckIcon } from "@chakra-ui/icons";

export default function OrderCard({ creator }) {
  return (
    <Center py={6}>
      <Box
        maxW={"320px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"lg"}
        p={6}
        textAlign={"center"}
      >
        <Avatar
          size={"xl"}
          src={creator.profilePic}
          alt={"Avatar Alt"}
          mb={4}
          pos={"relative"}
          _after={{
            content: '""',
            w: 4,
            h: 4,
            bg: "green.300",
            border: "2px solid white",
            rounded: "full",
            pos: "absolute",
            bottom: 0,
            right: 3,
          }}
        />
        <Heading fontSize={"2xl"} fontFamily={"body"}>
          Restaurant 1
        </Heading>
        <Text fontWeight={600} fontSize={15} color={"gray.500"} mb={4}>
          by : {creator.name}
        </Text>
        <List spacing={3}>
          <ListItem>
            <ListIcon as={TimeIcon} color="green.400" />
            8/9/2021 12:00pm
          </ListItem>
          <ListItem>
            <ListIcon as={CheckIcon} color="green.400" />
            50 automation executions
          </ListItem>
          <ListItem>
            <ListIcon as={CheckIcon} color="green.400" />
            50 identified users
          </ListItem>
          <ListItem>
            <ListIcon as={CheckIcon} color="green.400" />
            All features
          </ListItem>
        </List>
        <Link href={"#"} color={"blue.400"}>
          View
        </Link>{" "}
        <Stack align={"center"} justify={"center"} direction={"row"} mt={6}>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue("gray.50", "gray.800")}
            fontWeight={"400"}
          >
            #art
          </Badge>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue("gray.50", "gray.800")}
            fontWeight={"400"}
          >
            #photography
          </Badge>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue("gray.50", "gray.800")}
            fontWeight={"400"}
          >
            #music
          </Badge>
        </Stack>
        <Stack mt={8} direction={"row"} spacing={4}>
          <Button
            flex={1}
            fontSize={"sm"}
            rounded={"full"}
            bg={"gray.700"}
            color={"white"}
            _hover={{
              bg: "gray.800",
            }}
            _focus={{
              bg: "gray.800",
            }}
          >
            JOM
          </Button>
          <Button
            flex={1}
            fontSize={"sm"}
            rounded={"full"}
            bg={"blue.400"}
            color={"white"}
            boxShadow={
              "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
            }
            _hover={{
              bg: "blue.500",
            }}
            _focus={{
              bg: "blue.500",
            }}
          >
            LARK
          </Button>
        </Stack>
      </Box>
    </Center>
  );
}
