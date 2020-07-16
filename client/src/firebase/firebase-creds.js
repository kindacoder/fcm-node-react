import firebase from 'firebase/app';
import 'firebase/messaging';
import { firebaseConfig } from './firebaseConfig';
const config = firebaseConfig
firebase.initializeApp(config);
export const messaging = firebase.messaging();
