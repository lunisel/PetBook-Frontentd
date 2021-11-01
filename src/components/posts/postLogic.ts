export const getAllPosts = async () => {
  try {
let response = await fetch(`${process.env.REACT_APP_BE_URL}/posts`)
if(response.ok){
    let data = await response.json()
    return data
}
} catch (err) {
    console.log(err);
  }
};

export const getMePosts = async () => {
    try {
        let response = await fetch(`${process.env.REACT_APP_BE_URL}/posts/me`,{
            method: "GET",
            headers:{
                "Authorization" : `Bearer ${window.localStorage.getItem("token")}`
            }
        })
        if(response.ok){
            let data = await response.json()
            return data
        }
        } catch (err) {
            console.log(err);
          }
}