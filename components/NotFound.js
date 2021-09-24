import { Box, Text, Image } from "@chakra-ui/react";
import styles from "../styles/NotFound.module.css";

const NotFound = ({ obj }) => {
  return (
    <Box className={styles.img_container} textAlign="center" maxW={"600px"}>
      <Image src="/static/notfound.svg" alt="Not Found" />
      <Text as="em" fontSize="3xl">
        No {obj} Found
      </Text>
    </Box>
  );
};

export default NotFound;
