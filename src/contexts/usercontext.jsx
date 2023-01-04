import React, { createContext, useState } from "react";

const UserContext = createContext({
    setPassword: () => null,
    Password: null,
    setEmail: () => null,
    Email: null,

});

export function UserProvider({ children }) {
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    console.log(Email, Password)
    return (
        <UserContext.Provider value={{ Email, setEmail, Password, setPassword }}>{children}</UserContext.Provider>
    )
}

export default UserContext;
