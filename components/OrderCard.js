import {
  Heading,
  Avatar,
  Flex,
  Text,
  LinkBox,
  LinkOverlay,
  Link,
  List,
  ListItem,
  ListIcon,
  useColorModeValue,
} from "@chakra-ui/react";
import { TimeIcon, ExternalLinkIcon } from "@chakra-ui/icons";
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
  const formatRelativeLocale = {
    lastWeek: "'Last' eee ' at ' hh:mm aa",
    yesterday: "'Yesterday at 'hh:mm aa",
    today: "'Today at 'hh:mm aa",
    tomorrow: "'Tomorrow at 'hh:mm aa",
    nextWeek: "'Next ' eee ' at ' hh:mm aa",
    other: "dd/MM/yyyy ' at ' hh:mm aa",
  };

  const locale = {
    ...enGB,
    formatRelative: (token) => formatRelativeLocale[token],
  };

  return (
    <LinkBox
      maxW={"300px"}
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
          <Link zIndex="20">
            <EditOrderButton
              order_id={id}
              res_name={res_name}
              ref_url={ref_url}
              description={description}
              order_date={order_date}
              tips={tips}
            />
          </Link>
          <Link>
            <DeleteOrderButton order_id={id} res_name={res_name} />
          </Link>
        </>
      ) : null}
      <Avatar
        size={"xl"}
        src={creator_pic}
        alt={"Avatar Alt"}
        mb={4}
        pos={"relative"}
      />
      <NextLink href={`/order-details?id=${id}`} passHref>
        <LinkOverlay
          w={"full"}
          mt={2}
          color={"blue.600"}
          rounded={"md"}
          _hover={{
            transform: "translateY(-2px)",
          }}
        ></LinkOverlay>
      </NextLink>
      <Heading
        fontSize={"2xl"}
        fontFamily={"body"}
        color={useColorModeValue("gray.900", "white")}
      >
        {res_name.length >= 20 ? res_name.substring(0, 17) + "..." : res_name}
      </Heading>
      <Text fontWeight={600} fontSize={15} color={"gray.500"} mb={4}>
        by : {creator_name}
      </Text>
      <List spacing={3} textAlign={"left"}>
        <ListItem>
          <ListIcon
            as={TimeIcon}
            color={useColorModeValue("gray.900", "white")}
          />
          {formatRelative(new Date(order_date), new Date(), { locale })}
        </ListItem>
        <ListItem>
          <ListIcon
            as={ExternalLinkIcon}
            color={useColorModeValue("gray.900", "white")}
          />
          {ref_url ? (
            <Link href={ref_url} color={"blue.400"} isExternal>
              Menu
              {/* Ref <ExternalLinkIcon mx="2px" /> */}
            </Link>
          ) : (
            "-"
          )}
        </ListItem>
        <ListItem>
          <ListIcon
            as={MdAttachMoney}
            color={useColorModeValue("gray.900", "white")}
          />
          {tips !== "0.00" ? "RM " + tips : "-"}
        </ListItem>
        {/* <ListItem>
          <Flex>
            <ListIcon as={InfoOutlineIcon} color="gray.800" marginTop="1.5" />
            {description ? description : "-"}
          </Flex>
        </ListItem> */}
        <ListItem>
          <Flex>
            <ListIcon
              as={FiUsers}
              color={useColorModeValue("gray.900", "white")}
              marginTop="1.5"
            />
            {jom_members.length}
          </Flex>
        </ListItem>
      </List>{" "}
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
    </LinkBox>
  );
};
export default OrderCard;
