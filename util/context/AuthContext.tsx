import { createContext, FC, PropsWithChildren, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { auth, fs } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { UserData } from "../../models/user";

interface AuthProps {
  user: User | null;
  data: UserData | null;
  isLoading: boolean;
}

const initValue: AuthProps = {
  user: null,
  data: null,
  isLoading: true,
};

export const AuthContext = createContext(initValue);

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [contextValue, setContextValue] = useState<AuthProps>(initValue);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        getDoc(doc(fs, "users", user.uid)).then((doc) => {
          setContextValue({ user, data: doc.data() as UserData, isLoading: false });
        });
      } else {
        setContextValue({ user: null, data: null, isLoading: false });
      }
    });
    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
