// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { initializeFirestore } from 'firebase/firestore';
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhYhA-8PNg_HHjzIdIa_RFK51LwhIkIZ0",
  authDomain: "aulafirebaserafaelunipam.firebaseapp.com",
  projectId: "aulafirebaserafaelunipam",
  storageBucket: "aulafirebaserafaelunipam.firebasestorage.app",
  messagingSenderId: "160659899450",
  appId: "1:160659899450:web:f6ffc3ab725236bdcc2103"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase
const db = initializeFirestore(app, {
    experimentalForceLongPolling: true,
    useFetchStreams: false,
});

export { db };