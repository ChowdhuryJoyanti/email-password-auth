
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';


const Login = () => {
    const [error,setError] = useState('');
    const [success ,setSuccess] = useState('');


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
    }
    return (
        <div  className=' w-25 mx-auto '>

            <h1>Please login</h1>
   

      <form onSubmit={handleLogin}>
        <div className="form-group mb-3">
          <label htmlFor="emailInput">Email address</label>
          <input type="email"  name="email" className="form-control" id="emailInput" aria-describedby="emailHelp" placeholder="Enter email" required/>
         
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

            <p className='text-danger'>{error}</p>
            <p className='text-success'>{success}</p>

        </div>
    );
};

export default Login;