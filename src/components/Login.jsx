import React, { useContext, useRef } from 'react'
import {  signInWithEmailAndPassword,  } from "firebase/auth";
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import CurrentUserContext from '../contexts/CurrentUserContext'


const Login = () => {
  const {  InnerToken } = useContext(CurrentUserContext)


  const emailRef = useRef();
  const passwordRef = useRef();
  async function handleLogin() {
      await signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value);
      
      
      // todo - need to add email to table soi can identify in login
      // setDoc( doc(db, 'usersLogged', InnerToken), { logged: true }, { merge: true });
      setDoc( doc(db, 'usersLogged', InnerToken), { logged: true }, { merge: true });
  }




  return (
    <div>Login

      <div >
        <input ref={emailRef} placeholder="Email" />
       <br /> <input ref={passwordRef} type="password" placeholder="Password" />
       <br /> <button  onClick={handleLogin}>Log In</button>
      </div>

    </div>
  )
}

export default Login