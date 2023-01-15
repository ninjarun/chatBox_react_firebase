import React, { useContext, useEffect, useState } from 'react'
import "./input.css"
import { collection, addDoc, serverTimestamp, setDoc, doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { db } from "../firebase"
import CurrentUserContext from '../contexts/CurrentUserContext';
const Input = () => {
  const [Msg, setMsg] = useState("")
  const { CurrentUser, ChatToShow } = useContext(CurrentUserContext)


  const handleSubmit = async () => {
    if (ChatToShow === "chatBox") {
      const collectionRef = collection(db, ChatToShow);
      const payload = { "User": CurrentUser.displayName, Msg, timestamp: serverTimestamp() };
      const docRef = await addDoc(collectionRef, payload);
      console.log("The new ID is: " + docRef.id);



      setMsg("")
    }
    // come back to this almost done servertimestamp doesnt work with array union !
    else {

      const collectionRef = collection(db, 'privateMsgs');
      const payload = { "User":CurrentUser.displayName,"participants":[ CurrentUser.email, ChatToShow.email], Msg, timestamp: serverTimestamp() };
      const docRef = await addDoc(collectionRef, payload);
      console.log("The new ID is: " + docRef.id);




    //   const docRef = doc(db, "privateMsgs", "9e6UuejPzwnTpP4eEf3t")
    //   const docSnap = await getDoc(docRef);

    //   if (docSnap.exists()) {
    //     console.log("Document data:", docSnap.data());
    //   } else {
    //     // doc.data() will be undefined in this case
    //     console.log("No such document!");
    //   }

    //   const currentObj = docSnap.data()
    //   console.log(currentObj)

    //   const timestamp = serverTimestamp()
    //   const add2msgs = { "User": CurrentUser.displayName, Msg, timestamp };
    //   let payload=null
    //   console.log('test',currentObj.msgs)
    //   if (currentObj.msgs != undefined) {
    //      payload = {
    //       "participants": currentObj.participants,
    //       "otherUserDisplayName": currentObj.otherUserDisplayName,
    //       "msgs": [...currentObj.msgs, add2msgs]
    //     }}
    //   else {
    //      payload = {
    //       "participants": currentObj.participants,
    //       "otherUserDisplayName": currentObj.otherUserDisplayName,
    //       "msgs": [add2msgs]
    //     }
       
    // }
    // await setDoc(doc(db, "privateMsgs", "9e6UuejPzwnTpP4eEf3t"), payload)
    // console.log('success')
  }


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