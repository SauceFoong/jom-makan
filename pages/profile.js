import Head from "next/head";
import {
    Center,
    Textarea,
    Button,
    FormControl,
    FormErrorMessage,
    VStack,
    Alert,
    AlertIcon,
    AlertDescription,
    List,
    ListIcon,
    ListItem,
    Input,
    Avatar,
    Stack,
    Skeleton,
} from "@chakra-ui/react";
import { FiUser, FiBookOpen } from "react-icons/fi";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useUser } from "../lib/auth/useUser";
import { useRouter } from "next/router";
import { updateProfileDetails, getUserDetails } from "../lib/db";

export async function getServerSideProps(context) {
    return {
        props: {}, // will be passed to the page component as props
    };
}

const Profile = () => {
    const { user, logout } = useUser();
    const [profile, setProfile] = useState();
    const router = useRouter();
    const { id } = router.query;
    const [alertMessage, setAlertMessage] = useState("");
    const {
        register,
        reset,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async (data) => {
        setAlertMessage("");
        const profileDetails = {
            ...data,
            user_name: profile.name, //not allow to change username for now
            last_login: profile.lastLogin,
            updated_at: new Date().toISOString(),
        };

        updateProfileDetails(user.id, user, profileDetails);
        setAlertMessage("success");
    };



    useEffect(async () => {

        if (id) {
            const userDetails = await getUserDetails(id);
            setProfile(userDetails.user)
        }


    }, [id]);


    return (
        <>
            {profile ? user.id === profile.id ?
                <>
                    <Head>
                        <title>My Profile</title>
                    </Head>

                    <Center fontSize={40} pt={10}>
                        Profile Page
                    </Center>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Center>
                            <VStack width={550} mt={5}>
                                {alertMessage != "" && (
                                    <Alert status="success">
                                        <AlertIcon />
                                        <AlertDescription>Profile Details Updated.</AlertDescription>
                                    </Alert>
                                )}
                                <FormControl isInvalid={errors.subject}>
                                    <FormErrorMessage>
                                        {errors.subject && errors.subject.message}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={errors.user_name}>
                                    <List spacing={1} p={3}>
                                        <ListItem>
                                            <ListIcon as={FiUser} color="blue.500" />Username:
                                            <Input
                                                id="user_name"
                                                placeholder="User Name"
                                                disabled={true}
                                                defaultValue={profile.name ? profile.name : ""}
                                                {...register("user_name")}
                                            />
                                        </ListItem>
                                    </List>
                                    <FormErrorMessage>
                                        {errors.user_name && errors.user_name.message}
                                    </FormErrorMessage>
                                </FormControl>

                                <FormControl isInvalid={errors.bio}>
                                    <List spacing={1} p={3}>
                                        <ListItem>
                                            <ListIcon as={FiBookOpen} color="blue.500" />Bio:
                                            <Textarea
                                                id="bio"
                                                placeholder="You may write your bank account details here for online payment or any message you wish to let other users know"
                                                defaultValue={profile ? profile.bio : ""}
                                                {...register("bio")}
                                            />
                                        </ListItem>
                                    </List>
                                    <FormErrorMessage>
                                        {errors.bio && errors.bio.message}
                                    </FormErrorMessage>
                                </FormControl>
                            </VStack>
                        </Center>

                        <Center>
                            <Button
                                colorScheme="blue"
                                mt={5}
                                isLoading={isSubmitting}
                                type="submit"
                            >
                                Update
                            </Button>
                        </Center>
                    </form> </> :
                <>
                    <Head>
                        <title>{profile.name}</title>
                    </Head>
                    <Center fontSize={40} pt={10}>
                        {profile.name} {"'s profile"}
                    </Center>
                    <Center>
                        <VStack width={550} mt={5}>
                            <Avatar
                                size={"2md"}
                                src={profile.profilePic ? profile.profilePic : ""}
                                alt={"Avatar Alt"}
                                mb={2}
                                pos={"relative"}
                            />
                            <List spacing={1} p={3}>
                                <ListItem>
                                    <ListIcon as={FiUser} color="blue.500" />Username: {"  "} {profile ? profile.name : ""}
                                </ListItem>
                            </List>


                            <List spacing={1} p={3}>
                                <ListItem>
                                    <ListIcon as={FiBookOpen} color="blue.500" />Bio: {" "}
                                    {profile.bio ? profile.bio : "This user is too lazy to put a bio..."}
                                </ListItem>
                            </List>
                        </VStack>
                    </Center>

                </>
                :
                <>
                    <Stack mt={3} p={3}>
                        <Skeleton height='20px' />
                        <Skeleton height='20px' />
                        <Skeleton height='20px' />
                    </Stack>
                </>
            }
        </>
    );
};

export default Profile;
