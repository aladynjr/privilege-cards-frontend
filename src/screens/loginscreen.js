import React, { useEffect, useState } from 'react'
import BussinessesList from '../components/bussinesseslist';
import Join from '../components/join'
import { useNavigate } from 'react-router-dom';
import { auth } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import Login from '../components/login';

import { GiPalmTree } from 'react-icons/gi';
import Button from '@mui/material/Button';
import Modal from '../components/modal';

import { BiRestaurant } from 'react-icons/bi';
import { MdCardMembership } from 'react-icons/md';

import { BiHappyHeartEyes } from 'react-icons/bi';

import ProgressiveImage from "react-progressive-image-loading";

import VerificationScreen from './verificationscreen';

import { Divider } from '@mui/material';
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

const [showVerification, setShowVerification] = useState(false)
  return (
    <div>

      <div className="homepagehero animate__animated animate__fadeIn">
        <div className='homepagehero-inner '>
          <p style={{ color: "white" }}> Larnaca City  <GiPalmTree style={{ fontSize: '30px', marginBottom: '-7px' }} /></p>

          <h1 style={{ color: "white" }}>Have Fun, Save Money!</h1>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', width: '100%', justifyContent: 'center' }} >
            <Button variant="contained" style={{ fontSize: '20px', color: "white", width: 'max-content', background: 'limegreen', fontFamily: 'Crimson Pro' }} onClick={()=>setJoinModal(true)} >GET STARTED</Button>
            <Button variant="outlined" style={{ fontSize: '20px', color: "limegreen", width: 'max-content', marginInline: '28px', background: '#00000050', border: 'none', fontFamily: 'Crimson Pro' }} onClick={()=>setLoginModal(true)} >Login</Button>

          </div>

        </div>

      </div>



      <div style={{marginBlock:'50px'}}>
      <div style={{display:'flex',flexWrap:'wrap', width:'70vw', alignItems:'center', margin:'auto',justifyContent:'center',marginBottom:'30px'}}><BiRestaurant style={{fontSize:'65px', color:'dodgerblue'}} /> <h3 style={{width:'60%', padding:'0px 40px'}}>Click on any venue to see its full listing page, including photos, description, map, and the relevant dining offer.</h3> </div>
      <div style={{display:'flex',flexWrap:'wrap', width:'70vw', alignItems:'center', margin:'auto',justifyContent:'center',marginBottom:'30px'}}><MdCardMembership style={{fontSize:'65px', color:'coral'}} /> <h3 style={{width:'60%', padding:'0px 40px'}} >Press the "Show Your Card" button on that page, to generate your personalised Card for that venue, to show to staff when requesting the bill</h3> </div>
      <div style={{display:'flex',flexWrap:'wrap', width:'70vw', alignItems:'center', margin:'auto',justifyContent:'center',marginBottom:'30px'}}><BiHappyHeartEyes style={{fontSize:'65px', color:'crimson'}} /> <h3 style={{width:'60%', padding:'0px 40px'}} >Get a reduced bill price with the <b style={{color:'crimson', fontWeight:'900'}} > discount</b></h3> </div>

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

      <BussinessesList 
       bussinesses={bussinesses}
       setBussinesses={setBussinesses}
       
       loggedInButtons={false}
       cardAvailable={false}
       setJoinModal={setJoinModal}
        />

        <Divider style={{margin:'auto',width:'70%', marginBlock:'100px'}} />

  <div style={{marginBottom:'50px'}} >

  {!showVerification && <a style={{fontSize:'25px', color:'coral', textDecoration:'underline', cursor:'pointer'}} onClick={()=>{ setShowVerification(true)}} >Verify Card </a>}

  {showVerification && <div className="animate__animated animate__fadeInDown"> <VerificationScreen  /></div>}
  </div>
       
    </div>
  )
}

export default LoginScreen



{/* <img className="homebg" src={HomeBG} /> */ }
{/* <div style={{ display: 'flex', flexWrap: 'wrap', position: 'absolute', top: '83%', left: '50%', transform: 'translate(-50%, 0)', }} >
        <Button variant="contained" style={{ fontSize: '30px', color: "white" }}>GET STARTED</Button>
        <a>I Have an Account</a>
      </div> */}