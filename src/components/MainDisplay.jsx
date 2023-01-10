import React, { useContext, useEffect } from 'react'
import { auth } from '../firebase'
import ChatBox from './ChatBox'
import DisplayUsers from './DisplayUsers'

const MainDisplay = () => {
    return (
        <div style={{ display: "flex" }}>
            <DisplayUsers></DisplayUsers>
            <ChatBox></ChatBox>
        </div>
    )
}

export default MainDisplay