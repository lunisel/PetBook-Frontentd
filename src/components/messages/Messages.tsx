import { RouteComponentProps } from "react-router"
import Navbar from "../Navbar";
import "./messages.css"

const Notes = ({history}: RouteComponentProps) => {
    return (
        <div className="notes-big-cont">
            <Navbar/>
        </div>
    )
}

export default Notes