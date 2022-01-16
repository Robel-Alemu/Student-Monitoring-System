import firebase from "firebase/app";
import "firebase/auth";
// const firebaseConfig = {
//     apiKey: "AIzaSyCoF6rtp-did5FLcPmjbEejYracJQ34AOc",
//     authDomain: "student-monitoring-syste-f30aa.firebaseapp.com",
//     projectId: "student-monitoring-syste-f30aa",
//     storageBucket: "student-monitoring-syste-f30aa.appspot.com",
//     messagingSenderId: "488674718517",
//     appId: "1:488674718517:web:52e1a7053def64d67b127c"
//   };

const firebaseConfig = {
  apiKey: "AIzaSyAcFQZ9jbwRK2AXjMHupAz2i52stPyNpxQ",
  authDomain: "phoneauth2-c5056.firebaseapp.com",
  projectId: "phoneauth2-c5056",
  storageBucket: "phoneauth2-c5056.appspot.com",
  messagingSenderId: "912691844942",
  appId: "1:912691844942:web:c50c23a1112af73f4c701f"
};
  
  // Initialize Firebase
  
  export const app = firebase.initializeApp(firebaseConfig);
 
  export const auth = app.auth()

