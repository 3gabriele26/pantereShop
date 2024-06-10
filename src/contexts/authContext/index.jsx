import PropTypes from 'prop-types';
import { onAuthStateChanged } from "firebase/auth";

import React, { useContext, useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, inizializeUser)
        return unsubscribe
    }, [])

    async function inizializeUser(user) {
        if(user) {
            setCurrentUser({ ...user })
            setUserLoggedIn(true)
        } else {
            setCurrentUser(null)
            setUserLoggedIn(false)
        }

        setLoading(false)
    }

    const value = {
        currentUser,
        userLoggedIn,
        loading
    }

    return (
        <AuthContext.Provider value={value} >
            {!loading && children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.object.isRequired
};