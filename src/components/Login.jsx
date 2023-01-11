import React, { useContext, useRef, useState } from 'react'
import { signInWithEmailAndPassword, } from "firebase/auth";
import { auth, db } from '../firebase';
import { collection, doc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import CurrentUserContext from '../contexts/CurrentUserContext'

const Login = () => {
var temp=""
  const { InnerToken, setInnerToken } = useContext(CurrentUserContext)
  const emailRef = useRef();
  const passwordRef = useRef();

  async function handleLogin() {
    await signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value);

    // once logged in - will make a query to the usersLogged table to fetch correct entry and update logged field to true
    console.log('first', InnerToken)
    const q = query(collection(db, "usersLogged"), where("email", "==", auth.currentUser.email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      temp=doc.id
    })

    // set 'logged' to true
    console.log('second', temp)
    setDoc(doc(db, 'usersLogged', temp), { logged: true }, { merge: true });
  }

  return (
    <div>Login
      <div >
        <input ref={emailRef} placeholder="Email" />
        <br /> <input ref={passwordRef} type="password" placeholder="Password" />
        <br /> <button onClick={handleLogin}>Log In</button>
      </div>
    </div>
  )
}

export default Login