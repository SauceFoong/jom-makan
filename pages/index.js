import Head from "next/head";
import Image from "next/image";
import { Button } from "@material-ui/core";
import firebase from "../lib/initFirebase";
import FirebaseAuth from "../components/FirebaseAuth";
import { useRouter } from "next/router";
import { getUserFromCookie } from "../lib/auth/userCookies";
import router from "next/router";

firebase();

export default function Home() {
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
