import initFirebase from "../lib/initFirebase";
import { useEffect, useState } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/app";
import "firebase/auth";
import { setUserCookie } from "../lib/auth/userCookies";
import { mapUserData } from "../lib/auth/mapUserData";
import { updateUser } from "../lib/db";
import router from "next/router";
initFirebase();

const firebaseAuthConfig = {
  signInFlow: "popup",
  // Auth providers
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  signInSuccessUrl: "/order",
  credentialHelper: "none",
  callbacks: {
    signInSuccessWithAuthResult: ({ user }, redirectUrl) => {
      updateUser(user.uid, {
        id: user.uid,
        name: user.displayName,
        email: user.email,
        profilePic: user.photoURL,
        lastLogin: new Date(),
      });
      const userData = mapUserData(user);
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
