// import { chatRef } from '../firebase'
import { onSnapshot, collection, query, orderBy } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import {  db } from '../firebase'
import Input from "../components/Input"
import "./chatBox.css"
import StatusBar from './StatusBar'


const ChatBox = () => {
  const [msgs, setmsgs] = useState([])




  // firebase realTime database 
  useEffect(() => {
    const collectionRef = collection(db, "chatBox");
    const q = query(collectionRef, orderBy("timestamp", "desc"));

    const unsub = onSnapshot(q, (snapshot) =>
      setmsgs(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );

    return unsub;
  }, []);


  return (
    <div>
     <div><StatusBar></StatusBar></div>
      <div className='chatBox'>
        {msgs.map(msg =>
          <div className='msgContainer' key={msg.id}>
            {msg.User}: {msg.Msg}
          </div>
        )}
      </div>
      <Input></Input>
    </div>
  )
}

export default ChatBox