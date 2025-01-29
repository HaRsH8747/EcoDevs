import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {

  const initialData = null;


  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isEmailUser, setIsEmailUser] = useState(false);
  const [isGoogleUser, setIsGoogleUser] = useState(false);
  const [currentDBUser, setCurrentDBUser] = useState(() => {
    const storedDBData = localStorage.getItem('storedDBData');
    if (storedDBData) {
      return JSON.parse(storedDBData);
    } else {
      return initialData;
    }
  });

  useEffect(() => {
    // Only store currentDBUser in local storage if it has changed
    if (currentDBUser !== initialData) {
      localStorage.setItem("storedDBData", JSON.stringify(currentDBUser));
    }
  }, [currentDBUser]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

  async function initializeUser(user) {
    if (user) {

      setCurrentUser({ ...user });

      const isEmail = user.providerData.some(
        (provider) => provider.providerId === "password"
      );
      setIsEmailUser(isEmail);
      setUserLoggedIn(true);
      // setCurrentDBUser(user);
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
      // setCurrentDBUser(null);
    }

    setLoading(false);
  }

  const value = {
    userLoggedIn,
    isEmailUser,
    isGoogleUser,
    currentUser,
    currentDBUser,
    setCurrentDBUser,
    setCurrentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}