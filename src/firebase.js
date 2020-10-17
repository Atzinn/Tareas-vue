import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

var firebaseConfig = {
    apiKey: "AIzaSyDJcDscn7K0ZqFVqjAMmCYXYGRZpNQRzIU",
    authDomain: "auth-vue-2d4dc.firebaseapp.com",
    databaseURL: "https://auth-vue-2d4dc.firebaseio.com",
    projectId: "auth-vue-2d4dc",
    storageBucket: "auth-vue-2d4dc.appspot.com",
    messagingSenderId: "1037210357034",
    appId: "1:1037210357034:web:b693543e72e4bf0dcd2253"
}

// Initialize firebase
firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const auth = firebase.auth()

export {
    db,
    auth
}