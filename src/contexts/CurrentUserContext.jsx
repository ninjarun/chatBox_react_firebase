import React, { createContext, useState } from "react";

const CurrentUserContext = createContext({
    setCurrentUser: () => null,
    CurrentUser: null,
    setInnerToken: () => null,
    InnerToken: null,
    setChatToShow: () => null,
    ChatToShow: null,
    
});

export function CurrentUserProvider({ children }) {
    const [CurrentUser, setCurrentUser] = useState("")
    const [InnerToken, setInnerToken] = useState("")
const [ChatToShow, setChatToShow] = useState("chatBox")
    return (
        <CurrentUserContext.Provider value={{ CurrentUser,setCurrentUser,InnerToken,setInnerToken,setChatToShow,ChatToShow }}>{children}</CurrentUserContext.Provider>
    )
}

export default CurrentUserContext;
