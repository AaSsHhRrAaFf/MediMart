// src/Context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import app from '../firebase.config'; // Make sure this path is correct

import api from '../services/api';



const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  }

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  }

  const signInWithGoogle = async () => {
    setLoading(true);
    try{
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
       // Assign default 'user' role after Google sign-in
        user.role = 'user'; // Modify as per your role management

        // Create or get token from server

          const response = await api.post('/auth/google-login', {
            email: user.email,
          });
          const token = response.data.token;
          localStorage.setItem('accessToken',token)
      setUser(user);

      return user;

    }
    catch(error){
      console.error(error)
    }
    finally{
      setLoading(false)
    }
  }

  const logOut = () => {
    setLoading(true);
    localStorage.removeItem('accessToken')
    return signOut(auth);
  }

 /*  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
          setUser(currentUser);

          const token = localStorage.getItem('accessToken'); // Verify if there is a token when the app loads
           if(!token) {
            try{
                const response = await api.post('/auth/login-with-token',{
                    email: currentUser.email
                })

                localStorage.setItem('accessToken', response.data.token)

              }catch(error){
                console.error(error)
              }
            }
      } else {
        setUser(null);
      }
        setLoading(false);
    });

    return () => unsubscribe();
  }, []) */

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
          setUser(currentUser);

          const token = localStorage.getItem('accessToken'); // Verify if there is a token when the app loads
           if(!token) {
            try{
                const response = await api.post('/auth/login-with-token',{
                    email: currentUser.email
                })

                localStorage.setItem('accessToken', response.data.token)

              }catch(error){
                console.error(error)
              }
            }
      } else {
        setUser(null);
      }
        setLoading(false);
    });

    return () => unsubscribe();
  }, [])



  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    signInWithGoogle,
    logOut
  }

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
}
