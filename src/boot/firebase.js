import firebase from "firebase";

const Config = {
  apiKey: "apiKey",
  authDomain: "apiKey.firebaseapp.com",
  databaseURL: "https://apiKey.firebaseio.com",
  projectId: "apiKey",
  storageBucket: "apiKey.appspot.com",
  messagingSenderId: "apiKey",
  appId: "1:apiKey"
};
firebase.initializeApp(Config);

export const db = firebase.firestore();
export const timestamp = firebase.firestore.FieldValue.serverTimestamp();

export default async ({Vue}) => {
  Vue.prototype.$firebase = firebase;
  Vue.prototype.$db = db;
  Vue.prototype.$timestamp = timestamp;
}