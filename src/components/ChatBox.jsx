// import { chatRef } from '../firebase'
import { onSnapshot, collection, query, orderBy, where, getDocs } from 'firebase/firestore'
import { useEffect, useContext, useState } from 'react'
import { db } from '../firebase'
import Input from "../components/Input"
import "./chatBox.css"
import StatusBar from './StatusBar'
import ChatChooser from './ChatChooser'
import CurrentUserContext from '../contexts/CurrentUserContext'
import { async } from '@firebase/util'

const ChatBox = () => {

  // hold all the messages of main (lobby) chat
  const [msgs, setmsgs] = useState([])

  // allows user to choose what to display in the display box
  const { ChatToShow, setChatToShow, CurrentUser } = useContext(CurrentUserContext)


  // firebase realTime database - used to work with setmsgs to display all lobby messages
  useEffect(() => {
    const starttest = async () => {
      // console.log('useefectfrs')
      if (ChatToShow == "chatBox") {
        const collectionRef = collection(db, "chatBox");
        const q = query(collectionRef, orderBy("timestamp", "desc"));
        const unsub = onSnapshot(q, (snapshot) =>
          setmsgs(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        );
console.log('if')
        return unsub;
      } else {
console.log('else')
        // query to get all messages that the current user is involved with
        const q = query(collection(db, "privateMsgs"), where("participants", "array-contains", CurrentUser.email), orderBy("timestamp", "desc"));
        const unsub = onSnapshot(q, (snapshot) =>
          setmsgs(snapshot.docs.map((doc) => 
         doc.data().participants.includes(ChatToShow.email)  &&          ({ ...doc.data(), id: doc.id })))
        );
        return unsub;
        // find the exact conversation with other user - change to for each and add all mesgae to 1 array todo!@#@!#$@!#$%%$#@!
        // const selectedDoc = querySnapshot.docs.find(doc =>
        //    [...selectedDoc, doc.data().participants.includes(ChatToShow.email)]
        //     );
        // console.log('current msgs',selectedDoc.data())
      }
    }
    starttest()
  }, [ChatToShow]);

  // console.log(msgs)
  return (
    <div style={{ width: "70%" }}>
      <div><StatusBar /></div>
      <div><ChatChooser /></div>


      {/* needs to be change to if conidition where this code will show when "main" is in ChatChooseChanger */}
      <div className='chatBox'>
        {msgs.map((msg,i) =>
          <div className='msgContainer' key={i}>
            {msg.User}: {msg.Msg}
          </div>
        )}
      </div>
      <Input></Input>
    </div>
  )
}

export default ChatBox