import React, { useEffect, useState } from 'react'
import { auth } from "../firebase-config";
import { signOut, onAuthStateChanged } from "firebase/auth";

function GetUserData() {

    
  const [userID, setUserID] = useState(null);

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setUserID(currentUser.uid)
    }
  });

  const [userData, setUserData] = useState(null)

  const FetchUserData = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/app_user/${userID}`);
      const jsonData = await response.json();

      setUserData(jsonData);

    } catch (err) {
      console.error(err.message);
  }
  }

  useEffect(()=>{
    if(!userID) return;
    FetchUserData()
  },[userID])


return userData



}

export default GetUserData