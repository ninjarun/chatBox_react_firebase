import { collection, getDocs, query, where } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import CurrentUserContext from '../contexts/CurrentUserContext'
import { db } from '../firebase'

const ChatChooser = () => {

  const { ChatToShow, CurrentUser,setChatToShow } = useContext(CurrentUserContext)
  const [Conversations, setConversations] = useState([])

  // useEffect(() => {
  //   // query to get all messages that the current user is involved with and display them
  //   const fetchData = async () => {
  //     const q = query(collection(db, "privateMsgs"), where("participants", "array-contains", CurrentUser.email));
  //     const querySnapshot = await getDocs(q);
  //     querySnapshot.forEach((doc) => {
  //       // console.log(doc.id, " => ", doc.data());
  //       if (!Conversations.find(conversation => conversation.id === doc.id)) {
  //         setConversations([...Conversations, { ...doc.data(), "id": doc.id }])
  //       }
  //     })
  //     // console.log('conversations', Conversations)
  //   }
  //   // fetchData() 000000000000000000000000000000000000000000000000000000000000000
  // }, [Conversations,ChatToShow])



  return (
    <div>
{/* <button onClick={setChatToShow("chatBox")}>Lobby</button> */}
      {Conversations.map((conver, i) => <button key={i}>{conver.otherUserDisplayName}</button>)}




    </div>
  )
}

export default ChatChooser