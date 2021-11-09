import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { RouteComponentProps } from "react-router";
import { getNoteInt, reduxStateInt, postPutNoteInt } from "../../utils/interfaces";
import { HiPlusCircle } from "react-icons/hi";
import Navbar from "../Navbar";
import "./notes.css";
import { FaPaw } from "react-icons/fa";
import { sendRequestWithToken } from "../../utils/commonLogic";
import { addNewNote } from "./notesLogic";
import { useSelector } from "react-redux";
import SingleNote from "./SingleNote"

const Notes = (props: RouteComponentProps) => {
  const [allNotes, setAllNotes] = useState<getNoteInt[] | null>(null);
  const [selectedNote, setSelectedNote] = useState<getNoteInt| null>(null)

  const currentUser = useSelector(
    (state: reduxStateInt) => state.user.currentUser
  );
  const userId = currentUser?._id

  return (
    <div className="notes-big-cont">
      {selectedNote === null ? <div className="notes-page-content-container">
        <div className="top-logo-fixed-mobile">
          <FaPaw className="top-logo-fixed-icon" />
          <span className="title-top-logo-fixed">PetBook</span>
        </div>
        <h1 className="notes-title">Your Notes</h1>
        <Row className="single-notes-container">
          <Col xs={12} md={4} lg={2} className="add-new-note-container">
            <div
              className="single-add-note"
              onClick={async () => {
                let data = await sendRequestWithToken(addNewNote, props, userId, "");
                if(data) setSelectedNote(data)
              }}
            >
              <HiPlusCircle className="plus-circle-icon" />
              <span className="add-note-text">Add note</span>
            </div>
          </Col>
        </Row>
      </div> : (
          <div className="single-note-page-container">
              <SingleNote note={selectedNote} routerProps={props}/>
          </div>
      )}
      <Navbar />
    </div>
  );
};

export default Notes;
