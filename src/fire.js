import firebase from "firebase";
import "firebase/firestore";

var config = {
    apiKey: "AIzaSyDuKMWRA_FxCS7HimRnNHVIFmHW4fve9kA",
    authDomain: "sonnyplayer-e1ac9.firebaseapp.com",
    databaseURL: "https://sonnyplayer-e1ac9.firebaseio.com",
    projectId: "sonnyplayer-e1ac9",
    storageBucket: "sonnyplayer-e1ac9.appspot.com",
    messagingSenderId: "875728702350",
    appId: "1:875728702350:web:21d302aceb2587f228b2df",
    measurementId: "G-XYEXFLH928"
};

var fire = firebase.initializeApp(config);
export default fire;