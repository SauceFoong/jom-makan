import Head from "next/head";
import firebase from "../lib/initFirebase";
import FirebaseAuth from "../components/FirebaseAuth";
import { getUserFromCookie } from "../lib/auth/userCookies";
import router from "next/router";
import {
  Box,
  Button,
  Flex,
  Image,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useUser } from "../lib/auth/useUser";
// firebase();

export default function Home() {
  const { user, logout } = useUser();
  const userFromCookie = getUserFromCookie();
  if (userFromCookie) {
    router.push("/order");
  }
  // if (user) {
  //   console.log("authenticated");
  // }
  return (
    <div>
      <Head>
        <title>Jom Makan</title>
        <meta name="keywords" content="a place for you to order food" />
      </Head>
      {user ? <h2>Please Sign Out First</h2> : <FirebaseAuth />}
      {/* <FirebaseAuth /> */}
    </div>
  );
}
