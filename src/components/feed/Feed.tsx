import { RouteComponentProps } from "react-router";
import Navbar from "../Navbar";
import { handleOnChangeFeed, handleSubmitFeed } from "./feedLogic";
import "./feed.css";
import React, { useState } from "react";
import { userInt } from "../../utils/interfaces";
import { Spinner } from "react-bootstrap";
import {MdOutlinePersonAddAlt, MdOutlinePersonAddDisabled} from "react-icons/md"

const Feed = ({ history }: RouteComponentProps) => {
  const [query, setQuery] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchedProfiles, setSearchedProfiles] = useState<userInt[] | null>(
    null
  );

  const [friend, setFriend] = useState(false)

  return (
    <div className="feed-big-cont">
      <Navbar />
      <input
        type="text"
        className="search-bar-feed"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleOnChangeFeed(e, query, setQuery)
        }
        onKeyPress={async (e: React.KeyboardEvent) => {
          if (e.key === "Enter") {
            setLoading(true);
            let data = await handleSubmitFeed(e, query);
            if (data) {
              console.log(data);
              setSearchedProfiles(data);
              setLoading(false);
            }
          }
        }}
      />
      <div className="searched-profiles-feed">
        {loading ? (
          <Spinner animation="border" />
        ) : (
          <>
            {searchedProfiles &&
              searchedProfiles.map((u) => (
                <div className="user-searched-cont">
                    <div className="avatar-container-feed"><img src={u.avatar} alt="pet-avatar" className="searched-user-avatar img-fluid" /></div>
                    <div className="user-name-cont"><span className="searched-user-name">{u.petName}</span><span className="searched-user-username">@{u.username}</span></div>
                    <div className="add-remove-friend-cont">{friend ? <MdOutlinePersonAddDisabled className="remove-friend-icon-feed" onClick={()=> setFriend(false)}/> : <MdOutlinePersonAddAlt className="add-friend-icon-feed" onClick={()=> setFriend(true)}/>}</div>
                </div>
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Feed;
