import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyArhO0i9fWRS02GJzm55efSCLyhppNqyu8",
    authDomain: "smart-home-office.firebaseapp.com",
    projectId: "smart-home-office",
    storageBucket: "smart-home-office.appspot.com",
    messagingSenderId: "654369086164",
    appId: "1:654369086164:web:782999e12e9104e95fb941",
    
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db=firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider;

export {auth, provider};
export default db;
