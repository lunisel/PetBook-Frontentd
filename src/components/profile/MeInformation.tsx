import { useDispatch, useSelector } from "react-redux";
import { infoMeInt, reduxStateInt } from "../../utils/interfaces";
import { FaCheck } from "react-icons/fa";
import { GoDeviceCamera } from "react-icons/go";
import React, { useEffect, useRef, useState } from "react";
import { handleOnChange, updateOwnerAvatar } from "./profileLogic";
import { handleSubmit, changeImg } from "../profile/profileLogic";
import { addCurrentUser } from "../../redux/actions/user";
import { Spinner } from "react-bootstrap";
import {sendRequestWithToken} from "../../utils/commonLogic"
import { RouteComponentProps, withRouter } from "react-router";

const MeInformation = (props: RouteComponentProps) => {
  const user = useSelector((state: reduxStateInt) => state.user.currentUser);

  const inputFile = useRef<any>(null);

  const [imgHovered, setImgHovered] = useState(false) 

  const dispatch = useDispatch();

  const [updatedUser, setUpdatedUser] = useState<infoMeInt | null>(null);
  const [avatarPreview, setPreview] = useState<string | null>(null)

  const [loading, setLoading] = useState(false);

  const openFileDialog = () =>{
    inputFile.current.click();
  }

  useEffect(()=>{
    const updateAvatar = async () => {
      let data = await sendRequestWithToken(updateOwnerAvatar, props, updatedUser, "")
      if(data)dispatch(addCurrentUser(data))
    }
    updateAvatar()
  },[avatarPreview !== null])

  return (
    <div className="me-information-container">
      <div className="me-pet-info-container">

        <div className="info-content-container">
          <span className="info-name">Bio:</span>
          <textarea
            placeholder="Write your bio here..."
            defaultValue={user?.bio}
            className="info-content-textarea"
            onChange={(e : React.ChangeEvent<HTMLTextAreaElement>)=> {handleOnChange(e, "bio", updatedUser, setUpdatedUser, user!);}}
            onKeyPress={async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
              if (e.key === "Enter") {
                setLoading(true);
                let data = await sendRequestWithToken(handleSubmit, props, updatedUser, "" );
                if (data) {
                  dispatch(addCurrentUser(data));
                  setLoading(false);
                }
              }
            }}
          ></textarea>
          {loading ? (
            <Spinner
              animation="border"
              className="input-check"
              style={{ width: "1rem", height: "1rem" }}
            />
          ) : (
            <FaCheck
              className="input-check"
              onClick={async () => {
                setLoading(true);
                let data = await sendRequestWithToken(handleSubmit, props, updatedUser, "" )
                if (data) {
                  dispatch(addCurrentUser(data));
                  setLoading(false);
                }
              }}
            />
          )}
        </div>

        <div className="info-content-container">
          <span className="info-name" id="info-name-bio">
            Species:
          </span>
          <input
            type="text"
            placeholder="Write your species here..."
            defaultValue={user?.species}
            className="info-content"
            onChange={(e : React.ChangeEvent<HTMLInputElement>)=> {handleOnChange(e, "species", updatedUser, setUpdatedUser, user!)}}
            onKeyPress={async (e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") {
                setLoading(true);
                let data = await sendRequestWithToken(handleSubmit, props, updatedUser , "");
                if (data) {
                  dispatch(addCurrentUser(data));
                  setLoading(false);
                }
              }
            }}
          />
          {loading ? (
            <Spinner
              animation="border"
              className="input-check"
              style={{ width: "1rem", height: "1rem" }}
            />
          ) : (
            <FaCheck
              className="input-check"
              onClick={async () => {
                setLoading(true);
                let data = await sendRequestWithToken(handleSubmit, props, updatedUser, "" );
                if (data) {
                  dispatch(addCurrentUser(data));
                  setLoading(false);
                }
              }}
            />
          )}
        </div>

        <div className="info-content-container">
          <span className="info-name" id="info-name-bio">
            Birthday:
          </span>
          <input
            type="text"
            placeholder="Write your birthday here..."
            defaultValue={user?.birthday}
            className="info-content"
            onChange={(e : React.ChangeEvent<HTMLInputElement>)=> {handleOnChange(e, "birthday", updatedUser, setUpdatedUser, user!);}}
            onKeyPress={async (e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter") {
                  setLoading(true);
                  let data =  await sendRequestWithToken(handleSubmit, props, updatedUser, "" );
                  if (data) {
                    dispatch(addCurrentUser(data));
                    setLoading(false);
                  }
                }
              }}
          />
          {loading ? (
            <Spinner
              animation="border"
              className="input-check"
              style={{ width: "1rem", height: "1rem" }}
            />
          ) : (
            <FaCheck
              className="input-check"
              onClick={async () => {
                setLoading(true);
                let data = await sendRequestWithToken(handleSubmit, props, updatedUser,"" );
                if (data) {
                  dispatch(addCurrentUser(data));
                  setLoading(false);
                }
              }}
            />
          )}
        </div>

        <div className="info-content-container">
          <span className="info-name" id="info-name-bio">
            City:
          </span>
          <input
            type="text"
            placeholder="Write your city here..."
            defaultValue={user?.city}
            className="info-content"
            onChange={(e : React.ChangeEvent<HTMLInputElement>)=> {handleOnChange(e, "city", updatedUser, setUpdatedUser, user!);}}
            onKeyPress={async (e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter") {
                  setLoading(true);
                  let data =  await sendRequestWithToken(handleSubmit, props, updatedUser,"" );
                  if (data) {
                    dispatch(addCurrentUser(data));
                    setLoading(false);
                  }
                }
              }}
          />
          {loading ? (
            <Spinner
              animation="border"
              className="input-check"
              style={{ width: "1rem", height: "1rem" }}
            />
          ) : (
            <FaCheck
              className="input-check"
              onClick={async () => {
                setLoading(true);
                let data = await sendRequestWithToken(handleSubmit, props, updatedUser ,"");
                if (data) {
                  dispatch(addCurrentUser(data));
                  setLoading(false);
                }
              }}
            />
          )}
        </div>

        <div className="info-content-container">
          <span className="info-name" id="info-name-bio">
            Email:
          </span>
          <input
            type="text"
            placeholder="Write your email here..."
            defaultValue={user?.email}
            className="info-content"
            onChange={(e : React.ChangeEvent<HTMLInputElement>)=> { handleOnChange(e, "email", updatedUser, setUpdatedUser, user!);}}
            onKeyPress={async (e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter") {
                  setLoading(true);
                  let data =  await sendRequestWithToken(handleSubmit, props, updatedUser,"" );
                  if (data) {
                    dispatch(addCurrentUser(data));
                    setLoading(false);
                  }
                }
              }}
          />
         {loading ? (
            <Spinner
              animation="border"
              className="input-check"
              style={{ width: "1rem", height: "1rem" }}
            />
          ) : (
            <FaCheck
              className="input-check"
              onClick={async () => {
                setLoading(true);
                let data = await sendRequestWithToken(handleSubmit, props, updatedUser,"" );
                if (data) {
                  dispatch(addCurrentUser(data));
                  setLoading(false);
                }
              }}
            />
          )}
        </div>

        <div className="info-content-container">
          <span className="info-name" id="info-name-bio">
            Password:
          </span>
          <input
            type="password"
            placeholder="Write your password here..."
            defaultValue="••••••••••"
            className="info-content"
            onChange={(e : React.ChangeEvent<HTMLInputElement>)=> {handleOnChange(e, "password", updatedUser, setUpdatedUser, user!);}}
            onKeyPress={async (e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter") {
                  setLoading(true);
                  let data =  await sendRequestWithToken(handleSubmit, props, updatedUser,"" );
                  if (data) {
                    dispatch(addCurrentUser(data));
                    setLoading(false);
                  }
                }
              }}
          />
          {loading ? (
            <Spinner
              animation="border"
              className="input-check"
              style={{ width: "1rem", height: "1rem" }}
            />
          ) : (
            <FaCheck
              className="input-check"
              onClick={async () => {
                setLoading(true);
                let data = await await sendRequestWithToken(handleSubmit, props, updatedUser,"" );
                if (data) {
                  dispatch(addCurrentUser(data));
                  setLoading(false);
                }
              }}
            />
          )}
        </div>
      </div>

      <div className="divider-me-info"></div>

      <div className="me-my-owner-info-container">
        <div className="avatar-owner-container" onClick={() => openFileDialog()} onMouseOver={()=> setImgHovered(true)} onMouseOut={()=> setImgHovered(false)}>
        <input
              type="file"
              id="file"
              ref={inputFile}
              style={{ display: "none" }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                changeImg(e, setPreview, setUpdatedUser, "ownerAvatar")
              }}
            />
          <img
            src={avatarPreview ? avatarPreview : user?.myOwner.ownerAvatar}
            alt="pet-avatar"
            className="owner-avatar-me-page"
          />
          {<GoDeviceCamera className="camera-icon owner" />}
        </div>
        <div className="info-content-container owner">
          <span className="info-name" id="info-name-bio">
            Name:
          </span>
          <input
            type="text"
            placeholder="Write your owner's name here..."
            defaultValue={user?.myOwner.name}
            className="info-content owner"
            onChange={(e : React.ChangeEvent<HTMLInputElement>)=> {handleOnChange(e, "name", updatedUser, setUpdatedUser, user!);}}
            onKeyPress={async (e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter") {
                  setLoading(true);
                  let data =  await sendRequestWithToken(handleSubmit, props, updatedUser,"" );
                  if (data) {
                    dispatch(addCurrentUser(data));
                    setLoading(false);
                  }
                }
              }}
          />
          {loading ? (
            <Spinner
              animation="border"
              className="input-check owner"
              style={{ width: "1rem", height: "1rem" }}
            />
          ) : (
            <FaCheck
              className="input-check owner"
              onClick={async () => {
                setLoading(true);
                let data = await await sendRequestWithToken(handleSubmit, props, updatedUser,"" );
                if (data) {
                  dispatch(addCurrentUser(data));
                  setLoading(false);
                }
              }}
            />
          )}
        </div>

        <div className="info-content-container owner">
          <span className="info-name" id="info-name-bio">
            Surname:
          </span>
          <input
            type="text"
            placeholder="Write your owner's surname here..."
            defaultValue={user?.myOwner.surname}
            className="info-content owner"
            onChange={(e : React.ChangeEvent<HTMLInputElement>)=> {handleOnChange(e, "surname", updatedUser, setUpdatedUser, user!);}}
            onKeyPress={async (e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter") {
                  setLoading(true);
                  let data = await  await sendRequestWithToken(handleSubmit, props, updatedUser ,"");
                  if (data) {
                    dispatch(addCurrentUser(data));
                    setLoading(false);
                  }
                }
              }}
          />
          {loading ? (
            <Spinner
              animation="border"
              className="input-check owner"
              style={{ width: "1rem", height: "1rem" }}
            />
          ) : (
            <FaCheck
              className="input-check owner"
              onClick={async () => {
                setLoading(true);
                let data = await await sendRequestWithToken(handleSubmit, props, updatedUser ,"");
                if (data) {
                  dispatch(addCurrentUser(data));
                  setLoading(false);
                }
              }}
            />
          )}
        </div>

        <div className="info-content-container owner">
          <span className="info-name" id="info-name-bio">
            Birthday:
          </span>
          <input
            type="text"
            placeholder="Write your owner's birthday here..."
            defaultValue={user?.myOwner.birthday}
            className="info-content owner"
            onChange={(e : React.ChangeEvent<HTMLInputElement>)=> {handleOnChange(e, "birthdayOwner", updatedUser, setUpdatedUser, user!);}}
            onKeyPress={async (e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter") {
                  setLoading(true);
                  let data =  await sendRequestWithToken(handleSubmit, props, updatedUser ,"");
                  if (data) {
                    dispatch(addCurrentUser(data));
                    setLoading(false);
                  }
                }
              }}
          />
          {loading ? (
            <Spinner
              animation="border"
              className="input-check owner"
              style={{ width: "1rem", height: "1rem" }}
            />
          ) : (
            <FaCheck
              className="input-check owner"
              onClick={async () => {
                setLoading(true);
                let data = await await sendRequestWithToken(handleSubmit, props, updatedUser ,"");
                if (data) {
                  dispatch(addCurrentUser(data));
                  setLoading(false);
                }
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default withRouter(MeInformation);
