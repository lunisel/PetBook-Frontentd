import { RouteComponentProps } from "react-router"
import { getNoteInt } from "../../utils/interfaces"

interface singleNotePropsInt{
    note: getNoteInt,
    routerProps: RouteComponentProps
}

const SingleNote = (props: singleNotePropsInt) => {

    return(
        <div className="single-note">
            <input type="text" className="single-note-title" placeholder="Title" value={props.note.title}/>
        </div>
    )
}

export default SingleNote