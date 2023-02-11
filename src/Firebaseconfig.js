import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyALp_uA79FLljBCfvrlS78uw8PTtv8rD2o",
  authDomain: "to-do-e8dcf.firebaseapp.com",
  projectId: "to-do-e8dcf",
  storageBucket: "to-do-e8dcf.appspot.com",
  messagingSenderId: "356388981988",
  appId: "1:356388981988:web:576bc1372125eab19430f1"
};

const app = initializeApp(firebaseConfig);

export default firebaseConfig;