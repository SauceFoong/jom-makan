import firebase from "firebase/app";

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

export function createFeedback(feedback) {
  db.collection("feedbacks").add(feedback);
}

export async function addJom(jom) {
  const docRef = await db.collection("jom").doc();
  const jomId = docRef.id;

  jom = {
    ...jom,
    id: jomId,
  };
  //add jom
  db.collection("jom")
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
