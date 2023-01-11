import { addDoc, collection, onSnapshot, orderBy, getDocs, query, where } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../firebase';
import CurrentUserContext from '../contexts/CurrentUserContext'

const DisplayUsers = () => {
    const [Onlines, setOnlines] = useState([])
    const { setChatChooserChanger, CurrentUser } = useContext(CurrentUserContext)
    const [CreateNewChatFlag, setCreateNewChatFlag] = useState(false)


    // creates table for both users private chat - NEEDS TO BE FIXED
    const handleClick = async (userClicked) => {
        setChatChooserChanger(userClicked)
        // query to get all messages that the current user is involved with
        const q = query(collection(db, "privateMsgs"), where("participants", "array-contains", CurrentUser.email));
        console.log("we are here")
        const querySnapshot = await getDocs(q);
        let flag = false
        // loop to get the exact conversation with other user
        querySnapshot.forEach((doc) => {
            console.log(  'test if contains:',          doc.data().participants.includes(userClicked)            );
            // (doc.data().participants.includes(userClicked)) && setCreateNewChatFlag(true)
            setCreateNewChatFlag(doc.data().participants.includes(userClicked))
        })
      
      console.log(CreateNewChatFlag)
    // creates conversation if doesn't exist
        if (!CreateNewChatFlag) {
console.log('yes')
        //     const collectionRef = collection(db, "privateMsgs");
        //     const payload = { "participants": [CurrentUser.email, userClicked] };
        //     const docRef = await addDoc(collectionRef, payload);
        //     console.log("The new ID is: " + docRef.id);
        //     setCreateNewChatFlag(false)
        //     console.log(CreateNewChatFlag)

        // } else {
        //     console.log("created already")
        //     setCreateNewChatFlag(false)
        }
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
            <h3> online users:</h3>

            {Onlines.map((online, i) =>
                <div key={i}>
                    {online.email !== CurrentUser.email &&
                        <button onClick={() => handleClick(online.email)}>
                            <div style={{ padding: "5px" }}>
                                {online.logged && online.User}
                            </div>
                        </button>}
                </div>)}

        </div>
    )
}

export default DisplayUsers