import React, { useEffect, useState } from "react";
import { useUser } from "../lib/auth/useUser";
import {
  Box,
  Text,
  Input,
  Stack,
  Textarea,
  Spinner,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/avatar";
import { db, getUserBankDetails } from "../lib/db";

export default function Profile() {
  const { user, logout } = useUser();
  const [profilePic, setProfilePic] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [bank, setBank] = useState([]);

  useEffect(() => {
    if (user){
      setLoading(false)
    }

  });

  return (
    <>
      <Box border="1px">
        <Grid
          templateRows="repeat(5, 1fr)"
          templateColumns="repeat(5, 1fr)"
          gap={4}
        >
          <GridItem rowSpan={2} colSpan={4}>
            {isLoading ? (
              <Spinner />
            ) : (
              <Box display="flex" marginLeft="20px" marginTop="20px">
                <Box marginTop="20px">
                  <Avatar size={"xl"} src={user.profilePic} />
                </Box>
                <Box marginLeft="50px">
                  <Text>Name</Text>
                  <Box border="2px" paddingRight="10px" paddingLeft="10px">
                    <Text isDisabled="true" size="md" fullWidth>
                      {user.name}
                    </Text>
                  </Box>

                  <Text marginTop="10px">Email</Text>
                  <Box border="2px" paddingRight="10px" paddingLeft="10px">
                    <Text isDisabled="true" size="md">
                      {user.email}
                    </Text>
                  </Box>
                </Box>
              </Box>
            )}
          </GridItem>
          <GridItem rowSpan={2} colSpan={4}>
            {isLoading ? (
              <Spinner />
            ) : (
              <>
                <Box display="flex" marginLeft="20px" marginTop="20px">
                  <Box marginTop="20px">
                    <Text as="u">Billing Info</Text>
                  </Box>
                </Box>
                <Box display="flex" marginLeft="20px" marginTop="20px">
                  <Box>
                    <Text>Bank</Text>
                    <Box border="2px" paddingRight="10px" paddingLeft="10px">
                      <Text isDisabled="true" size="md" fullWidth>
                        {user.bank}
                      </Text>
                    </Box>

                    <Text marginTop="10px">Card No</Text>
                    <Box border="2px" paddingRight="10px" paddingLeft="10px">
                      <Text isDisabled="true" size="md">
                        {user.cardNo}
                      </Text>
                    </Box>
                  </Box>
                </Box>
              </>
            )}
          </GridItem>
        </Grid>
      </Box>
    </>
  );
}
