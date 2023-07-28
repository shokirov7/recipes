import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBGjZeTYmNBtaho_lbUNHw10arlLsh9fPk",
  authDomain: "cooking-amir.firebaseapp.com",
  projectId: "cooking-amir",
  storageBucket: "cooking-amir.appspot.com",
  messagingSenderId: "127772502282",
  appId: "1:127772502282:web:5fd8166ebfbd815489b2f3",
  measurementId: "G-5V6CGVX6YZ",
};

firebase.initializeApp(firebaseConfig);

const projectFirestore = firebase.firestore();

export { projectFirestore };
