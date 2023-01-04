import React, { createContext, useState } from "react";

const CurrentUserContext = createContext({
    setCurrentUser: () => null,
    CurrentUser: null,
});

export function CurrentUserProvider({ children }) {
    const [CurrentUser, setCurrentUser] = useState("")
    return (
        <CurrentUserContext.Provider value={{ CurrentUser,setCurrentUser }}>{children}</CurrentUserContext.Provider>
    )
}

export default CurrentUserContext;
