import {
  Box,
  Center,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  useColorModeValue,
} from "@chakra-ui/react";

const OrderCardSkeleton = () => {
  return (
    <Box
      padding="6"
      bg={useColorModeValue("white", "gray.900")}
      maxW={"300px"}
      w={"full"}
      boxShadow={"2xl"}
      rounded={"lg"}
      p={6}
      textAlign={"center"}
      m={"5px"}
      flex={"1 1 25%"}
      position="relative"
    >
      <Center>
        <SkeletonCircle size="20" alignContent="center" />
      </Center>
      <Skeleton height="20px" mt="4" />

      <SkeletonText mt="4" noOfLines={6} spacing="4" />
    </Box>
  );
};

export default OrderCardSkeleton;
