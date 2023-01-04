// import { Route, Routes } from "react-router-dom";
import { useContext } from "react";
import ChatBox  from "./components/ChatBox"

import SignUp from "./components/SignUp";
import CurrentUserContext from "./contexts/CurrentUserContext";


function App() {
  const { CurrentUser} = useContext(CurrentUserContext)
  console.log(CurrentUser)
  return (
    <div style={{margin:'auto',width:'80%'}}>
{ !CurrentUser ? <SignUp></SignUp> : 
<ChatBox></ChatBox>}
    </div>
  );
}

export default App;
