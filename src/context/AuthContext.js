import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../firebase-config'; 

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, [])

    const value = {
        currentUser,
    }

    return (
        <AuthContext.Provider value={value}>
        { !loading && children }
        </AuthContext.Provider>
    )
}
