import Head from "next/head";
import Image from "next/image";
import { Button } from "@material-ui/core";
import firebase from "../firebase/initFirebase";
import FirebaseAuth from "../service/auth/FirebaseAuth";
import { useRouter } from "next/router";
import { getUserFromCookie } from "../firebase/auth/userCookies";

firebase();

export default function Home() {
  const router = useRouter();

  const userFromCookie = getUserFromCookie();
  if (userFromCookie) {
    router.push("/order");
  }
  return (
    <div>
      <Head>
        <title>Jom Makan</title>
        <meta name="keywords" content="a place for you to order food" />
      </Head>
      <h1>Welcome to Jom Makan</h1>
      <FirebaseAuth />
    </div>
  );
}
