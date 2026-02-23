import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check local storage for current session
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }

        // Initialize dummy users if none exist
        if (!localStorage.getItem('users')) {
            const initialUsers = [
                { id: 'A1', name: 'Admin User', role: 'admin', email: 'admin@system.com', password: 'admin123' },
                { id: 'S1', name: 'Student User', role: 'student', email: 'student@system.com', password: 'student123' }
            ];
            localStorage.setItem('users', JSON.stringify(initialUsers));
        }

        setLoading(false);
    }, []);

    const login = (email, password) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const foundUser = users.find(u => u.email === email && u.password === password);

        if (foundUser) {
            const sessUser = { id: foundUser.id, name: foundUser.name, role: foundUser.role, email: foundUser.email };
            setUser(sessUser);
            localStorage.setItem('currentUser', JSON.stringify(sessUser));
            return true;
        }
        return false;
    };

    const register = (userData) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');

        // Check if email already exists
        if (users.find(u => u.email === userData.email)) {
            return { success: false, message: 'Email already registered' };
        }

        const newUser = {
            ...userData,
            id: Date.now().toString(),
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        return { success: true };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('currentUser');
    };

    const updateUser = (updatedData) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const updatedUsers = users.map(u => u.id === user.id ? { ...u, ...updatedData } : u);

        const sessUser = { ...user, ...updatedData };
        setUser(sessUser);

        localStorage.setItem('users', JSON.stringify(updatedUsers));
        localStorage.setItem('currentUser', JSON.stringify(sessUser));
        return { success: true };
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, updateUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
