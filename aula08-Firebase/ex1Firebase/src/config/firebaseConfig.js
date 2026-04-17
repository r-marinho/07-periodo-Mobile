import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC_Ly9JWoLchj1s5DZjVd2nDZYJu9FA7-M",
  authDomain: "unipam-rafael-app.firebaseapp.com",
  projectId: "unipam-rafael-app",
  storageBucket: "unipam-rafael-app.firebasestorage.app",
  messagingSenderId: "462480315196",
  appId: "1:462480315196:web:60dbf3f2ab379fab120439"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);