// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCFLEddXI0xQfq5NBx4jjSlsa7wk_-fK-0",
	authDomain: "spuetify.firebaseapp.com",
	projectId: "spuetify",
	storageBucket: "spuetify.appspot.com",
	messagingSenderId: "1007964955840",
	appId: "1:1007964955840:web:e6336971a5f0f8c6b9f925"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

const userCollections = db.collection('users');

export { auth, db, userCollections };