export const handleOnChangeFeed = (e : React.ChangeEvent<HTMLInputElement>, query: string | null, setQuery: any) => {
    setQuery(e.target.value)
}

export const handleSubmitFeed = async (e: React.KeyboardEvent, query: string | null) => {
try{
    let response = await fetch(`${process.env.REACT_APP_BE_URL}/users?username=${query}`);
    if(response.ok){
        let data = await response.json()
        return data
    }
}catch(err){
    console.log(err)
}
}