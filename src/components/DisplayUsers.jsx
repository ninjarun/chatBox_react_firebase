import { addDoc, collection, onSnapshot, orderBy, getDocs, query, where } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../firebase';
import CurrentUserContext from '../contexts/CurrentUserContext'

const DisplayUsers = () => {
    const [Onlines, setOnlines] = useState([])
    const { setChatChooserChanger, CurrentUser } = useContext(CurrentUserContext)
    const [CreateNewChatFlag, setCreateNewChatFlag] = useState(null)


    // creates table for both users private chat - NEEDS TO BE FIXED
    const handleClick = async (userClicked) => {
        console.log(CreateNewChatFlag)
        setChatChooserChanger(userClicked)
        // query to get all messages that the current user is involved with
        const q = query(collection(db, "privateMsgs"), where("participants", "array-contains", CurrentUser.email));
        const querySnapshot = await getDocs(q);
        let flag = false
        // loop to get the exact conversation with other user - ###################################################################################works well except the first run doesn't work!
        querySnapshot.forEach((doc) => {
            console.log(doc.data())
            console.log(userClicked)
            console.log('test if contains:', doc.data().participants.includes(userClicked));
            if (doc.data().participants.includes(userClicked)) {
                console.log('in if')
                setCreateNewChatFlag(true)

            }

            //     flag=(doc.data().participants.includes(userClicked)) 
            //     console.log(flag)
            //     console.log('id',doc.id)
            //     // (doc.data().participants.includes(userClicked)) && setCreateNewChatFlag(true)
            //     // setCreateNewChatFlag(doc.data().participants.includes(userClicked))
        })
        console.log(CreateNewChatFlag)




        // // creates conversation if doesn't exist
        // if (!flag) {
        //     console.log('yes')
        //     const collectionRef = collection(db, "privateMsgs");
        //     const payload = { "participants": [CurrentUser.email, userClicked] };
        //     const docRef = await addDoc(collectionRef, payload);
        //     console.log("The new ID is: " + docRef.id);
        //     console.log(CreateNewChatFlag)

        // } else {
        //     console.log("created already")
        // }
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