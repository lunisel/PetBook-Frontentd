import { infoMeInt, userInt } from "../../utils/interfaces";



export const handleOnChange = (
  e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLTextAreaElement>,
  key: string,
  updatedUser: infoMeInt | null,
  setUpdatedUser: any,
  user: userInt
) => {
  if (key === "name" || key === "surname" || key === "birthdayOwner") {
    if (key === "name") {
      setUpdatedUser({
        myOwner: {
          surname: user.myOwner.surname,
          [key]: e.currentTarget.value,
        },
      });
    }
    else if (key === "surname") {
        setUpdatedUser({
          myOwner: {
            name: user.myOwner.name,
            [key]: e.currentTarget.value,
          },
        });
      }
      else if (key === "birthdayOwner") {
        setUpdatedUser({
          myOwner: {
            name: user.myOwner.name,
            surname: user.myOwner.surname,
            birthday: e.currentTarget.value,
          },
        });
      }
  } else {
    setUpdatedUser({
      [key]: e.currentTarget.value,
    });
  }
};

export const handleSubmit = async(updatedUser: infoMeInt | null ) => {
console.log(updatedUser)
try{
    let response = await fetch(`${process.env.REACT_APP_BE_URL}/users/me`,{
        method: "PUT",
        headers:{
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${window.localStorage.getItem("token")}`
        },
        body: JSON.stringify(updatedUser)
    })
    if(response.ok){
        let data = await response.json()
        return data
    }

}catch(err){
    console.log(err)
}
}
