import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signOut } from "firebase/auth";
import { getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBv-Ok0QXIjZ27duNVwmfDx-O3xnt_7o1c",
  authDomain: "fir-course-a0b12.firebaseapp.com",
  projectId: "fir-course-a0b12",
  storageBucket: "fir-course-a0b12.appspot.com",
  messagingSenderId: "470764678620",
  appId: "1:470764678620:web:3f0780f00d6adfb5ecf319",
  measurementId: "G-3EQZLNRB89"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const signout = signOut;
export const db = getFirestore(app);
export const storage = getStorage(app);