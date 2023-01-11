// import { Route, Routes } from "react-router-dom";
import { collection } from "firebase/firestore";
import { useContext, useEffect } from "react";
import MainDisplay from "./components/MainDisplay";

import SignUp from "./components/SignUp";
import CurrentUserContext from "./contexts/CurrentUserContext";
import { auth } from "./firebase";


function App() {
  const { CurrentUser } = useContext(CurrentUserContext)



  // testing #!#!#!#!!#!#!#!#!#!#!#!#!#!#!#!
  //   if (CurrentUser){
  // console.log('hello', CurrentUser);

  // const collectionRef = collection(db, "usersLogged");
  // const payload = { "User": CurrentUser.displayName, "logged":true, timestamp: serverTimestamp() };
  // const docRef =  addDoc(collectionRef, payload);
  // console.log("The new ID is: " + docRef.id);}
  
  return (
    <div style={{ margin: 'auto', width: '90%', backgroundColor:"yellow"  }}>
      {!CurrentUser ? <SignUp></SignUp> :  <MainDisplay />}
    </div>
  );
}

export default App;
