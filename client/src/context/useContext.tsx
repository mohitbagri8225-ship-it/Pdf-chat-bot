/* eslint-disable react-refresh/only-export-components */

import axios from "axios";
import {
  createContext,
  useEffect,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

export interface SideChat {
  chatId: string;
  question: string;
}

export type User = {
  fullName: string;
  email: string;
  isLoggedIn: boolean | null;
};

export interface UserContextInterface {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;

  sideChats: SideChat[];
  fetchData: () => Promise<void>;
}

const defaultState: UserContextInterface = {
  user: {
    fullName: "",
    email: "",
    isLoggedIn: false,
  },

  setUser: () => {},

  sideChats: [],

  fetchData: async () => {},
};

export const UserContext =
  createContext<UserContextInterface>(defaultState);

type UserProviderProps = {
  children: ReactNode;
};

export default function UserProvider({
  children,
}: UserProviderProps) {
  const [user, setUser] = useState<User>({
    fullName: "",
    email: "",
    isLoggedIn: null,
  });

  const [sideChats, setSideChats] = useState<SideChat[]>([]);

   // Fetch sidebar chats
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/chat/get-side-chats",
        {
          withCredentials: true,
        }
      );

      setSideChats(response.data.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(
          error.response?.data?.message ||
            "Side chat fetching failed"
        );
      } else {
        alert("Fetching of side chats failed");
      }
    }
  };

  // Fetch logged-in user
useEffect(() => {
  const getMe = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/user/me",
        {
          withCredentials: true,
        }
      );

      console.log("API:", response.data.data);

      setUser({
        ...response.data.data,
        isLoggedIn: true,
      });

      await fetchData();
      console.log(user);
      
    } catch (error) {
      setUser({
        ...user,
        isLoggedIn: false,
      });
      console.log("error in fetching me", error);
    }
  };

  getMe();
}, []);


  
 

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        sideChats,
        fetchData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}