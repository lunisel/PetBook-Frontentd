import { Form } from "react-bootstrap";
import {FaPhotoVideo} from "react-icons/fa"

const SendPosts = () => {
    
    return(
        <div className="form-container-home">
            <img src="https://animalclinic.org/wp-content/uploads/2019/05/paw-placeholder.png" alt="paw" className="img-profile" />
            <Form.Control type="text" placeholder="Write something..." className="input-send-post"/>
            <FaPhotoVideo className="add-pic-icon"/>
        </div>
    )
}

export default SendPosts