import firebase from "firebase/app";
import 'firebase/auth';
  var firebaseConfig = {
    apiKey: "AIzaSyC0z5Wz8mDX41b6KsFqwMSMEFiDTSbWeNE",
    authDomain: "quizapp-49dc7.firebaseapp.com",
    databaseURL: "https://quizapp-49dc7.firebaseio.com",
    projectId: "quizapp-49dc7",
    storageBucket: "",
    messagingSenderId: "825675718657",
    appId: "1:825675718657:web:2b38b19b3508fbcd"
  };
  // Initialize Firebase
 let firebaseapp = firebase.initializeApp(firebaseConfig);
 var provider = new firebase.auth.FacebookAuthProvider();

let providerapp = provider.setCustomParameters({'display': 'popup'});
export {firebaseapp,providerapp }
