import React, { useEffect, useState } from 'react'
import { auth } from "../firebase-config";
import { signOut, onAuthStateChanged } from "firebase/auth";

function GetUserData(userID) {
  const [userData, setUserData] = useState(null)

  const FetchUserData = async () => {
    console.log('%c fetching user data from ' + process.env.REACT_APP_HOST+'/api/app_user/'+userID , 'color: green')
    try {
      const response = await fetch(process.env.REACT_APP_HOST+`/api/app_user/${userID}`);
      const jsonData = await response.json();

      setUserData(jsonData);
      console.log('%c user data fetched', 'color: green')

    } catch (err) {
      console.error(err.message);
      console.log('%c user data not fetched', 'color: red')
  }
  }

  useEffect(()=>{
    if(!userID) return;
    FetchUserData()
  },[userID])


return userData



}

export default GetUserData