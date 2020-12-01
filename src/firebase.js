import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

firebase.initializeApp({
  apiKey: "AIzaSyCTkYa8Oea0gGKZXTUOTa-UTP72rSB81dw",
  authDomain: "backseat-driver-dbc21.firebaseapp.com",
  databaseURL: "https://backseat-driver-dbc21.firebaseio.com",
  projectId: "backseat-driver-dbc21",
  storageBucket: "backseat-driver-dbc21.appspot.com",
  messagingSenderId: "136877489486",
  appId: "1:136877489486:web:911ab156f0092c1515321f",
  measurementId: "G-N9KYGB0YPM"
})

const firestore = firebase.firestore()

export default firebase
