import { userInt } from "../../utils/interfaces";

export const handleOnChangeFeed = (
  e: React.ChangeEvent<HTMLInputElement>,
  query: string | null,
  setQuery: any
) => {
  setQuery(e.target.value);
};

export const handleSubmitFeed = async (
  e: React.KeyboardEvent,
  query: string | null
) => {
  try {
    let response = await fetch(
      `${process.env.REACT_APP_BE_URL}/users?username=${query}`
    );
    if (response.ok) {
      let data = await response.json();
      return data;
    }
  } catch (err) {
    console.log(err);
  }
};

export const addFriends = async (userId: string) => {
  try {
    let response = await fetch(
      `${process.env.REACT_APP_BE_URL}/users/friends/add`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ user: userId }),
      }
    );
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const removeFriends = async (userId: string) => {
  try {
    let response = await fetch(
      `${process.env.REACT_APP_BE_URL}/users/friends/remove`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ user: userId }),
      }
    );
    return response;
  } catch (err) {
    console.log(err);
  }
};

/* ----------------------------------FEED POSTS FILTERED BY YOUR CITY----------------------------------- */

/* 1. get all the users in my city -
   2. map the [users] to display only the ids -
   3. for each id, you should find the posts that include that id -
   4. push the found posts into an array [allPosts] -
   5. sort allPosts chronologically
   6. display [allPosts]
*/

export const filteredUsersByCity = async (
  user: userInt | null
) => {
  try {
    let response = await fetch(
      `${process.env.REACT_APP_BE_URL}/users?city=${user?.city}`
    );
    if (response.ok) {
      let data: userInt[] = await response.json();
      if (data) {
        let arrOfIds = data.map((d) => d._id);
        return arrOfIds
      }
    }
  } catch (err) {
    console.log(err);
  }
};

export const filteredPostsByCity = async (arrUsers: (string | undefined)[]) => {
  console.log("POST FETCH POST")
  try {
    let response = await fetch(`${process.env.REACT_APP_BE_URL}/posts/feed`,{
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(arrUsers)
    });
    let data = await response.json()
    return data
  } catch (err) {
    console.log(err);
  }
};
