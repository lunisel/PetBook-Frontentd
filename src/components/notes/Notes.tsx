import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { RouteComponentProps } from "react-router";
import { getNoteInt } from "../../utils/interfaces";
import { HiPlusCircle } from "react-icons/hi";
import Navbar from "../Navbar";
import "./notes.css";
import { FaPaw } from "react-icons/fa";

const Notes = (props: RouteComponentProps) => {
  const [allNotes, setAllNotes] = useState<getNoteInt[] | null>(null);
  return (
    <div className="notes-big-cont">
      <div className="notes-page-content-container">
        <div className="top-logo-fixed-mobile">
          <FaPaw className="top-logo-fixed-icon" />
          <span className="title-top-logo-fixed">PetBook</span>
        </div>
        <h1 className="notes-title">Your Notes</h1>
        <Row className="single-notes-container">
          <Col xs={12} md={4} lg={2} className="add-new-note-container">
            <div className="single-add-note">
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
