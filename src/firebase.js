import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA0czoastYcmC8LpLsQAQ4Bi76MValQICg",
  authDomain: "minh1303-utube.firebaseapp.com",
  projectId: "minh1303-utube",
  storageBucket: "minh1303-utube.appspot.com",
  messagingSenderId: "394703223114",
  appId: "1:394703223114:web:6956c267a3a3941f87a9b3",
};
firebase.initializeApp(firebaseConfig);

export default firebase.auth();
