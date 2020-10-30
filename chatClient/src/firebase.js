import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';


//add your firebase credentials here
var firebaseConfig = {

};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();



export const googleSignIn = () => {
    firebase.auth().signInWithPopup(provider).catch(function(error) {
        console.log(error)
    });
}