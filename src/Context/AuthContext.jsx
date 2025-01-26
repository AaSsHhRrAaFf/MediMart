import React, { createContext, useState, useEffect } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import app from "../firebase.config";
import api from "../services/api";
import { toast } from "react-toastify";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRoleLoading, setUserRoleLoading] = useState(false);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      user.role = "user";

      const response = await api.post("/api/auth/google-login", {
        email: user.email,
      });
      const token = response.data.token;
      localStorage.setItem("accessToken", token);
      setUser(user);

      return user;
    } catch (error) {
      console.error(error);
      toast.error("Google sign-in failed. Please try again.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  };

  const logOut = () => {
    setLoading(true);
    localStorage.removeItem("accessToken");
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("onAuthStateChanged triggered", currentUser);
      if (currentUser) {
        setUser(currentUser);
        const token = localStorage.getItem("accessToken");
        if (!token) {
          try {
            const response = await api.post("/api/auth/login-with-token", {
              email: currentUser.email,
            });
            localStorage.setItem("accessToken", response.data.token);
          } catch (error) {
            console.error("Error fetching token on reload:", error);
            setUser(null);
            toast.error("Authentication failed. Please log in again.", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            localStorage.removeItem("accessToken");
          }
        }
        // Fetch user from DB and set role on user object
        try {
          setUserRoleLoading(true);
          const response = await api.get("/api/users/user-info");
          console.log("user info from server", response.data);
          setUser((prevUser) => ({
            ...prevUser,
            role: response.data.role,
          }));
        } catch (error) {
          console.error("Failed to fetch user role:", error);
          toast.error("Failed to fetch user role. Please try again later.", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } finally {
          setUserRoleLoading(false);
          setLoading(false);
        }
      } else {
        setUser(null);
        console.log("user set to null");
        localStorage.removeItem("accessToken");
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    userRoleLoading,
    loading,
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};
