import React, { useRef } from 'react'
import {  signInWithEmailAndPassword,  } from "firebase/auth";
import { auth } from '../firebase';

const Login = () => {

  const emailRef = useRef();
  const passwordRef = useRef();
  async function handleLogin() {
      await signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value);
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