import { RouteComponentProps } from "react-router"
import Navbar from "../Navbar";
import "./feed.css"

const Feed = ({history}: RouteComponentProps) => {
    return (
        <div className="feed-big-cont">
            <Navbar/>
        </div>
    )
}

export default Feed