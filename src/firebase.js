import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword,
        getAuth, 
        signInWithEmailAndPassword, 
        signOut } from "firebase/auth";
import {addDoc, 
        collection, 
        getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const VITE_FIREBASE_APIKEY = import.meta.env.VITE_FIREBASE_APIKEY;

const firebaseConfig = {
  apiKey : VITE_FIREBASE_APIKEY,
  authDomain: "netflix-clone-db824.firebaseapp.com",
  projectId: "netflix-clone-db824",
  storageBucket: "netflix-clone-db824.appspot.com",
  messagingSenderId: "291738768706",
  appId: "1:291738768706:web:cc88b5518d98aeb11664db"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

const signup = async (name , email , password) => {
    try{

        const res = await createUserWithEmailAndPassword(auth , email, password)
        const user = res.user;
        await addDoc(collection(db , "user"), {
            uid : user.uid,
            name,
            authprovider : "local",
            email
        })

    }catch(error){
        toast.error(error.code.split('/')[1].split('-').join(" "));

    }
}

const login = async (email ,password) =>{
    try{
        await signInWithEmailAndPassword(auth , email ,password)
    }catch(error){
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(" "));    
    }
}
const logout = () => {
    signOut(auth)
}
export {auth , db , login , signup , logout }