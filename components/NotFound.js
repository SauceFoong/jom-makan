import { Box, Text, Image } from "@chakra-ui/react";
import styles from "../styles/NotFound.module.css";

const NotFound = () => {
  return (
    <Box className={styles.img_container} textAlign="center" maxW={"600px"}>
      <Image src="/static/notfound.svg" alt="Not Found" />
      <Text as="em" fontSize="3xl">
        No Orders Found
      </Text>
    </Box>
  );
};

export default NotFound;
