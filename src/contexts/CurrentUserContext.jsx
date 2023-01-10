import React, { createContext, useState } from "react";

const CurrentUserContext = createContext({
    setCurrentUser: () => null,
    CurrentUser: null,
    setInnerToken: () => null,
    InnerToken: null,
    setChatChooserChanger: () => null,
    ChatChooserChanger: null,
    
});

export function CurrentUserProvider({ children }) {
    const [CurrentUser, setCurrentUser] = useState("")
    const [InnerToken, setInnerToken] = useState("")
const [ChatChooserChanger, setChatChooserChanger] = useState("main")
    return (
        <CurrentUserContext.Provider value={{ CurrentUser,setCurrentUser,InnerToken,setInnerToken,setChatChooserChanger,ChatChooserChanger }}>{children}</CurrentUserContext.Provider>
    )
}

export default CurrentUserContext;
