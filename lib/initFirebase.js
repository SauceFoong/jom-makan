import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/firestore";
import "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyDp9_1V4vncfirm_ommuBWjYGU8hlv41WY",
//   authDomain: "jommakan-47852.firebaseapp.com",
//   projectId: "jommakan-47852",
//   storageBucket: "jommakan-47852.appspot.com",
//   messagingSenderId: "717437165489",
//   appId: "1:717437165489:web:f21d8ea07fb64fa407e790",
// };

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// if (typeof window !== "undefined" && !firebase.apps.length) {
//   const db_init = firebase.initializeApp(firebaseConfig);
// }
// const analytics = firebase.analytics();
// const db = firebase.firestore();
// const auth = firebase.auth();
// const storage = firebase.storage();
// export { analytics, db, auth, storage };

export default function initFirebase() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);

    if (typeof window !== "undefined") {
      if ("measurementId" in firebaseConfig) {
        firebase.analytics();
        firebase.performance();
      }
    }
    console.log("Firebase was successfully init");
  }
}
