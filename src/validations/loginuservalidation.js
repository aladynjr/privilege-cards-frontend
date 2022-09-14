import * as yup from 'yup';


export const userSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required*'),
    password : yup.string().required('Password is required*').min(6, 'Password should be more than 6 characters'),

});





