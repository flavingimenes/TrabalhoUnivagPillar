import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const recoveredUser = localStorage.getItem('user_token');
        if (recoveredUser) {
            setUser(recoveredUser);
        }
        setLoading(false);
    }, []);

    const login = (token) => {
        localStorage.setItem('user_token', token);
        setUser(token);
    };

    const logout = () => {
        localStorage.removeItem('user_token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ authenticated: !!user, user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);