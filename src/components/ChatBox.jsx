// import { chatRef } from '../firebase'
import { onSnapshot, collection, query, orderBy } from 'firebase/firestore'
import { useEffect, useContext, useState } from 'react'
import { db } from '../firebase'
import Input from "../components/Input"
import "./chatBox.css"
import StatusBar from './StatusBar'
import ChatChooser from './ChatChooser'
import CurrentUserContext from '../contexts/CurrentUserContext'

const ChatBox = () => {
  
  // hold all the messages of main (lobby) chat
  const [msgs, setmsgs] = useState([])
  
  // allows user to choose what to display in the display box
  const { ChatChooserChanger } = useContext(CurrentUserContext)


  // firebase realTime database - used to work with setmsgs to display all lobby messages
  useEffect(() => {
    const collectionRef = collection(db, "chatBox");
    const q = query(collectionRef, orderBy("timestamp", "desc"));

    const unsub = onSnapshot(q, (snapshot) =>
      setmsgs(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );

    return unsub;
  }, []);

console.log(msgs)
  return (
    <div style={{ width: "70%" }}>
      <div><StatusBar /></div>
      <div><ChatChooser /></div>


{/* needs to be change to if conidition where this code will show when "main" is in ChatChooseChanger */}
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