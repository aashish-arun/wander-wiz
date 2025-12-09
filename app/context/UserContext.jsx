"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [authUser, loadingAuth] = useAuthState(auth);
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  // Fetch Firestore user profile
  const fetchUserProfile = async (uid) => {
    try {
      const ref = doc(db, "users", uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setProfile(snap.data());
      } else {
        setProfile(null);
      }
    } catch (error) {
      console.error("Error loading profile:", error);
      setProfile(null);
    }
  };

  // Auto-load profile when Auth user changes
  useEffect(() => {
    if (authUser?.uid) {
      setLoadingProfile(true);
      fetchUserProfile(authUser.uid).finally(() =>
        setLoadingProfile(false)
      );
    } else {
      setProfile(null);
      setLoadingProfile(false);
    }
  }, [authUser]);

  return (
    <UserContext.Provider
      value={{
        authUser,
        profile,
        loading: loadingAuth || loadingProfile,
        refreshUser: () => authUser?.uid && fetchUserProfile(authUser.uid),
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

// Custom Hook
export function useUser() {
  return useContext(UserContext);
}