import { RouteComponentProps } from "react-router"
import Navbar from "../Navbar";
import "./profile.css"

const MePage = ({history}: RouteComponentProps) => {
    return (
        <div className="me-page-big-cont">
            <Navbar/>
        </div>
    )
}

export default MePage