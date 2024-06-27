import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBCwwzCIPQusZRw-UaLQT1qeiCeg-aH3lI",
  authDomain: "k-clone-4a717.firebaseapp.com",
  projectId: "k-clone-4a717",
  storageBucket: "k-clone-4a717.appspot.com",
  messagingSenderId: "307025836907",
  appId: "1:307025836907:web:4ff1fee864362682152a2e",
  measurementId: "G-FS418KDL5W",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
