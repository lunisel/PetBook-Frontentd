import { RouteComponentProps, withRouter } from "react-router-dom"
import {BiLogOut} from "react-icons/bi"
import { useDispatch } from "react-redux"
import {disconnectUser} from "../redux/actions/user"

const Navbar = ({history}: RouteComponentProps) => {
    const dispatch = useDispatch()

    return(
        <div className="nav-container">
            <BiLogOut onClick={()=> {
                dispatch(disconnectUser())
                setTimeout(()=>{history.push("/login")}, 2000)
            }}/>
        </div>
    )
}

export default withRouter(Navbar)