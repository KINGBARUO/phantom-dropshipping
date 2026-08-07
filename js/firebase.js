import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const firebaseConfig = {
  const firebaseConfig = {
  apiKey: "AIzaSyA2BYhVD99NeTy2h0Y0VHt1WTbCIr5Noo0",
  authDomain: "phantom-wrld.firebaseapp.com",
  projectId: "phantom-wrld",
  storageBucket: "phantom-wrld.firebasestorage.app",
  messagingSenderId: "199643142614",
  appId: "1:199643142614:web:ee69399f2435e90a2e2c77"
};
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
};
