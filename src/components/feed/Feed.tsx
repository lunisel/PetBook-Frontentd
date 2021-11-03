import { RouteComponentProps } from "react-router";
import Navbar from "../Navbar";
import {
  handleOnChangeFeed,
  handleSubmitFeed,
  filteredUsersByCity,
  filteredPostsByCity,
} from "./feedLogic";
import "./feed.css";
import React, { useEffect, useState } from "react";
import { postInt, reduxStateInt, userInt } from "../../utils/interfaces";
import { Spinner } from "react-bootstrap";
import SingleProfileFeed from "./SingleProfileFeed";
import { useSelector } from "react-redux";
import SinglePost from "../posts/SinglePost";

const Feed = (props: RouteComponentProps) => {
  const [query, setQuery] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchedProfiles, setSearchedProfiles] = useState<userInt[] | null>(
    null
  );
  const [usersInMyCity, setUsersInMyCity] = useState<(string | undefined)[]>(
    []
  );
  const [postInMyCity, setPostInMyCity] = useState<postInt[] | null>(null);

  const currentUser = useSelector(
    (state: reduxStateInt) => state.user.currentUser
  );

  const fetchAll = async () => {
    let arrOfUsers = await filteredUsersByCity(currentUser);
    if (arrOfUsers) {
      setUsersInMyCity(arrOfUsers);
      let arrOfPosts = await filteredPostsByCity(usersInMyCity);
      let sortedArray : postInt[] = arrOfPosts.sort(function(a: any, b:any){return +new Date(a.updatedAt) - +new Date(b.updatedAt)})
      console.log("sorted array ->",sortedArray);
      setPostInMyCity(arrOfPosts);
    }
  };
  
  useEffect(() => {
    console.log("posts in my city use effect ->", postInMyCity);
  },[postInMyCity]);

  useEffect(() => {
    fetchAll();
  }, []);

  

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
              searchedProfiles.map((u) => <SingleProfileFeed user={u} />)}
          </>
        )}
      </div>
      <div className="post-in-your-city-container">
        {postInMyCity && postInMyCity.map((p)=> (
         <SinglePost post={p} props={props}/>
        ))}
      </div>
    </div>
  );
};

export default Feed;
