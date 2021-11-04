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
import { Col, Row, Spinner } from "react-bootstrap";
import SingleProfileFeed from "./SingleProfileFeed";
import { useSelector } from "react-redux";
import SinglePost from "../posts/SinglePost";

const Feed = (props: RouteComponentProps) => {
  const [query, setQuery] = useState<string>("");
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

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      let arrOfUsers = await filteredUsersByCity(currentUser);
      if (arrOfUsers) {
        setUsersInMyCity(arrOfUsers);
        if (usersInMyCity.length > 0) {
          console.log(usersInMyCity);
          let arrOfPosts = await filteredPostsByCity(usersInMyCity);
          if (arrOfPosts) {
            let sortedArray: postInt[] = arrOfPosts.sort(function (
              a: any,
              b: any
            ) {
              return +new Date(b.updatedAt) - +new Date(a.updatedAt);
            });
            console.log("set posts");
            setPostInMyCity(sortedArray);
            setLoading(false);
          }
        }
      }
    };
    fetchAll();
  }, [usersInMyCity.length > 0]);

  return (
    <div className="feed-big-cont">
      <Navbar />
      <div className="search-users-container-feed">
        <input
          type="text"
          className="search-bar-feed mt-3"
          placeholder="Search username here..."
          value={query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleOnChangeFeed(e, query, setQuery);
            if (e.target.value === "") {
              setLoading(false);
              setSearchedProfiles(null);
            }
          }}
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
      </div>

      <Row className="post-in-your-city-container m-0">
        {postInMyCity &&
          postInMyCity.map((p, i) => (
            <Col xs={12} md={6} className="single-post-col" key={i}>
              <SinglePost post={p} props={props} />
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default Feed;
