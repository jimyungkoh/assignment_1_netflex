import { createContext, useContext, useState } from "react";

const initialValue = {
  signedIn: false,
  signIn: () => {},
  signOut: () => {},
};

const AuthContext = createContext(initialValue);

export function AuthProvider({ children }) {
  const [signedIn, setSignedIn] = useState(false);

  const signIn = () => setSignedIn(true);
  const signOut = () => setSignedIn(false);

  const value = {
    signedIn,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
