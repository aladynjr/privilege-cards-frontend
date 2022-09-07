import React, { useEffect, useState } from 'react'
import BussinessesList from '../components/bussinesseslist';
import Join from '../components/join'
import { useNavigate } from 'react-router-dom';
import { auth } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import Login from '../components/login';
import HomeBG from '../assets/imgs/homebg.jpg';
import { GiPalmTree } from 'react-icons/gi';
import Button from '@mui/material/Button';
import Modal from '../components/modal';


function LoginScreen() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('isLogged')) {
      navigate("/Home");
    } else {
      navigate("/");

    }
  }, [])

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      navigate("/Home");
    }

  });

  const [bussinesses, setBussinesses] = useState([]);

const [joinModal, setJoinModal] = useState(false)
const [loginModal, setLoginModal] = useState(false)


  return (
    <div>

      <div className="homepagehero">
        <div className='homepagehero-inner'>
          <p style={{ color: "white" }}> Larnaca City  <GiPalmTree style={{ fontSize: '30px', marginBottom: '-7px' }} /></p>

          <h1 style={{ color: "white" }}>Have Fun, Save Money !</h1>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', width: '100%', justifyContent: 'center' }} >
            <Button variant="contained" style={{ fontSize: '20px', color: "white", width: 'max-content', background: 'limegreen', fontFamily: 'Crimson Pro' }} onClick={()=>setJoinModal(true)} >GET STARTED</Button>
            <Button variant="outlined" style={{ fontSize: '20px', color: "limegreen", width: 'max-content', marginInline: '28px', background: '#00000050', border: 'none', fontFamily: 'Crimson Pro' }} onClick={()=>setLoginModal(true)} >Login</Button>

          </div>

        </div>

      </div>

      {joinModal && <Modal
        fullscreen={true}
        onClick={() => { }}
        titletext=""
        titlecolor='whitesmoke'
        bodytext={
          <div style={{ height: '100vh', display: 'flex', alignItems: 'center' }}  >
            <Join setJoinModal={setJoinModal} />
          </div>

        }


      />}

{loginModal && <Modal
        fullscreen={true}
        onClick={() => { }}
        titletext=""
        titlecolor='whitesmoke'
        bodytext={
          <div style={{ height: '100vh', display: 'flex', alignItems: 'center' }}  >
            <Login setLoginModal={setLoginModal} />
          </div>

        }


      />}

      <BussinessesList bussinesses={bussinesses} setBussinesses={setBussinesses} />
    </div>
  )
}

export default LoginScreen



{/* <img className="homebg" src={HomeBG} /> */ }
{/* <div style={{ display: 'flex', flexWrap: 'wrap', position: 'absolute', top: '83%', left: '50%', transform: 'translate(-50%, 0)', }} >
        <Button variant="contained" style={{ fontSize: '30px', color: "white" }}>GET STARTED</Button>
        <a>I Have an Account</a>
      </div> */}