import React, { useState } from 'react'
import { auth, db } from "../firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,

} from "firebase/auth";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';


function Login({ setLoginModal }) {
  const navigate = useNavigate();

  const [logging, setLogging] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const login = async () => {
    try {
      setLogging(true);
      const user = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      //localStorage.clear();
      localStorage.setItem('isLogged', 'true');
      // history.push("/Home")
      //window.location.reload()
      navigate('/Home')
    } catch (error) {
      console.log(error.message);
      if (error.message == 'Firebase: Error (auth/user-not-found).') { setLoginError(' الرجاء إعادة التثبت من المعلومات'); setLogging(false); }
      if (error.message == 'Firebase: Error (auth/invalid-email).') { setLoginError('الرّجاء إعادة تفقّد الإيميل '); setLogging(false); }
      if (error.message == 'Firebase: Error (auth/wrong-password).') {
        setLoginError('كلمة السر خاطئة');
        setLogging(false);
      }
    }
  };


  return (
    <div className='joinform' style={{height:'50vh'}}>

      <TextField variant="outlined" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <TextField variant="outlined" type="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />


      <Button variant="contained" color="success" onClick={login} >Login</Button>
      <Button variant="outlined" style={{ fontSize: '10px', color: 'black', border: 'none', marginTop: '20px' }} onClick={() => { setLoginModal(false) }} >Close</Button>


    </div>
  )
}

export default Login