import firebase from "firebase";

const Config = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  databaseURL: process.env.DATABASEURL,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID
};

firebase.initializeApp(Config);

export const db = firebase.firestore();
export const timestamp = firebase.firestore.FieldValue.serverTimestamp();

export default async ({ Vue }) => {
  Vue.prototype.$firebase = firebase;
  Vue.prototype.$db = db;
  Vue.prototype.$timestamp = timestamp;
};
