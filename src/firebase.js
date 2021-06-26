  import firebase from 'firebase/app';
  import 'firebase/firestore';
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyC8fh_PGrzcmEV89J_Y-_1pSDbB4eDrA7A",
    authDomain: "sts-manager-e9639.firebaseapp.com",
    projectId: "sts-manager-e9639",
    storageBucket: "sts-manager-e9639.appspot.com",
    messagingSenderId: "501846605386",
    appId: "1:501846605386:web:91a2ba481334646c1bf0b3",
    measurementId: "G-5T6L3HQ4G7"
  };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    export default firebase;