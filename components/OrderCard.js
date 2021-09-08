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
import { TimeIcon, LinkIcon } from "@chakra-ui/icons";
import { MdAttachMoney } from "react-icons/md";

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
          Happy Kopitiam
        </Heading>
        <Text fontWeight={600} fontSize={15} color={"gray.500"} mb={4}>
          by : {creator.name}
        </Text>
        <List spacing={3}>
          <ListItem>
            <ListIcon as={LinkIcon} color="green.400" />
            <Link href={"#"} color={"blue.400"}>
              View Menu
            </Link>
          </ListItem>
          <ListItem>
            <ListIcon as={MdAttachMoney} color="green.400" />
            RM 0.50
          </ListItem>
          <ListItem>
            <ListIcon as={TimeIcon} color="green.400" />
            8/9/2021 12:00pm
          </ListItem>
        </List>{" "}
        <Stack align={"center"} justify={"center"} direction={"row"} mt={6}>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue("gray.50", "gray.800")}
            fontWeight={"400"}
          >
            #Cheap
          </Badge>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue("gray.50", "gray.800")}
            fontWeight={"400"}
          >
            #Laksa
          </Badge>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue("gray.50", "gray.800")}
            fontWeight={"400"}
          >
            #Nice
          </Badge>
        </Stack>
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
}
