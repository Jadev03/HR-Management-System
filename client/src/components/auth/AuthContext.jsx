import { createContext,useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isLoggedin, setIsLoggedin] = useState(false);

    return (
        <AuthContext.Provider value={{isLoggedin, setIsLoggedin}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}