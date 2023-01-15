import ChatBox from './ChatBox'
import DisplayUsers from './DisplayUsers'

const MainDisplay = () => {
    return (
        <div>
            <div style={{ display: "flex" }}>
                <DisplayUsers></DisplayUsers>
                <ChatBox></ChatBox>
            </div>
        </div>
    )
}

export default MainDisplay