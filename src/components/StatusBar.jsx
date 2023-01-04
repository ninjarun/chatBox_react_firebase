import React, { useContext } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import CurrentUserContext from '../contexts/CurrentUserContext'
const StatusBar = () => {
    const { CurrentUser, setCurrentUser } = useContext(CurrentUserContext)

    const LogOut = async () => {
        console.log(CurrentUser)
        await signOut(auth)
        setCurrentUser(null)
        console.log(CurrentUser)
    }
    return (
        <div className='statusBar' style={{justifyContent: "space-between", padding: "10px", backgroundColor: "green", width: "600px", margin: "auto"  ,display:"flex"      }}>

            welcome back: {CurrentUser.displayName}

            <button onClick={LogOut}>Log Out!</button>
        </div>
    )
}

export default StatusBar