import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../contexts/usercontext'
import CurrentUserContext from '../contexts/CurrentUserContext'
import { auth, db } from '../firebase'
import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from 'firebase/auth'
import Login from './Login'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
// import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const SignUp = () => {
    const { Email, Password, setEmail, setPassword } = useContext(UserContext)
    const { CurrentUser, setCurrentUser ,setInnerToken} = useContext(CurrentUserContext)
    const [display, setdisplay] = useState("")
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, user => { setCurrentUser(user) });
        return unsub;
    }, [setCurrentUser])

    // // signing users up
    const handleClick = async () => {
        await createUserWithEmailAndPassword(auth, Email, Password)
            .then(cred => {
                console.log('create success')

            })
            .catch(err => {
                console.log(err.message)
            })

        await updateProfile(auth.currentUser, {
            displayName: display
        }).then(() => {
            console.log('******auth.currentuser****', auth.currentUser)
            // Profile updated!
            // ...
        }).catch((error) => {
            // An error occurred
            // ...
        })

        // adding doc to userslogged collection - to know who is currently connected with logged flag
        // will turn false on logout - todo!
        console.log('final', auth.currentUser.displayName)
        const collectionRef = collection(db, "usersLogged");
        const payload = { "User": auth.currentUser.displayName, "logged": true, timestamp: serverTimestamp(),"email":auth.currentUser.email };
        const docRef = await addDoc(collectionRef, payload);
        console.log("The new ID is: " + docRef.id);
        setInnerToken(docRef.id)
        // setEmail("")
        // setPassword("")
        // setdisplay("")
    }

    return (
        <div style={{ padding: '70px', backgroundColor: 'brown', height: '300px', textAlign: 'center' }}>
            <h3>

                New? SignUp
            </h3>
            <form>
                <input value={Email} placeholder='email' onChange={(e) => setEmail(e.target.value)} type="email" name="email" />
                <br />
                <input value={Password} placeholder='password' onChange={(e) => setPassword(e.target.value)} type="password" name="password" />
                <br />
                <input value={display} placeholder='chat display name' onChange={(e) => setdisplay(e.target.value)} type="text" name="display" />
                <br />
                <button onClick={handleClick} type='button'>signup</button>
            </form>
            <br />
            <div><Login></Login></div>

        </div>
    )
}

export default SignUp