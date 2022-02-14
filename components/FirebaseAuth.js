import initFirebase from "../lib/initFirebase";
import { useEffect, useState } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/app";
import "firebase/auth";
import { setUserCookie } from "../lib/auth/userCookies";
import { mapUserData } from "../lib/auth/mapUserData";
import { createUser, userLogin, getUserDetails } from "../lib/db";
import router from "next/router";

initFirebase();

const firebaseAuthConfig = {
  signInFlow: "popup",
  // Auth providers
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  credentialHelper: "none",
  callbacks: {
    signInSuccessWithAuthResult: async ({ user }, redirectUrl) => {
      const isUserExist = await getUserDetails(user.uid);
      let userData = "";
      if (isUserExist) {
        const existingUser = isUserExist.user;
        await userLogin(user.uid, {
          id: user.uid,
          email: user.email,
          profilePic: user.photoURL,
          lastLogin: new Date(),
        });

        userData = mapUserData({ ...user, name: existingUser.name });
      } else {
        const newUser = {
          id: user.uid,
          email: user.email,
          name: user.displayName,
          profilePic: user.photoURL,
          lastLogin: new Date(),
        }
        await createUser(user.uid, newUser);
        userData = mapUserData({ ...user, name: user.displayName });
      }

      setUserCookie(userData);
      router.push("/order");
      return false;
    },
    signInFailure: function (error) {
      // For merge conflicts, the error.code will be
      // 'firebaseui/anonymous-upgrade-merge-conflict'.
      console.log("failed");
    },
  },
};

const FirebaseAuth = () => {
  // Do not SSR FirebaseUI, because it is not supported.
  // https://github.com/firebase/firebaseui-web/issues/213
  const [renderAuth, setRenderAuth] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setRenderAuth(true);
    }
  }, []);
  return (
    <div>
      {renderAuth ? (
        <StyledFirebaseAuth
          uiConfig={firebaseAuthConfig}
          firebaseAuth={firebase.auth()}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default FirebaseAuth;
