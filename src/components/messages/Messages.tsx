import { RouteComponentProps } from "react-router"
import Navbar from "../Navbar";
import "./messages.css"

const Messages = ({history}: RouteComponentProps) => {
    return (
        <div className="messages-big-cont">
            <Navbar/>
        </div>
    )
}

export default Messages