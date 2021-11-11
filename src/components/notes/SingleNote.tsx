import { RouteComponentProps } from "react-router";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import { FaTimesCircle } from "react-icons/fa";
import {
  getNoteInt,
  postPutNoteInt,
  reduxStateInt,
} from "../../utils/interfaces";
import Navbar from "../Navbar";
import { useDispatch, useSelector } from "react-redux";
import { addSelectedNote, removeSelectedNote } from "../../redux/actions/user";
import { sendRequestWithToken } from "../../utils/commonLogic";
import { putSingleNote } from "./notesLogic";

const SingleNote = (props: RouteComponentProps) => {
  const dispatch = useDispatch();
  const note: getNoteInt | null = useSelector(
    (state: reduxStateInt) => state.user.selectedNote
  );

  return (
    <div className="notes-big-cont">
      <div className="single-note-page-container">
        <IoChevronBackCircleSharp
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

          <input
            type="text"
            className="single-note-text"
            placeholder="Write something..."
            defaultValue={note?.text}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              dispatch(addSelectedNote({ ...note, text: e.target.value }));
            }}
          />
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default SingleNote;
