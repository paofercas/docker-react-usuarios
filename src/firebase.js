// Import the functions you need from the SDKs you need

import fireDB from 'firebase';
import "firebase/storage"; 
import 'firebase/auth';
import 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlmTttssVQyrlwcPujxJdRazYjFWwI04M",
  authDomain: "crud1-d8809.firebaseapp.com",
  databaseURL: "https://crud1-d8809-default-rtdb.firebaseio.com",
  projectId: "crud1-d8809",
  storageBucket: "crud1-d8809.appspot.com",
  messagingSenderId: "11930997840",
  appId: "1:11930997840:web:a3fd34c85f636d4aff2d55"
};

// Initialize Firebase
var firebase =fireDB.initializeApp(firebaseConfig);

export default firebase.database().ref();