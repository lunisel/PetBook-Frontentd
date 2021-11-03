import { RouteComponentProps } from "react-router";
import Navbar from "../Navbar";
import { handleOnChangeFeed, handleSubmitFeed } from "./feedLogic";
import "./feed.css";
import React, { useState } from "react";
import { userInt } from "../../utils/interfaces";
import { Spinner } from "react-bootstrap";
import SingleProfileFeed from "./SingleProfileFeed"

const Feed = ({ history }: RouteComponentProps) => {
  const [query, setQuery] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchedProfiles, setSearchedProfiles] = useState<userInt[] | null>(
    null
  );

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
                <SingleProfileFeed user={u}/>
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Feed;
