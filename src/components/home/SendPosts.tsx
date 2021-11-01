import { Form } from "react-bootstrap";
import {FaPhotoVideo} from "react-icons/fa"
import { useSelector } from "react-redux";
import { reduxStateInt } from "../../utils/interfaces";

const SendPosts = () => {

    const user = useSelector((state: reduxStateInt) => state.user.currentUser);
    
    return(
        <div className="form-container-home">
            <img src={user?.avatar} alt="paw" className="img-profile" />
            <Form.Control type="text" placeholder="Write something..." className="input-send-post"/>
            <FaPhotoVideo className="add-pic-icon"/>
        </div>
    )
}

export default SendPosts