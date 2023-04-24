/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile} from 'firebase/auth'
import app from '../firebase/firebase.config';
import Login from '../Comoinents/Login/Login';
import { Link } from 'react-router-dom';


const auth = getAuth(app)

const Register = () => {
    const [email,setEmail] = useState('');
    const [error,setError] = useState('');
    const [success,setSuccess] = useState('');


            const handleSubmit = (event) =>{
                // 1.prevent page refresh
                event.preventDefault();
                setSuccess('');
                setError('');
                // 2.collect from data
                const email = event.target.email.value;
                const password = event.target.password.value;
                const name = event.target.name.value;
                    console.log(name ,email ,password);
                    // validate
                    if(!/(?=.*[A-Z])/.test(password)){
                        setError('Please add least one uppercase');
                        return;
                    }
                    else if(!/(?=.*[0-9].*[0-9])/.test(password)){
                        setError('please add at least two numeric')
                        return;
                    }
                    else if(password.length<6){
                        setError('Please at least 6 charecter')
                        return;
                    }

                // create user in fb
                createUserWithEmailAndPassword(auth ,email,password)
                .then( result => {
                    const loggedUser = result.user;
                    console.log(loggedUser);
                    setError('')
                    event.target.reset();
                    setSuccess('user has successfully created');
                    sendVerificationEmail(result.user)
                    updateUserData(result.user, name)
                })
                .catch(error => {
                    console.error(error.message);
                    setError(error.message)
    
    
                })
            }

            const sendVerificationEmail = (user) => {
              sendEmailVerification(user)
              .then(result => {
                console.log(result);
                alert('please verify your email')
              })
            }

            const updateUserData = ( user,name) =>{
                updateProfile(user, {
                    displayName :name
                })
                .then(() => {
                    console.log('user name updated ');
                })
                .catch(error =>{
                    console.log(error);
                    setError(error.message)
                })

            }

        const handleEmailChange = (event) => {
            console.log(event.target.value);
            setEmail(event.target.value);
        }

        const handlePasswordBlur = (event) =>{
            console.log(event.target.value);
        }

    return (
        <div className='w-50 mx-auto'>
            <h4> Please Register</h4>
            <form onSubmit={handleSubmit}>
                <input className='w-50 mb-4 rounded ps-2 ' type="text" name="name" id="name" placeholder="Your name address"  required/>
                <br></br>
                <input className='w-50 mb-4 rounded ps-2 ' onChange={handleEmailChange} type="email" name="email" id="email" placeholder="Your email address"  required/>
                <br></br>
                <input className='w-50 mb-4 rounded ps-2 '  onBlur={handlePasswordBlur} type="password" name="password" id="password" placeholder="Your password" required />
                <br />
                <input className='btn btn-primary rounded'  type="submit" value="Register" />
            </form>

            <p><small>Already have an account ? please <Link to="/login">Log In</Link></small></p>
            
            <p className='text-danger'>{error}</p>
            
            <p className='text-success'>{success}</p>
        </div>
    );
};

export default Register;

