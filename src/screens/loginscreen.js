import React,{useEffect, useState} from 'react'
import BussinessesList from '../components/bussinesseslist';
import Join from '../components/join'
import { useNavigate } from 'react-router-dom';
import { auth } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import Login from '../components/login';

function LoginScreen() {
  const navigate = useNavigate();
useEffect(()=>{
  if (localStorage.getItem('isLogged')) {
    navigate("/Home");
  } else {
    navigate("/");

  }
},[])

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      navigate("/Home");
    }
  
  });

  const [bussinesses, setBussinesses] = useState([]);

  return (
    <div>
      <Join />
      <Login />
      <BussinessesList bussinesses={bussinesses} setBussinesses={setBussinesses} />
    </div>
  )
}

export default LoginScreen