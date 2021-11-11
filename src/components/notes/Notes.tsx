import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { RouteComponentProps } from "react-router";
import {
  getNoteInt,
  reduxStateInt,
  postPutNoteInt,
} from "../../utils/interfaces";
import { HiPlusCircle } from "react-icons/hi";
import Navbar from "../Navbar";
import "./notes.css";
import { FaPaw } from "react-icons/fa";
import { sendRequestWithToken } from "../../utils/commonLogic";
import { addNewNote, fetchMyNotes } from "./notesLogic";
import { useDispatch, useSelector } from "react-redux";
import SingleNote from "./SingleNote";
import { getTime } from "../posts/postLogic";
import { addSelectedNote } from "../../redux/actions/user";

const Notes = (props: RouteComponentProps) => {
  const [allNotes, setAllNotes] = useState<getNoteInt[] | null>(null);
  const [selectedNote, setSelectedNote] = useState<getNoteInt | null>(null);

  const currentUser = useSelector(
    (state: reduxStateInt) => state.user.currentUser
  );
  const dispatch = useDispatch()
  const userId = currentUser?._id;

  useEffect(() => {
    const setMyNotes = async () => {
      console.log("USE EFFECT");
      let data: getNoteInt[] = await sendRequestWithToken(
        fetchMyNotes,
        props,
        "",
        ""
      );
      if (data) {
        setAllNotes(data);
        if(allNotes !== null){
          console.log(allNotes);
        }
        
      }
    };
    setMyNotes();
  }, []);

  return (
    <div className="notes-big-cont">
        <div className="notes-page-content-container">
          <div className="top-logo-fixed-mobile">
            <FaPaw className="top-logo-fixed-icon" />
            <span className="title-top-logo-fixed">PetBook</span>
          </div>
          <h1 className="notes-title">Your Notes</h1>
          <Row className="single-notes-container">
            {allNotes?.map((n) => 
              <Col xs={12} md={4} lg={2} className="single-note-cont" onClick={()=> {
                props.history.push("/notes/" + n._id)
                dispatch(addSelectedNote(n))
              }}>
                <div className="note-container">
                  <span className="note-title">{n.title}</span>
                  <span className="note-text">{n.text}</span>
                  <span className="note-time">{getTime(n.createdAt)}</span>
                  {console.log("render single note", allNotes)}
                </div>
              </Col>
            )}
            <Col xs={12} md={4} lg={2} className="add-new-note-container">
              <div
                className="single-add-note"
                onClick={async () => {
                  let data = await sendRequestWithToken(
                    addNewNote,
                    props,
                    userId,
                    ""
                  );
                  if (data) {
                    dispatch(addSelectedNote(data))
                    props.history.push("/notes/" + data._id)
                  }
                }}
              >
                <HiPlusCircle className="plus-circle-icon" />
                <span className="add-note-text">Add note</span>
              </div>
            </Col>
          </Row>
        </div>
      <Navbar />
    </div>
  );
};

export default Notes;
