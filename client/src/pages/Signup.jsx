import React, { useState } from 'react';
import {useForm} from 'react-hook-form';
import '../styles/pages/signup.scss';
import { Link, Redirect } from 'react-router-dom'
import { registerRequest } from '../services/index';
import logo from '../../src/theme/images/logo_gray.png';

function Signup() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [error, setError] = useState('');
    const [redirect, setRedirect] = useState(false);

    const onSubmit = async (data) => {
        // console.log(data);
                
        const user = {
            firstname,
            lastname,
            email,
            password,
            termsAccepted
        }
        
        try {
            const response = await registerRequest(user);
            setRedirect(true);
            console.log(response.data)
        }
        catch(error) {
            setError(error)
            // Check if the username or the email is already taken
            if(user.email) {
                setError(error.message)
            }        
        }        
    }

    if (redirect) {
        return <Redirect to ="/signin"/>;
    }

    return (
        <>
            <div className="signup-title">
                <img src={logo} width="160px" height="150px" alt="scholardoor logo"/>
                <h1>Welcome to ScholarDoor</h1>
            </div>
            <form className="form-signup-container" onSubmit={handleSubmit(onSubmit)} >
                <div className="form-signup-title">
                    <h2><Link to={'/signup'}> Sign up</Link></h2>
                    <h2><Link to={'/'}> Sign in</Link></h2>
                </div>        
                            
                <div className="form-inputs">
                    <input
                    type="text"
                    name="firstname"
                    className="form-input"
                    placeholder="Enter your firstname"
                    {...register('firstname', {
                        required: "Firstname is required"
                    })}
                    onChange={e => setFirstname(e.target.value)}
                    />
                    {errors.firstname && 
                        <span style={{display: 'flex', alignItems: 'center', 
                            backgroundColor: '#EB4132', fontSize: '14px', 
                            width: '100.5%', height: '3vh', paddingLeft: '5px', 
                            marginTop:'4px', color: 'white' }}>
                                {errors.firstname.message}
                        </span>}
                </div>
                
                <div className="form-inputs">
                    <input
                    type="text"
                    name="lastname"
                    className="form-input"
                    placeholder="Enter your lastname"
                    {...register('lastname', {
                        required: "Lastname is required"
                    })}
                    onChange={e => setLastname(e.target.value)}
                    />
                    {errors.lastname && 
                        <span style={{display: 'flex', alignItems: 'center', 
                            backgroundColor: '#EB4132', fontSize: '14px', 
                            width: '100.5%', height: '3vh', paddingLeft: '5px', 
                            marginTop:'4px', color: 'white' }}>
                                {errors.lastname.message}
                        </span>}
                </div>

                <div className="form-inputs">
                    <input
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="Enter your email"
                    {...register('email', {
                        required: "Email is required", 
                        pattern: {value: /^([a-z A-Z 0-9](\.)?)+@\w+\.(\w){2,4}$/, 
                        message: "Email is invalid"
                    }})}
                    onChange={e => setEmail(e.target.value)}
                    />
                    {error && (
                        <span style={{display: 'flex', alignItems: 'center', 
                            backgroundColor: '#EB4132', fontSize: '14px', 
                            width: '100.5%', height: '3vh', paddingLeft: '5px', 
                            marginTop:'4px', color: 'white' }}>
                                Email is already taken!
                        </span>
                    )}
                    {errors.email && 
                        <span style={{display: 'flex', alignItems: 'center', 
                            backgroundColor: '#EB4132', fontSize: '14px', 
                            width: '100.5%', height: '3vh', paddingLeft: '5px', 
                            marginTop:'4px', color: 'white' }}>
                                {errors.email.message}
                        </span>}
                </div>

                <div className="form-inputs">
                    <input
                    type="password"
                    name="password"
                    className="form-input"
                    placeholder="Enter your password"
                    {...register('password', {required: "Password is required", 
                        pattern: {value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 
                        message: "Password must be greater than 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character"
                    }})}
                    onChange={e => setPassword(e.target.value)}
                    />
                    {errors.password && 
                        <span style={{display: 'flex', alignItems: 'center', 
                            backgroundColor: '#EB4132', fontSize: '14px', 
                            width: '100.5%', height: '3vh', paddingLeft: '5px', 
                            marginTop:'4px', color: 'white' }}>
                                {errors.password.message}
                        </span>}
                </div>
                <button type="submit" className="signup-btn">Signup</button>     
            </form>
        </>
    )
}


export default Signup;
