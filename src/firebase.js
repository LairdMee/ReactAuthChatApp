// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";

import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  doc,
  query,
  where,
  getDocs,
  Timestamp,
  onSnapshot,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6EqBJsEnOtGOf-_6TboDGBdzRmyt109k",
  authDomain: "react-firebase-auth-3302a.firebaseapp.com",
  projectId: "react-firebase-auth-3302a",
  storageBucket: "react-firebase-auth-3302a.appspot.com",
  messagingSenderId: "693290235906",
  appId: "1:693290235906:web:407bfef3b3891b4f3c4f1b",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

/** -------------- Authentication -------------- */
const auth = getAuth(app);
export const logIn = async (email, password) => {
  const { user } = await signInWithEmailAndPassword(auth, email, password);

  // get the user doc from firestore
  const firestoreUser = await getFirstoreUser(email);
  return firestoreUser;
};
export const logout= async()=>{
  signOut(auth);
} 
export const signUp = async (email, password) => {
  // creates a user in the authentication service
  const { user } = await createUserWithEmailAndPassword(auth, email, password);

  // create user in firestore
  const authId = user.uid;
  const firestoreUser = await createFirestoreUser(authId, email);

  return firestoreUser;
  // try {
  //   const { user } = await createUserWithEmailAndPassword(
  //     auth,
  //     email,
  //     password
  //   );
  //   return user;
  // } catch (error) {
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  //   console.log("error code: ", errorCode);
  //   console.log("error message: ", errorMessage);
  // }
  // .then .catch example
  // createUserWithEmailAndPassword(auth, email, password)
  //   .then((userCredential) => {
  //     // Signed in
  //     const user = userCredential.user;
  //     // ...
  //   })
  //   .catch((error) => {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     // ..
  //   });
};

/** -------------- Firestore -------------- */

const db = getFirestore(app);

// add user to firestore db
const createFirestoreUser = async (authId, email) => {
  const username = email.split("@")[0];
  const userDocRef = await addDoc(collection(db, "users"), {
    authId,
    email,
    username, // default username
  });
  console.log("User Document written with ID: ", userDocRef.id);
  return {
    id: userDocRef.id,
    authId,
    email,
    username,
  };
};

const getFirstoreUser = async (email) => {
  const usersRef = collection(db, "users");

  // Create a query against the collection.
  const q = query(usersRef, where("email", "==", email));

  const userSnapshot = await getDocs(q);
  if (userSnapshot.size === 1) {
    const userDoc = userSnapshot.docs[0];
    return {
      ...userDoc.data(), // all of the document's fields
      id: userDoc.id, // doc id
    };
  }
  throw Error(`User with email ${email} has an issue`);
};

export const sendMessage = async (text, userId, username) => {
  await addDoc(collection(db, "messages"), {
    text,
    user: {
      userId,
      username,
    },
    createdTime: Timestamp.now(),
  });
};

export const listenOnMessages = (callback) => {
  const q = query(collection(db, "messages"));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const messages = [];
    querySnapshot.forEach((doc) => {
      messages.push({ ...doc.data(), messageId: doc.id });
    });
    // pass messages to function
    console.log(messages);
    callback(messages);
  });
  return unsubscribe;
};
