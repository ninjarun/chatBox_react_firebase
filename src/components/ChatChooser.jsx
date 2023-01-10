import React, { useContext } from 'react'
import CurrentUserContext from '../contexts/CurrentUserContext'

const ChatChooser = () => {
    
    const { setChatChooserChanger } = useContext(CurrentUserContext)

    return (
    <div>

        <button>lobby</button>
        <button>a</button>
        <button>b</button>




    </div>
  )
}

export default ChatChooser