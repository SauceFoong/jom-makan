import {
  Heading,
  Avatar,
  Box,
  Center,
  Flex,
  Text,
  Button,
  Link,
  List,
  ListItem,
  ListIcon,
  useColorModeValue,
} from "@chakra-ui/react";
import { TimeIcon, LinkIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import { MdAttachMoney } from "react-icons/md";

const OrderCard = ({ creator, res_name }) => {
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
          {res_name}
        </Heading>
        <Text fontWeight={600} fontSize={15} color={"gray.500"} mb={4}>
          by : {creator.name}
        </Text>
        <List spacing={3} textAlign={"left"}>
          <ListItem>
            <ListIcon as={LinkIcon} color="gray.800" />
            <Link href={"#"} color={"blue.400"}>
              View Menu
            </Link>
          </ListItem>
          <ListItem>
            <ListIcon as={MdAttachMoney} color="gray.800" />
            RM 0.50
          </ListItem>
          <ListItem>
            <ListIcon as={TimeIcon} color="gray.800" />
            8/9/2021 12:00pm
          </ListItem>
          <ListItem>
            <Flex>
              <ListIcon as={InfoOutlineIcon} color="gray.800" />
              This is description
            </Flex>
          </ListItem>
        </List>{" "}
        <Button
          w={"full"}
          mt={8}
          bg={useColorModeValue("#151f21", "gray.900")}
          color={"white"}
          rounded={"md"}
          _hover={{
            transform: "translateY(-2px)",
            boxShadow: "lg",
          }}
        >
          JOM
        </Button>
      </Box>
    </Center>
  );
};
export default OrderCard;
