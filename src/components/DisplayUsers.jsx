import { addDoc, collection, onSnapshot, orderBy, getDocs, query, where } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../firebase';
import CurrentUserContext from '../contexts/CurrentUserContext'

const DisplayUsers = () => {
    const [Onlines, setOnlines] = useState([])
    const {  CurrentUser, setChatToShow } = useContext(CurrentUserContext)


    // creates table for both users private chat - 
    const handleClick = async (userClicked) => {

        // // query to get all messages that the current user is involved with
        // const q = query(collection(db, "privateMsgs"), where("participants", "array-contains", CurrentUser.email));
        // const querySnapshot = await getDocs(q);

        // // find the exact conversation with other user
        // const selectedDoc = querySnapshot.docs.find(doc =>
        //     doc.data().participants.includes(userClicked.email)
            
        // );
            setChatToShow(userClicked)
        }
   



    // real time for online users list
    useEffect(() => {
        const collectionRef = collection(db, "usersLogged");
        const q = query(collectionRef, orderBy("timestamp", "desc"));
        const unsub = onSnapshot(q, (snapshot) =>
            setOnlines(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        );

        return unsub;
    }, [setOnlines]);


    // console.log(Onlines)
    return (
        <div style={{ backgroundColor: "red", width: "30%", padding: "10px" }}>
          <button onClick={()=>setChatToShow("chatBox")}>Lobby Chat</button>
            <h3> online users:</h3>

            {Onlines.map((online, i) =>
                <div key={i}>
                    {online.email !== CurrentUser.email &&
                        <button onClick={() => handleClick(online)}>
                            <div style={{ padding: "5px" }}>
                                {online.logged && online.User}
                            </div>
                        </button>}
                </div>)}

        </div>
    )
}

export default DisplayUsers