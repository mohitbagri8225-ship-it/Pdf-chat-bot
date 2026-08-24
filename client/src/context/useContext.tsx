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

export type User = {
    fullName: string;
    email: string;
    isLoggedIn: boolean
};

export interface UserContextInterface {
    user: User;
    setUser: Dispatch<SetStateAction<User>>;
}

const defaultState: UserContextInterface = {
    user: {
        fullName: "",
        email: "",
        isLoggedIn: false
    },
    setUser: () => { },
};

export const UserContext = createContext(defaultState);

type UserProviderProps = {
    children: ReactNode;
};

export default function UserProvider({ children }: UserProviderProps) {
    const [user, setUser] = useState<User>({
        fullName: "",
        email: "",
        isLoggedIn: false
    });

    useEffect(() => {
        const getMe = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5000/api/v1/user/me",
                    { withCredentials: true }
                ); 
                
                setUser({
                    ...response.data.data,
                    isLoggedIn: true,
                });
            } catch {
                console.log("error in fetching me");
            }
        };

        getMe();
        console.log(user);
        
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}