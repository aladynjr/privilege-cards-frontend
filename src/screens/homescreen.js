import React, { useEffect, useState, useReducer } from 'react'
import { auth } from "../firebase-config";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import BussinessesList from '../components/bussinesseslist';
import Button from '@mui/material/Button';
import FavouriteBussinessesList from '../components/favouritebussinesseslist';
import GetUserData from '../utilities/getuserdata';
function HomeScreen() {
  const navigate = useNavigate();


  onAuthStateChanged(auth, (currentUser) => {

    if (currentUser && (!localStorage.getItem('isLogged'))) {
      localStorage.setItem('isLogged', 'true')
    }
    if (!currentUser) {
      localStorage.removeItem('isLogged')
      navigate("/");
    }
  });

  const userData = GetUserData();

    const logout = async () => {
        await signOut(auth);

        localStorage.removeItem('isLogged');
        navigate("/")

      };


  const [bussinesses, setBussinesses] = useState([]);
  const [favouriteBussinesses, setFavouriteBussinesses] = useState([]);
  const [, forceUpdate] = useReducer(x => x + 1, 0);

//update app_user_main_privilege_card
      const UpdateMainPrivilegeCard = async (app_user_id, app_user_main_privilege_card) => {
        try {
          const body = {
            app_user_main_privilege_card,
          };
          const response = await fetch(`http://localhost:4000/api/app_user/${app_user_id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
          });
            userData.app_user_main_privilege_card = app_user_main_privilege_card;
            forceUpdate() 

          } catch (err) {
          console.error(err.message);
        }
      };


  return (
    <div>HomeScreen
<p>{userData?.app_user_name}</p>
<p>{userData?.app_user_email}</p>
{userData?.app_user_main_privilege_card ? <p>PRIVILEGE CARD AVAILABLE</p> : <p>NO PRIVILEGE CARD</p>}
<Button  variant="contained" color="success" onClick={()=>{UpdateMainPrivilegeCard(userData?.app_user_id, true)}} >GET CARD !</Button>

      <BussinessesList 
      bussinesses={bussinesses} 
      setBussinesses={setBussinesses} 
      favouriteBussinesses={favouriteBussinesses} 
      setFavouriteBussinesses={setFavouriteBussinesses}  
      userID={userData?.app_user_id} 
      userName={userData?.app_user_name}
      loggedInButtons={true}
      cardAvailable={userData?.app_user_main_privilege_card}
      />
      <FavouriteBussinessesList favouriteBussinesses={favouriteBussinesses} setFavouriteBussinesses={setFavouriteBussinesses} userID={userData?.app_user_id} />

      
<Button  variant="contained" color="error" onClick={()=>{logout()}} >logout</Button>
    </div>


  )
}

export default HomeScreen