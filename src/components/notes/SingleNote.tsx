import { RouteComponentProps } from "react-router";
import { FaTimesCircle, FaChevronCircleLeft, FaImage } from "react-icons/fa";
import { getNoteInt, reduxStateInt } from "../../utils/interfaces";
import Navbar from "../Navbar";
import { useDispatch, useSelector } from "react-redux";
import { addSelectedNote, removeSelectedNote } from "../../redux/actions/user";
import { sendRequestWithToken } from "../../utils/commonLogic";
import { deleteSingleNote, putSingleNote } from "./notesLogic";

const SingleNote = (props: RouteComponentProps) => {
  const dispatch = useDispatch();
  const note: getNoteInt | null = useSelector(
    (state: reduxStateInt) => state.user.selectedNote
  );

  return (
    <div className="notes-big-cont">
      <div className="single-note-page-container">
        <FaChevronCircleLeft
          className="back-icon"
          data-toggle="tooltip"
          title="Back"
          onClick={async () => {
            let data = await sendRequestWithToken(
              putSingleNote,
              props,
              note,
              note!._id
            );
            if (data) {
              props.history.push("/notes");
              dispatch(removeSelectedNote());
            }
          }}
        />
        <FaTimesCircle
          className="delete-note-icon"
          data-toggle="tooltip"
          title="Delete"
          onClick={async () => {
            sendRequestWithToken(deleteSingleNote, props, note?._id, "");

            props.history.push("/notes");
            dispatch(removeSelectedNote());
          }}
        />
        <FaImage
          className="add-img-note-icon"
          data-toggle="tooltip"
          title="Add image"
        />

        <div className="single-note">
          <input
            type="text"
            className="single-note-title"
            placeholder="Title"
            defaultValue={note?.title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              dispatch(addSelectedNote({ ...note, title: e.target.value }));
            }}
          />

          <textarea
            className="single-note-text"
            placeholder="Write something..."
            rows={12}
            defaultValue={note?.text}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              dispatch(addSelectedNote({ ...note, text: e.target.value }));
            }}
          />
          {note?.media.map((i) => (
            <img src={i} alt="" className="note-images" />
          ))}
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default SingleNote;
