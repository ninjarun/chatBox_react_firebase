import React, { useContext } from 'react'
import { signOut } from 'firebase/auth'
import { auth, db } from '../firebase'
import CurrentUserContext from '../contexts/CurrentUserContext'
import { doc, setDoc } from 'firebase/firestore'
const StatusBar = () => {
    const { CurrentUser, setCurrentUser, InnerToken } = useContext(CurrentUserContext)
    const LogOut = async () => {
        await signOut(auth)
        setCurrentUser(null)
        setDoc(doc(db, 'usersLogged', InnerToken), { logged: false }, { merge: true });
        console.log('done')
    }

    return (
        <div className='statusBar' style={{ justifyContent: "space-between", padding: "10px", backgroundColor: "green", margin: "auto", display: "flex" }}>
            welcome back: {CurrentUser.displayName}
            <button onClick={LogOut}>Log Out!</button>
        </div>
    )
}

export default StatusBar