import { addDoc, collection, onSnapshot, orderBy, getDocs, query, where, serverTimestamp } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../firebase';
import CurrentUserContext from '../contexts/CurrentUserContext'
import ChatChooser from './ChatChooser';

const DisplayUsers = () => {
    const [Onlines, setOnlines] = useState([])
    const { setChatChooserChanger, ChatChooserChanger, CurrentUser } = useContext(CurrentUserContext)

    // creates table for both users private chat
    const handleClick = async (userClicked) => {
        setChatChooserChanger(userClicked)



        // pppppppppppp
        const q = query(collection(db, "privateMsgs"), where("participants", "array-contains", CurrentUser.email, userClicked));
        console.log("we are here")
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot)
        // pppppppppppp

        if (querySnapshot._snapshot.docChanges.length == 0) {

            const collectionRef = collection(db, "privateMsgs");
            const payload = { "participants": [CurrentUser.email, userClicked] };
            const docRef = await addDoc(collectionRef, payload);
            console.log("The new ID is: " + docRef.id);

        } else { console.log("created already") }
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


console.log(Onlines)
    return (
        <div style={{ backgroundColor: "red", width: "30%", padding: "10px" }}>
            <h3> online users:</h3>

            {Onlines.map((online, i) =>
                <div key={i}>
                    {online.email != CurrentUser.email &&
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