
/* eslint-disable no-unused-vars */
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import app from '../../firebase/firebase.config';
import { Link } from 'react-router-dom';

const auth = getAuth(app);

const Login = () => {
    const [error,setError] = useState('');
    const [success ,setSuccess] = useState('');
    const emailRef = useRef();


    const handleLogin = event => {

         event.preventDefault();
         const from = event.target;
         const email = from.email.value;
         const password = from.password.value;
         console.log(email ,password)



        //  Validation
        setError('');
        setSuccess('');
         if(!/(?=.*[A-Z].*[A-Z])/.test(password)){
        setError('Please add at least two uppercase.')
        return;
         }
      
         else if(!/(?=.*[!@#$&*])/.test(password)){
            setError('Please add at least a special character')
            return;
         }
         else if(password.length <6){
            setError('password is too short and it must be 6 characters long')
         }

         signInWithEmailAndPassword(auth,email,password)
         .then(result =>{
            const loggedUser = result.user;
            
            console.log(loggedUser);
            if(!loggedUser.emailVerified){

            }


            setSuccess('user log in successful')
            setError('')


         } )
         .catch(error => {
            setError(error.message);
         })
    }

 const handleResetPassword = event => {
    const email = emailRef.current.value ;
    if(!email){
        alert('please provide your email address to reset passwprd ')
        return;
    }
    sendPasswordResetEmail(auth,email)
    .then( () => {
        alert('Please check your email')
    })
    .catch(error => {
        console.log(error);
        setError(error.message)
    })
 }

    return (
        <div  className=' w-25 mx-auto '>

            <h1>Please login</h1>
   

      <form onSubmit={handleLogin}>
        <div className="form-group mb-3">
          <label htmlFor="emailInput">Email address</label>
          <input type="email"  name="email" ref={emailRef} className="form-control" id="emailInput" aria-describedby="emailHelp" placeholder="Enter email" required/>
         
        </div>

        <div className="form-group mb-3">
          <label htmlFor="passwordInput">Password</label>
          <input type="password" name="password" className="form-control" id="passwordInput" placeholder="Password"  required/>
        </div>

        <div className="form-group form-check mb-3">
          <input type="checkbox" className="form-check-input" id="rememberMeCheck" />
          <label className="form-check-label" htmlFor="rememberMeCheck">Remember me</label>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      <p><small>Forget password ? Please <button onClick={handleResetPassword} className='btn btn-link'>Reset Password</button></small></p>
            <p><small>New to this website ? please log in<Link to="/register">Register</Link> </small></p>
            <p className='text-danger'>{error}</p>
            <p className='text-success'>{success}</p>

        </div>
    );
};

export default Login;