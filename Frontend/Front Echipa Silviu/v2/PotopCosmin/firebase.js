// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getFunctions,connectFunctionsEmulator} from "firebase/functions";
import {getAuth,connectAuthEmulator,onAuthStateChanged} from "firebase/auth";
import Constants from "expo-constants";
import * as FirebaseCore from "expo-firebase-core";

console.ignoredYellowBox = [
  "Setting a timer",
  'AsyncStorage'
];

// Your web app's Firebase configuration

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB_WQZrOdf8eHwAckNSqTybgxScBVPkd4s",
    authDomain: "ipwork-538b3.firebaseapp.com",
    projectId: "ipwork-538b3",
    storageBucket: "ipwork-538b3.appspot.com",
    messagingSenderId: "1031648209734",
    appId: "1:1031648209734:web:c59e8752348e9559735347"
  };

// Initialize Firebase
const fireApp = initializeApp(firebaseConfig);
const fireAuth = getAuth(fireApp);
const fireDB = getFirestore(fireApp);
const fireFunc = getFunctions(fireApp); 
if (__DEV__) {
  console.log("Switching to local Firebase instance...");
  const origin = "192.168.68.232";

  //firebase.auth().useEmulator(`http://${origin}:9099/`);
  //firebase.firestore().useEmulator(origin, 8080);
  connectFunctionsEmulator(fireFunc,origin,5000);
}

fireFunc.region = 'europe-west1';

onAuthStateChanged(fireAuth, user => {
    if (user != null) {
      console.log('We are authenticated now!');
    }else{
      console.log('We are not authenticated now!');
    }
  
    // Do other things
  });
export { fireApp, fireAuth, fireDB, fireFunc };