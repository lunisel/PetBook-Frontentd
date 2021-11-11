import { RouteComponentProps } from "react-router";
import {
  FaTimesCircle,
  FaChevronCircleLeft,
  FaImage,
  FaAngleLeft,
  FaAngleRight,
  FaTrash,
} from "react-icons/fa";
import { getNoteInt, reduxStateInt } from "../../utils/interfaces";
import Navbar from "../Navbar";
import { useDispatch, useSelector } from "react-redux";
import { addSelectedNote, removeSelectedNote } from "../../redux/actions/user";
import { sendRequestWithToken } from "../../utils/commonLogic";
import { addImgToNote, deleteSingleNote, putSingleNote } from "./notesLogic";
import { useRef, useState } from "react";
import { Modal } from "react-bootstrap";

const SingleNote = (props: RouteComponentProps) => {
  const [show, setShow] = useState(false);
  const [selectedImg, setSelectedImg] = useState<number | null>(null);
  const dispatch = useDispatch();
  const note: getNoteInt | null = useSelector(
    (state: reduxStateInt) => state.user.selectedNote
  );

  const inputFile = useRef<any>(null);

  const openFileDialog = () => {
    inputFile.current.click();
  };

  const handleClose = () => {
    setSelectedImg(null);
    setShow(false);
  };

  const handleShow = (i: number) => {
    setSelectedImg(i);
    setShow(true);
  };

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
          onClick={() => openFileDialog()}
        />
        <input
          type="file"
          id="file"
          ref={inputFile}
          style={{ display: "none" }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            addImgToNote(e, dispatch, note);
          }}
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
          <div className="note-img-container">
            {note?.media.map((img, i) => (
              <img
                src={img}
                alt=""
                className="note-images"
                onClick={() => handleShow(i)}
              />
            ))}
          </div>

          <Modal
            show={show}
            onHide={handleClose}
            className="big-modal-container"
          >
            <Modal.Header closeButton>
              <FaTrash className="delete-img-modal" onClick={()=>{
                  let img : string | undefined= note?.media[selectedImg!]
                  let newMedia = note?.media.filter(n => n !== img)
                  let updNote = {
                      ...note,
                      media: newMedia
                  }
                  dispatch(addSelectedNote(updNote))
              }}/>
            </Modal.Header>
            <Modal.Body>
              <div className="note-modal-img-cont">
                <FaAngleLeft
                  className="img-arrow-icon left"
                  onClick={() => setSelectedImg(selectedImg! - 1)}
                />
                <img
                  src={note?.media[selectedImg!]}
                  alt=""
                  className="note-images-modal"
                />
                <FaAngleRight
                  className="img-arrow-icon right"
                  onClick={() => setSelectedImg(selectedImg! + 1)}
                />
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default SingleNote;
