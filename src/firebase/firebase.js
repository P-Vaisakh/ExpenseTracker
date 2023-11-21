import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBVli9NwQUp1RFx0AGfh4nCml6YCW3keHQ",
  authDomain: "expense-tracking-256d5.firebaseapp.com",
  projectId: "expense-tracking-256d5",
  storageBucket: "expense-tracking-256d5.appspot.com",
  messagingSenderId: "108816446400",
  appId: "1:108816446400:web:4436eadd1dc2b110f80e25",
  measurementId: "G-9YVPGBYRJ1",
};

const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const db=getFirestore(app)
