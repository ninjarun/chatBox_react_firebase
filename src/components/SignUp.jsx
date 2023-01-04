import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../contexts/usercontext'
import CurrentUserContext from '../contexts/CurrentUserContext'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from 'firebase/auth'
import Login from './Login'

const SignUp = () => {
    const { Email, Password, setEmail, setPassword } = useContext(UserContext)
    const {  setCurrentUser } = useContext(CurrentUserContext)
    const [display, setdisplay] = useState("")
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
        return unsub;
    }, [setCurrentUser])

    // // signing users up
    const handleClick = async () => {
        await createUserWithEmailAndPassword(auth, Email, Password)
            .then(cred => {
                console.log('user created:', cred.user)

            })
            .catch(err => {
                console.log(err.message)
            })
            
            updateProfile(auth.currentUser, {
            displayName: display
        }).then(() => {
            console.log("updated successfully")
            // Profile updated!
            // ...
        }).catch((error) => {
            // An error occurred
            // ...
        })

        setEmail("")
        setPassword("")
        setdisplay("")
    }
    return (
        <div style={{ padding: '70px', backgroundColor: 'brown' ,height:'300px',textAlign:'center'}}>
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