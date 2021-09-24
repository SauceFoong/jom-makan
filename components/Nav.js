import { useUser } from "../lib/auth/useUser";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, AddIcon } from "@chakra-ui/icons";
import AddOrderButton from "./AddOrderButton";
import NextLink from "next/link";

const NavLink = ({ children }) => (
  <NextLink href={"/" + children} passHref>
    <Link
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
    >
      {capitalizeFirstWord(children)}
    </Link>
  </NextLink>
);
const capitalizeFirstWord = (s) => {
  return s && s[0].toUpperCase() + s.slice(1);
};
const Links = ["feedback", "about"];

export default function withAction() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, logout } = useUser();
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>
              <NextLink href="/">JOM Makan</NextLink>
            </Box>
            {user ? (
              <HStack
                as={"nav"}
                spacing={4}
                display={{ base: "none", md: "flex" }}
              >
                {Links.map((link) => (
                  <NavLink key={link}>{link}</NavLink>
                ))}
              </HStack>
            ) : null}
          </HStack>
          {user ? (
            <Flex alignItems={"center"}>
              <AddOrderButton />
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar size={"sm"} src={user.profilePic} />
                </MenuButton>
                <MenuList>
                  <MenuItem>Your orders</MenuItem>
                  <MenuItem>Settings</MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={() => logout()}>Sign Out</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          ) : (
            ""
          )}
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
