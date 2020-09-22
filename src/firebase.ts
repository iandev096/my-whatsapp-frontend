import firebase from 'firebase';

export const firebaseConfig = {
  apiKey: "AIzaSyBGin0bwhpzITrT3muMeKJWZetoSPO8Jr4",
  authDomain: "my-whatsapp-f7a19.firebaseapp.com",
  databaseURL: "https://my-whatsapp-f7a19.firebaseio.com",
  projectId: "my-whatsapp-f7a19",
  storageBucket: "my-whatsapp-f7a19.appspot.com",
  messagingSenderId: "725976984148",
  appId: "1:725976984148:web:559694bd6fc79ee4a51bc1",
  measurementId: "G-S7SVMEGNQM"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};