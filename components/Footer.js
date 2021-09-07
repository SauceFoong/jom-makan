import { Flex, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";

const Footer = () => {
  const bgColor = "black";

  return (
    <Flex
      bg={bgColor}
      color="white"
      direction="row"
      bottom="0"
      w="full"
      minH="75px"
      px="8"
      align="center"
      justify="center"
      borderTopWidth="1px"
    >
      <Text mr="12" color="white">
        Jom Makan @2021 All rights reserved
      </Text>
      <NextLink href="/privacy" passHref>
        <Link fontSize="md" fontWeight="medium" mr="12">
          Privacy Policy
        </Link>
      </NextLink>
      <NextLink href="/terms" passHref>
        <Link fontSize="md" fontWeight="medium">
          Terms & Conditions
        </Link>
      </NextLink>
    </Flex>
  );
};

export default Footer;
