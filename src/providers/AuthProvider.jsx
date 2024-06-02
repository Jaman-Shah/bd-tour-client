import React, { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext(null);

// google auth provider
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // creating user with email and password

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // login user with email and password form firebase

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // sing in with popup

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // sign out the user

  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  // saving the user to mongodb

  const saveUser = async (name, email, photo_url) => {
    const user = {
      name,
      email,
      photo_url,
      role: "guest",
      status: "accepted",
      createdAt: Date.now(),
    };
    try {
      const response = await axios.put("http://localhost:5006/users", user);
      console.log(response.data);
    } catch (error) {
      console.log("error form creating user", error.message);
    }
  };

  // observe auth state change

  useEffect(() => {
    if (loading) {
      return;
    }
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      const { displayName, email, photoURL } = currentUser;
      setUser(currentUser);
      console.log("current user info", displayName, email, photoURL);
      if (currentUser) {
        saveUser(displayName, email, photoURL);
      }
      setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, [loading]);
  const userInfo = {
    user,
    loading,
    setLoading,
    setUser,
    createUser,
    loginUser,
    signInWithGoogle,
    signOutUser,
  };
  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
