import React ,{useState} from 'react'
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

import { userSchema } from '../validations/joinuservalidation';

import {SiFastapi} from 'react-icons/si'

import {AiOutlineUserAdd} from 'react-icons/ai'

import { Divider } from '@mui/material';

function Join({setJoinModal}) {
    const navigate = useNavigate();

const [logging, setLogging] = useState(false)
const [signupError, setSignupError] = useState('')
const [newName, setNewName] = useState('')
const [newEmail, setNewEmail] = useState('')

const [newPassword, setNewPassword] = useState('')
const [repeatPassword, setRepeatPassword] = useState('')

const [validationError, setValidationError] = useState('')

function ValidateData(){
  setValidationError('');
  let data = {
    name : newName,
    email : newEmail,
    password : newPassword,
   

  }

  userSchema.validate(data).then((valid) => {
    console.log('valid', valid)
    register()
  }).catch((err) => {
    console.log('err', err.errors[0])
    setValidationError(err.errors[0])
   
  })
  return (!validationError);
}

const AddNewUser = async (app_user_name,app_user_email, app_user_uid) => {

  try {
    const body = {
      app_user_name,
      app_user_email,
      app_user_uid
    };
    const response = await fetch("https://privilege-cards-backend.fly.dev/api/app_user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    // window.location = "/";
  } catch (err) {
    console.error(err.message);
  }
  window.location.reload(false);

};

const [joinLoading, setJoinLoading] = useState(false);

    const register = async () => {
      setJoinLoading(true);
        try {
          setLogging(true);
          const newUser = await createUserWithEmailAndPassword(
            auth,
            newEmail,
            newPassword
          );
          console.log(newUser.user.uid);


          AddNewUser(newName, newEmail, newUser.user.uid)
          
        } catch (error) {
          if (error.message == 'Firebase: Error (auth/invalid-email).') { setSignupError('الرجاء إعادة تفقّد الإيميل'); }
          if (error.message == 'Firebase: Error (auth/email-already-in-use).') { setSignupError('الإيميل مستخدم في حساب آخر'); }
          if (error.message == 'Firebase: Password should be at least 6 characters (auth/weak-password).') { setSignupError('كلمة السرّ يجب أن تكون أطول من 6 أحرف'); }
          
          setLogging(false);
          console.log(error.message);
    
          
        }
        setJoinLoading(false);
      };

      function MakeID(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * 
     charactersLength));
       }
       return result;
    }

  return (
    <div  className='joinform'>
      <h1>Create An Account</h1>
      <LoadingButton variant="contained" style={{background:'dodgerblue'}} onClick={()=>{setNewEmail(MakeID(10)+'@gmail.com'); setNewPassword(MakeID(8)); setNewName(MakeID(10)); }} loading={joinLoading} loadingPosition="end" endIcon={<SiFastapi />} >One Click Fake Data</LoadingButton>
        <p style={{marginTop:'-10px', fontSize:'13px', opacity:'0.8'}} >if you just want to test the website</p>

        <TextField  variant="outlined" label="Name" value={newName} onChange={(e) => setNewName(e.target.value)} />

        <TextField  variant="outlined" label="Email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
        <TextField  variant="outlined"  type="password" label="Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />

        {validationError && <div className="validationErrors">
                 
                 <div className="validationError">
                   {validationError}
                 </div>
         </div>}

        <LoadingButton variant="contained" color="success" onClick={()=>{ ValidateData()}} loading={joinLoading} loadingPosition="end" endIcon={<AiOutlineUserAdd />} >Create Account</LoadingButton>
        

        <Button variant="outlined" style={{fontSize:'10px', color:'black', border:'none', marginTop:'20px'}}  onClick={()=>{setJoinModal(false)}} >Close</Button>

    </div>
  )
}

export default Join