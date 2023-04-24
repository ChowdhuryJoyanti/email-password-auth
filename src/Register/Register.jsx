/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth'
import app from '../firebase/firebase.config';


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
                    console.log(email ,password);
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
                    setSuccess('user has successfully created')
                })
                .catch(error => {
                    console.error(error.message);
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
                <input className='w-50 mb-4 rounded ps-2 ' onChange={handleEmailChange} type="email" name="email" id="email" placeholder="Your email address"  required/>
                <br></br>
                <input className='w-50 mb-4 rounded ps-2 '  onBlur={handlePasswordBlur} type="password" name="password" id="password" placeholder="Your password" required />
                <br />
                <input className='btn btn-primary rounded'  type="submit" value="Register" />
            </form>
            
            <p className='text-danger'>{error}</p>
            
            <p className='text-success'>{success}</p>
        </div>
    );
};

export default Register;

