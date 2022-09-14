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
import LoadingButton from '@mui/lab/LoadingButton';

import {RiLoginBoxFill} from 'react-icons/ri';

import {userSchema} from '../validations/loginuservalidation';

function Login({ setLoginModal }) {


  const navigate = useNavigate();


  const [loginError, setLoginError] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const [validationError, setValidationError] = useState('')
function ValidateData(){
  setValidationError('');
  let data = {
    email : email,
    password : password,
   
  }

  userSchema.validate(data).then((valid) => {
    console.log('valid', valid)
    login()
  }).catch((err) => {
    console.log('err', err.errors[0])
    setValidationError(err.errors[0])
   
  })
  return (!validationError);
}


  const [loginLoading, setLoginLoading] = useState(false)
  const login = async () => {
    setLoginLoading(true)
    try {

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
      if (error.message == 'Firebase: Error (auth/user-not-found).') { setLoginError('User not found');  }
      if (error.message == 'Firebase: Error (auth/invalid-email).') { setLoginError('Please re-check the e-mail'); }
      if (error.message == 'Firebase: Error (auth/wrong-password).') {setLoginError('Wrong password');}
      if(error.message == 'Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).'){setLoginError('Access to this account is temporarily disabled');}
    }
    setLoginLoading(false)
  };


  return (
    <div className='joinform' style={{ height: '75vh' }}>
      <h1>Welcome Back !</h1>

      <TextField variant="outlined" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <TextField variant="outlined" type="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

      {(validationError || loginError) && <div className="validationErrors">
                 
                 <div className="validationError">
                   {validationError}
                  <p> {loginError}</p>
                 </div>
         </div>}
      <LoadingButton variant="contained"  color="success" onClick={ ()=>{ValidateData()}} loading={loginLoading} loadingPosition="end" endIcon={<RiLoginBoxFill />} >Login</LoadingButton>
      <Button variant="outlined" style={{ fontSize: '10px', color: 'black', border: 'none', marginTop: '20px' }} onClick={() => { setLoginModal(false) }} >Close</Button>


    </div>
  )
}

export default Login