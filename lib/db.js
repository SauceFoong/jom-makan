import firebase from "firebase/app";

export const db = firebase.firestore();
export const storage = firebase.storage();


export async function createUser(uid, user) {
  await db.collection("users").doc(uid).set(user);
}

export async function getUser(uid) {

}

export async function userLogin(uid, user) {

  const doc = await db.collection("users").doc(uid).get();
  const existingUser = {
    ...user,
    name: doc.data().name,
  };

  await db.collection("users").doc(uid).set(existingUser);

}

export async function updateProfileDetails(uid, user, profile) {
  const newUserInfo = {
    id: user.id,
    email: user.email,
    name: profile.user_name,
    bio: profile.bio,
    updatedAt: profile.updated_at,
    lastLogin: profile.last_login,
    profilePic: user.profilePic
  };

  await db.collection("users").doc(uid).set(newUserInfo);
}

export async function createOrder(order) {
  const docRef = await db.collection("orders").doc();
  const id = docRef.id;

  order = {
    ...order,
    id: id,
  };

  await db.collection("orders")
    .doc(id)
    .set(order)
    .catch((error) => {
      console.log("Error adding order: ", error);
    });
}

export async function updatePayment(jom_id, jom, order_id, user_id) {
  const creator_id = await (
    await db.collection("orders").doc(order_id).get()
  ).data().created_by;
  if (creator_id == user_id) {
    db.collection("joms")
      .doc(jom_id)
      .update(jom)
      .catch((error) => {
        console.log("Error updating jom: ", error);
      });
  } else {
    return false;
  }
}

export async function updateJom(jom) {
  await db.collection("joms")
    .doc(jom.id)
    .update(jom)
    .catch((error) => {
      console.log("Error updating remark: ", error);
    });
}

export async function updateOrder(id, order) {
  await db.collection("orders")
    .doc(id)
    .update(order)
    .catch((error) => {
      console.log("Error updating order: ", error);
    });
}

export async function deleteOrder(id) {
  await db.collection("orders")
    .doc(id)
    .delete()
    .catch((error) => {
      console.log(error);
    });
}

export async function duplicateOrder(orderId) {
  const doc = await db.collection("orders").doc(orderId).get();
  // console.log(doc);
  const order = {
    id: doc.data().id,
    res_name: doc.data().res_name,
    ref_url: doc.data().ref_url,
    tips: doc.data().tips,
    description: doc.data().description,
    order_date: doc.data().order_date,
    order_receipt: "",
    jom_members: [],
    order_type: doc.data().order_type,
    tags: doc.data().tags,
    created_at: new Date().toISOString(),
    last_update: new Date().toISOString(),
    created_by: doc.data().created_by,
  };

  const docRef = await db.collection("orders").doc();
  const id = docRef.id;

  const newOrder = {
    ...order,
    id: id,
  };

  await db.collection("orders")
    .doc(id)
    .set(newOrder)
    .catch((error) => {
      console.log("Error duplicating order: ", error);
    });
}

export async function getUserDetails(uid) {
  const doc = await db.collection("users").doc(uid).get();

  if (doc.exists) {
    const user = {
      id: doc.data().id,
      email: doc.data().email,
      lastLogin: doc.data().lastLogin,
      name: doc.data().name,
      profilePic: doc.data().profilePic,
      bio: doc.data().bio,
    };
    return { user };
  } else {
    return false
  }


}

export async function getOrder(order_id) {
  const doc = await db.collection("orders").doc(order_id).get().orderBy("order_date");
  // console.log(doc);
  const order = {
    id: doc.data().id,
    res_name: doc.data().res_name,
    ref_url: doc.data().ref_url,
    tips: doc.data().tips,
    description: doc.data().description,
    order_date: doc.data().order_date,
    order_receipt: doc.data().order_receipt,
    jom_members: doc.data().jom_members,
  };
  return { order };
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

export async function uploadOrderReceipt(orderId, imageFiles) {
  await Promise.all(
    Object.keys(imageFiles).map(async (key) => {
      const file = imageFiles[key];
      const fileRef = storage.ref().child(`${orderId}-ORec-${file.name}`);
      await fileRef.put(file);
      const fileUrl = await fileRef.getDownloadURL();
      //   console.log(fileUrl);
      await db
        .collection("orders")
        .doc(orderId)
        .update({
          order_receipt: firebase.firestore.FieldValue.arrayUnion(fileUrl),
        });
    })
  );
}

export async function deleteOderReceipt(orderId) {
  await db.collection("orders").doc(orderId).update({
    order_receipt: [],
  });
  console.log("Deleted");
}

export async function uploadPaymentReceipt(jomId, imageFiles) {
  console.log(imageFiles);
  await Promise.all(
    Object.keys(imageFiles).map(async (key) => {
      const file = imageFiles[key];
      const fileRef = storage.ref().child(`${jomId}-ORec-${file.name}`);
      await fileRef.put(file);
      const fileUrl = await fileRef.getDownloadURL();
      //   console.log(fileUrl);
      await db
        .collection("joms")
        .doc(jomId)
        .update({
          payment_receipt: firebase.firestore.FieldValue.arrayUnion(fileUrl),
        });
    })
  );
}
