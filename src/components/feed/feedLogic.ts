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

export const addFriends = async (userId : string) => {
  try {
      let response = await fetch(`${process.env.REACT_APP_BE_URL}/users/friends/add`,{
          method: "POST",
          headers:{
              "Content-Type": "application/json",
              Authorization: `Bearer ${window.localStorage.getItem("token")}`
          },
          body: JSON.stringify({user : userId})
      })
      return response
  } catch (err) {
    console.log(err);
  }
};

export const removeFriends = async (userId : string) => {
  try {
      let response = await fetch(`${process.env.REACT_APP_BE_URL}/users/friends/remove`,{
          method: "POST",
          headers:{
              "Content-Type": "application/json",
              Authorization: `Bearer ${window.localStorage.getItem("token")}`
          },
          body: JSON.stringify({user : userId})
      })
      return response
  } catch (err) {
    console.log(err);
  }
};