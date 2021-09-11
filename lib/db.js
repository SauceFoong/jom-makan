import firebase from "firebase/app";

export const db = firebase.firestore();

export function updateUser(uid, user) {
  db.collection("users").doc(uid).set(user);
}

export function createOrder(order) {
  db.collection("orders").add(order);
}

export async function getUserDetails(uid) {
  const doc = await db.collection("users").doc(uid).get();
  const user = {
    id: doc.data().id,
    email: doc.data().email,
    lastLogin: doc.data().lastLogin,
    name: doc.data().name,
    profilePic: doc.data().profilePic,
  };
  return { user };
}
