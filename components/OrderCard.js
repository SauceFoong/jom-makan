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
import {
  TimeIcon,
  LinkIcon,
  InfoOutlineIcon,
  ExternalLinkIcon,
} from "@chakra-ui/icons";
import { MdAttachMoney } from "react-icons/md";

const OrderCard = ({
  creator_name,
  creator_pic,
  res_name,
  ref_url,
  order_date,
  description,
  tips,
}) => {
  return (
    <Box
      maxW={"320px"}
      w={"full"}
      bg={useColorModeValue("white", "gray.900")}
      boxShadow={"2xl"}
      rounded={"lg"}
      p={6}
      textAlign={"center"}
      m={"5px"}
      flex={"1 1 25%"}
    >
      <Avatar
        size={"xl"}
        src={creator_pic}
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
        by : {creator_name}
      </Text>
      <List spacing={3} textAlign={"left"}>
        <ListItem>
          <ListIcon as={LinkIcon} color="gray.800" />
          <Link href={ref_url} color={"blue.400"} isExternal>
            View Menu <ExternalLinkIcon mx="2px" />
          </Link>
        </ListItem>
        <ListItem>
          <ListIcon as={MdAttachMoney} color="gray.800" />
          RM {tips}
        </ListItem>
        <ListItem>
          <ListIcon as={TimeIcon} color="gray.800" />
          {order_date}
        </ListItem>
        <ListItem>
          <Flex>
            <ListIcon as={InfoOutlineIcon} color="gray.800" />
            {description}
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
  );
};
export default OrderCard;
