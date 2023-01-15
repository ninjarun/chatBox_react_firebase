import { addDoc, collection, onSnapshot, orderBy, getDocs, query, where } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../firebase';
import CurrentUserContext from '../contexts/CurrentUserContext'

const DisplayUsers = () => {
    const [Onlines, setOnlines] = useState([])
    const {  CurrentUser, setChatToShow } = useContext(CurrentUserContext)


    // creates table for both users private chat - 
    const handleClick = async (userClicked) => {
        // setChatChooserChanger(userClicked)

        // query to get all messages that the current user is involved with
        const q = query(collection(db, "privateMsgs"), where("participants", "array-contains", CurrentUser.email));
        const querySnapshot = await getDocs(q);

        // find the exact conversation with other user
        const selectedDoc = querySnapshot.docs.find(doc =>
            doc.data().participants.includes(userClicked.email)
            
        );
        // creates conversation if doesn't exist
        if (!selectedDoc) {
            console.log('yes')
            const collectionRef = collection(db, "privateMsgs");
            const payload = { "participants": [CurrentUser.email, userClicked.email],"otherUserDisplayName":userClicked.User,msgs:[] };
            const docRef = await addDoc(collectionRef, payload);
            console.log("The new ID is: " + docRef.id);
            setChatToShow(`privateMsgs/${docRef.id}/msgs`)


        } else {
            console.log("created already")
            setChatToShow(`privateMsgs/${selectedDoc.id}/msgs`)
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