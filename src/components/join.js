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


function Join() {
    const navigate = useNavigate();

const [logging, setLogging] = useState(false)
const [signupError, setSignupError] = useState('')
const [newName, setNewName] = useState('')
const [newEmail, setNewEmail] = useState('')

const [newPassword, setNewPassword] = useState('')
const [repeatPassword, setRepeatPassword] = useState('')


const AddBussiness = async (app_user_name,app_user_email, app_user_uid) => {

  try {
    const body = {
      app_user_name,
      app_user_email,
      app_user_uid
    };
    const response = await fetch("http://localhost:4000/api/app_user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    // window.location = "/";
  } catch (err) {
    console.error(err.message);
  }
};


    const register = async () => {
        try {
          setLogging(true);
          const newUser = await createUserWithEmailAndPassword(
            auth,
            newEmail,
            newPassword
          );
          console.log(newUser.user.uid);


          AddBussiness(newName, newEmail, newUser.user.uid)
          navigate('/Home')
        } catch (error) {
          if (error.message == 'Firebase: Error (auth/invalid-email).') { setSignupError('الرجاء إعادة تفقّد الإيميل'); }
          if (error.message == 'Firebase: Error (auth/email-already-in-use).') { setSignupError('الإيميل مستخدم في حساب آخر'); }
          if (error.message == 'Firebase: Password should be at least 6 characters (auth/weak-password).') { setSignupError('كلمة السرّ يجب أن تكون أطول من 6 أحرف'); }
          
          setLogging(false);
          console.log(error.message);
    
          
        }
      };

  return (
    <div>
        <TextField  variant="outlined" label="Name" value={newName} onChange={(e) => setNewName(e.target.value)} />

        <TextField  variant="outlined" label="Email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
        <TextField  variant="outlined"  type="password" label="Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />

        <Button variant="contained" color="success" onClick={register} >Create Account</Button>


    </div>
  )
}

export default Join