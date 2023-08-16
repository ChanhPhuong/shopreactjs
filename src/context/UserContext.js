import React from "react";
import { useState } from "react";

const UserContext = React.createContext({ username: '', password: '', auth: false });

const UserProvider = ({ children }) => {
    const [user, setUser] = React.useState({ username: '', password: '', auth: false });

    const loginContext = (username, password, token) => {
        setUser((user) => ({
            username: username,
            password: password,
            auth: true,
        }));
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);

    };

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("username")
        localStorage.removeItem("password")
        setUser((user) => ({
            username: '',
            password: '',
            auth: false,
        }));
    };
    return (
        <UserContext.Provider value={{ user, loginContext, logout }}>
            {children}
        </UserContext.Provider>
    );

};

export { UserContext, UserProvider };