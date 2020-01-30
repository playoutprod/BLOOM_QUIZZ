import * as firebase from 'firebase';
import Config from './app';
require("firebase/auth");
require("firebase/firestore");

var FbApp = firebase.initializeApp(Config.firebaseConfig);
export default FbApp; //this doesnt have to be database only
