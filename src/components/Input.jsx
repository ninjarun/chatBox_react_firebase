import React, { useContext, useState } from 'react'
import "./input.css"
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase"
import CurrentUserContext from '../contexts/CurrentUserContext';
const Input = () => {
  const [Msg, setMsg] = useState("")
  const { CurrentUser } = useContext(CurrentUserContext)

  const handleSubmit = async () => {
    console.log('hello', CurrentUser)
    const collectionRef = collection(db, "chatBox");
    const payload = { "User": CurrentUser.displayName, Msg, timestamp: serverTimestamp() };
    const docRef = await addDoc(collectionRef, payload);
    console.log("The new ID is: " + docRef.id);
    setMsg("")
  };

  const handleOnChange = (e) => {
    setMsg(e.target.value);
  }

  return (
    <div className='input'>

      <form onSubmit={e => { e.preventDefault(); }}>
        <label>Msg</label>
        <input value={Msg} name='Msg' onChange={(e) => handleOnChange(e)}></input>
        <button onClick={handleSubmit} type='button'>send!</button>

      </form>


    </div>
  )
}

export default Input