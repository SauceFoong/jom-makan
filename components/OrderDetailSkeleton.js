import { Box, Skeleton, SkeletonText } from "@chakra-ui/react";

const OrderDetailSkeleton = () => {
  return (
    <Box>
      <Skeleton height="15px" width="200px" mt="4" />
      <Skeleton height="10px" mt="4" />
      <Skeleton height="10px" mt="4" />
      <Skeleton height="10px" mt="4" />
      <Skeleton height="10px" mt="4" />
      <Skeleton height="10px" mt="4" />

      <SkeletonText mt="10" noOfLines={1} spacing="4" />
    </Box>
  );
};

export default OrderDetailSkeleton;
