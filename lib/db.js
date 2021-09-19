import { EmailIcon } from "@chakra-ui/icons";
import firebase from "firebase/app";
import { snapshotViewportBox } from "framer-motion";

export const db = firebase.firestore();

export function updateUser(uid, user) {
  db.collection("users").doc(uid).set(user);
}

export async function createOrder(order) {
  const docRef = await db.collection("orders").doc();
  const id = docRef.id;

  order = {
    ...order,
    id: id,
  };

  db.collection("orders")
    .doc(id)
    .set(order)
    .catch((error) => {
      console.log("Error adding order: ", error);
    });
}

export async function updateOrder(id, order) {
  db.collection("orders")
    .doc(id)
    .update(order)
    .catch((error) => {
      console.log("Error updating order: ", error);
    });
}

export async function deleteOrder(id) {
  db.collection("orders")
    .doc(id)
    .delete()
    .catch((error) => {
      console.log(error);
    });
}

export async function getUserDetails(uid) {
  const doc = await db.collection("users").doc(uid).get();
  console.log(doc);
  const user = {
    id: doc.data().id,
    email: doc.data().email,
    lastLogin: doc.data().lastLogin,
    name: doc.data().name,
    profilePic: doc.data().profilePic,
  };
  return { user };
}

export async function getJomDetails(order_id) {
  const doc = await db.collection("joms").doc(order_id).get();
  const jom = {
    id: doc.data().id,
    order_id: order_id,
    remark: doc.data().remark,
    created_at: doc.data().created_at,
    user_id: doc.data().user_id,
  };
  return { jom };
  // console.log(doc);
}

export function createFeedback(feedback) {
  db.collection("feedbacks").add(feedback);
}

export async function createJom(jom) {
  const docRef = await db.collection("jom").doc();
  const jomId = docRef.id;

  jom = {
    ...jom,
    id: jomId,
  };
  //add jom
  db.collection("joms")
    .doc(jomId)
    .set(jom)
    .catch((error) => {
      console.log("Error creating jom: ", error);
    });
  //update order jom members list
  db.collection("orders")
    .doc(jom.order_id)
    .update({
      jom_members: firebase.firestore.FieldValue.arrayUnion(jom.user_id),
    });
}

export async function getUserOrderJom(order_id, user_id) {
  const snapshot = await db
    .collection("joms")
    .where("order_id", "==", order_id)
    .where("user_id", "==", user_id)
    .get();
  const joms = [];
  snapshot.forEach((doc) => {
    joms.push({ id: doc.id, ...doc.data() });
  });

  return joms;
}

export async function deleteJom(jom) {
  db.collection("joms")
    .doc(jom.id)
    .delete()
    .catch((error) => {
      console.log(error);
    });
  //update order jom members list
  db.collection("orders")
    .doc(jom.order_id)
    .update({
      jom_members: firebase.firestore.FieldValue.arrayRemove(jom.user_id),
    });
}
