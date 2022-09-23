import React, { useEffect, useState, useReducer } from 'react'
import { auth } from "../firebase-config";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import BussinessesList from '../components/bussinesseslist';
import Button from '@mui/material/Button';
import FavouriteBussinessesList from '../components/favouritebussinesseslist';
import GetUserData from '../utilities/getuserdata';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { MdOutlineExpandMore } from 'react-icons/md';
import { MdFavorite } from 'react-icons/md';
import HomepageCard from '../components/homepagecard';
import SearchScreen from './verificationscreen';

function HomeScreen() {
  const navigate = useNavigate();

  const [userID, setUserID] = useState(null);

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setUserID(currentUser.uid)
    }
    if (currentUser && (!localStorage.getItem('isLogged'))) {
      localStorage.setItem('isLogged', 'true')
    }
    if (!currentUser) {
      localStorage.removeItem('isLogged')
      navigate("/");
    }
  });

  var userData = GetUserData(userID);

  const logout = async () => {
    await signOut(auth);

    localStorage.removeItem('isLogged');
    navigate("/")

  };


  const [bussinesses, setBussinesses] = useState([]);
  const [favouriteBussinesses, setFavouriteBussinesses] = useState([]);
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  //get favorite bussinesses id for this user from junction table


  const getFavouriteBussinesses = async (id) => {
    try {
      const response = await fetch(process.env.REACT_APP_HOST+`/api/app_user_bussiness/${id}`);
      const jsonData = await response.json();
      setFavouriteBussinesses(jsonData);


    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (!userData?.app_user_id) return;
    getFavouriteBussinesses(userData?.app_user_id);
  }, [userData?.app_user_id]);

  console.log(favouriteBussinesses)


  //update app_user_main_privilege_card
  const UpdateMainPrivilegeCard = async (app_user_id, app_user_main_privilege_card) => {
    try {
      const body = {
        app_user_main_privilege_card,
      };
      const response = await fetch(process.env.REACT_APP_HOST+`/api/app_user/${app_user_id}`, {
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

  //purchase a card through stripe 
  const PurchaseCard = async (app_user_id, app_user_main_privilege_card) => {
    fetch(process.env.REACT_APP_HOST+"/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [
          { id: 1, quantity: 1},
        ],
        app_user_id: app_user_id,       
        userData: userData,
      }
      ),
    })
      .then(res => {
        if (res.ok) return res.json()
        return res.json().then(json => Promise.reject(json))
      })
      .then(({ url }) => {
        console.log(url)
        window.location.href = url
      })
      .catch(e => {
        console.error(e.error)
      })
    
  };


  return (
    <div>
      <h1 style={{opacity:'0.8', marginBottom:'35px'}} >Digital Discount Card</h1>

      <HomepageCard UpdateMainPrivilegeCard={UpdateMainPrivilegeCard} PurchaseCard={PurchaseCard} userID={userData?.app_user_id} cardAvailable={userData?.app_user_main_privilege_card} />
  
      {favouriteBussinesses?.length > 0 && <Accordion style={{marginBlock:'20px'}}>
        <AccordionSummary
          expandIcon={<MdOutlineExpandMore style={{fontSize:'25px'}} />}
          aria-controls="panel2a-content"
          id="panel2a-header"
          style={{background:'whitesmoke'}}
        >
          <p style={{margin:'auto', fontWeight:'900'}}>FAVORITES <MdFavorite style={{marginBottom:'-2px'}} /></p>
        </AccordionSummary>
        <AccordionDetails style={{background:'snow'}}>

          <FavouriteBussinessesList
            favouriteBussinesses={favouriteBussinesses}
            setFavouriteBussinesses={setFavouriteBussinesses}
            userID={userData?.app_user_id}
            userName={userData?.app_user_name}
            loggedInButtons={true}
            cardAvailable={userData?.app_user_main_privilege_card}
          />

        </AccordionDetails>
      </Accordion>
      }

            <h1 style={{ opacity: '0.9' }} >AVAILABLE OFFERS</h1>

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





      <Button variant="contained" color="error" onClick={() => { logout() }} >logout</Button>
    </div>


  )
}

export default HomeScreen