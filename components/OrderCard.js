import {
  Heading,
  Avatar,
  Box,
  Button,
  Flex,
  Text,
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
import { FiUsers } from "react-icons/fi";
import JomButton from "../components/JomButton";
import { useUser } from "../lib/auth/useUser";
import EditOrderButton from "../components/EditOrderButton";
import DeleteOrderButton from "../components/DeleteOrderButton";
import enGB from "date-fns/locale/en-GB";
import { formatRelative } from "date-fns";
import CancelJomButton from "./CancelJomButton";
import NextLink from "next/link";

const OrderCard = ({
  id,
  creator_name,
  creator_pic,
  res_name,
  ref_url,
  order_date,
  description,
  tips,
  yourOrder,
  yourJom,
  jom_members,
}) => {
  const { user, logout } = useUser();
  //   console.log(user);
  //   const showEditModal = () => {}
  const formatRelativeLocale = {
    lastWeek: "'Last' eeee ' at 'hh:mm aa",
    yesterday: "'Yesterday at 'hh:mm aa",
    today: "'Today at 'hh:mm aa",
    tomorrow: "'Tomorrow at 'hh:mm aa",
    nextWeek: "'Next ' eeee ' at ' hh:mm aa",
    other: "dd/MM/yyyy ' at ' hh:mm aa",
  };

  const locale = {
    ...enGB,
    formatRelative: (token) => formatRelativeLocale[token],
  };

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
      position="relative"
    >
      {yourOrder ? (
        <>
          <EditOrderButton
            order_id={id}
            res_name={res_name}
            ref_url={ref_url}
            description={description}
            order_date={order_date}
            tips={tips}
          />
          <DeleteOrderButton order_id={id} res_name={res_name} />
        </>
      ) : null}
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
          <ListIcon as={TimeIcon} color="gray.800" />
          {formatRelative(new Date(order_date), new Date(), { locale })}
        </ListItem>
        <ListItem>
          <ListIcon as={LinkIcon} color="gray.800" />
          {ref_url ? (
            <Link href={ref_url} color={"blue.400"} isExternal>
              View Menu <ExternalLinkIcon mx="2px" />
            </Link>
          ) : (
            "-"
          )}
        </ListItem>
        <ListItem>
          <ListIcon as={MdAttachMoney} color="gray.800" />
          {tips !== "0.00" ? "RM " + tips : "-"}
        </ListItem>
        <ListItem>
          <Flex>
            <ListIcon as={InfoOutlineIcon} color="gray.800" marginTop="1.5" />
            {description ? description : "-"}
          </Flex>
        </ListItem>
        <ListItem>
          <Flex>
            <ListIcon as={FiUsers} color="gray.800" marginTop="1.5" />
            {jom_members.length}
          </Flex>
        </ListItem>
      </List>{" "}
      {/* <Button
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
      </Button> */}
      {/* <NextLink as={`/order-details/${id}`} href={`/order-details?id=${id}`}> */}
      <NextLink href={`/order-details?id=${id}`}>
        <Link
          w={"full"}
          mt={2}
          color={"blue.600"}
          rounded={"md"}
          _hover={{
            transform: "translateY(-2px)",
          }}
        >
          {" "}
          View Details
        </Link>
      </NextLink>
      {yourOrder || yourJom ? null : (
        <JomButton
          order_id={id}
          order_name={res_name}
          order_date={new Date(order_date)}
        />
      )}
      {yourJom ? (
        <CancelJomButton
          order_id={id}
          res_name={res_name}
          order_date={new Date(order_date)}
        />
      ) : null}
    </Box>
  );
};
export default OrderCard;
