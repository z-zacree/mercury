import { UserData } from "@models";
import { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  Reducer,
  useEffect,
  useReducer,
} from "react";
import { auth, fs } from "../firebase";

type State = {
  user: User | null;
  data: UserData | null;
  isLoading: boolean;
};

type Action = {
  type: "SET_USERDATA" | "SET_DATA" | null;
  payload?: {
    user?: User | null;
    data?: UserData | null;
    isLoading?: boolean;
  };
};

interface ContextProps {
  state: State;
  dispatch: Dispatch<Action>;
}

export const AuthContext = createContext<ContextProps>({
  state: {
    isLoading: true,
    user: null,
    data: null,
  },
  dispatch: () => {},
});

const initValue: State = {
  user: null,
  data: null,
  isLoading: true,
};

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "SET_USERDATA":
      return {
        isLoading: false,
        user: action.payload!.user!,
        data: action.payload!.data!,
      };
    case "SET_DATA":
      return {
        ...state,
        isLoading: false,
        data: action.payload!.data!,
      };
    default:
      return {
        user: null,
        data: null,
        isLoading: false,
      };
  }
};

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initValue);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        getDoc(doc(fs, "users", user.uid)).then((doc) => {
          dispatch({ type: "SET_USERDATA", payload: { user, data: doc.data() as UserData } });
        });
      } else {
        dispatch({ type: null });
      }
    });

    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
