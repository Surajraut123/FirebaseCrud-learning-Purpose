import { useState } from "react";
import {auth, googleProvider} from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut} from 'firebase/auth';

export const Auth = () => {

    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');

    const signin = async () =>{
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error(error);
        }        

        
    }
    const SignInWithGoogle = async () =>{
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error(error);
        }        

        
    }
    const logout = async () =>{
        try {
            await signOut(auth);
        } catch (error) {
            console.error(error);
        }        

        
    }
    //Cheking user is already logged in
    // console.log(auth?.currentUser?.email);
    
    // if we loggedin with the google then we can get the profile phto of google. 
    console.log(auth?.currentUser?.photoURL);
    return (
        <div>
            <input 
                type="email" 
                placeholder="Email..." 
                onChange={(e)=> setEmail(e.target.value)}
            />
            <input 
                type="password" 
                placeholder="Password..." 
                onChange={(e)=> setPassword(e.target.value)}
            />

            <button onClick={signin}>Sign in</button>
            <button onClick={logout}>Logout</button>
            <button onClick={SignInWithGoogle}>Sign in With Google</button>
        </div>
    );
};