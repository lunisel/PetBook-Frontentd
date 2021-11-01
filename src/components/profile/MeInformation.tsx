import { useDispatch, useSelector } from "react-redux";
import { infoMeInt, reduxStateInt } from "../../utils/interfaces";
import { FaCheck } from "react-icons/fa";
import { GoDeviceCamera } from "react-icons/go";
import React, { useEffect, useState } from "react";
import { handleOnChange } from "./profileLogic";
import { handleSubmit } from "../profile/profileLogic";
import { addCurrentUser } from "../../redux/actions/user";
import { Spinner } from "react-bootstrap";

const MeInformation = () => {
  const user = useSelector((state: reduxStateInt) => state.user.currentUser);

  const dispatch = useDispatch();

  const [updatedUser, setUpdatedUser] = useState<infoMeInt | null>(null);

  const [loading, setLoading] = useState(false);

  useEffect(()=>{

  }, [user])

  return (
    <div className="me-information-container">
      <div className="me-pet-info-container">
        <div className="info-content-container">
          <span className="info-name">Bio:</span>
          <textarea
            placeholder="Write your bio here..."
            defaultValue={user?.bio}
            className="info-content-textarea"
            onKeyPress={async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
              handleOnChange(e, "bio", updatedUser, setUpdatedUser, user!);
              if (e.key === "Enter") {
                setLoading(true);
                let data = await handleSubmit(updatedUser);
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
                let data = await handleSubmit(updatedUser);
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
            onKeyPress={async (e: React.KeyboardEvent<HTMLInputElement>) => {
              handleOnChange(e, "species", updatedUser, setUpdatedUser, user!);
              if (e.key === "Enter") {
                setLoading(true);
                let data = await handleSubmit(updatedUser);
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
                let data = await handleSubmit(updatedUser);
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
            onKeyPress={async (e: React.KeyboardEvent<HTMLInputElement>) => {
                handleOnChange(e, "birthday", updatedUser, setUpdatedUser, user!);
                if (e.key === "Enter") {
                  setLoading(true);
                  let data = await handleSubmit(updatedUser);
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
                let data = await handleSubmit(updatedUser);
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
            onKeyPress={async (e: React.KeyboardEvent<HTMLInputElement>) => {
                handleOnChange(e, "city", updatedUser, setUpdatedUser, user!);
                if (e.key === "Enter") {
                  setLoading(true);
                  let data = await handleSubmit(updatedUser);
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
                let data = await handleSubmit(updatedUser);
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
            onKeyPress={async (e: React.KeyboardEvent<HTMLInputElement>) => {
                handleOnChange(e, "email", updatedUser, setUpdatedUser, user!);
                if (e.key === "Enter") {
                  setLoading(true);
                  let data = await handleSubmit(updatedUser);
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
                let data = await handleSubmit(updatedUser);
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
            onKeyPress={async (e: React.KeyboardEvent<HTMLInputElement>) => {
                handleOnChange(e, "password", updatedUser, setUpdatedUser, user!);
                if (e.key === "Enter") {
                  setLoading(true);
                  let data = await handleSubmit(updatedUser);
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
                let data = await handleSubmit(updatedUser);
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
        <div className="avatar-owner-container">
          <img
            src={user?.avatar}
            alt="pet-avatar"
            className="avatar-me-page img-fluid"
          />
          <GoDeviceCamera className="camera-icon owner" />
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
            onKeyPress={async (e: React.KeyboardEvent<HTMLInputElement>) => {
                handleOnChange(e, "name", updatedUser, setUpdatedUser, user!);
                if (e.key === "Enter") {
                  setLoading(true);
                  let data = await handleSubmit(updatedUser);
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
                let data = await handleSubmit(updatedUser);
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
            onKeyPress={async (e: React.KeyboardEvent<HTMLInputElement>) => {
                handleOnChange(e, "surname", updatedUser, setUpdatedUser, user!);
                if (e.key === "Enter") {
                  setLoading(true);
                  let data = await handleSubmit(updatedUser);
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
                let data = await handleSubmit(updatedUser);
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
            onKeyPress={async (e: React.KeyboardEvent<HTMLInputElement>) => {
                handleOnChange(e, "birthdayOwner", updatedUser, setUpdatedUser, user!);
                if (e.key === "Enter") {
                  setLoading(true);
                  let data = await handleSubmit(updatedUser);
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
                let data = await handleSubmit(updatedUser);
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

export default MeInformation;