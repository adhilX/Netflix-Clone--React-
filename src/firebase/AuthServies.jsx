import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore/lite";
import { auth, db } from "./firebase";
import { toast } from "react-toastify";

const errorMessages = {
    'auth/email-already-in-use': 'This email is already registered.',
    'auth/weak-password': 'Password should be at least 6 characters.',
    'auth/invalid-credential': 'Incorrect Email or Password.',
  };

const signup = async (name,email, password)=>{

    try {
      const response=  await createUserWithEmailAndPassword(auth,email,password)
      const user = response.user
      await addDoc(collection(db, 'User'),{
        uid:user.uid,
        name ,
        email
      })
      toast.success('Logged in Sucessfully')

    } catch (error) {
        console.log('Sign up error',error)
        const errorCode = error.code
        const message = errorMessages[errorCode] || 'Something went wrong , Please try again'
        toast.error(message)
    }
}


const login = async (email, password)=>{
    try {
       await signInWithEmailAndPassword(auth, email, password)
       toast.success('Logged in Sucessfully')
    } catch (error) {
        console.log(error)
        const errorCode = error.code
        const message = errorMessages[errorCode] || 'Something went wrong , Please try again'
        toast.error(message)

    }
}

const logout =  async()=>{
    signOut(auth)
    toast.success('Logged Out Sucessfully')

}

export{ login , logout , signup}