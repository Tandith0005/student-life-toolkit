import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import auth from "../../firebase.config";
import toast from "react-hot-toast";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  // Firebase Observer
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        toast.success(`Welcome, ${currentUser.email}!`);
      }
    });
    // Cleanup subscription if user does mount
    return () => unsubscribe();
  }, []);

  //   Email Password Authentication
  //   Login with email,password
  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  // Login with Google
  const loginWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  }
  // Sign Up
  const signUp = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // update user profile
  const updateUserProfile = (name) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
    });
  };
  //  Sign Out
  const logOut = () => {
    setLoading(true);
    toast.success("Successfully logged out!");
    return signOut(auth);
  };
  

  const value = {
    user,
    loading,
    setLoading,
    login,
    loginWithGoogle,
    signUp,
    updateUserProfile,
    logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
