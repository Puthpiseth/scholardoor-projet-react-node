import React, { useState } from 'react';
import {useForm} from 'react-hook-form';
import '../styles/pages/signup.scss';
import { Link, Redirect } from 'react-router-dom'
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import HttpsOutlinedIcon from '@material-ui/icons/HttpsOutlined';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { Register } from '../services/user';


function Signup() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [redirect, setRedirect] = useState(false);



    const onSubmit = async (e) => {
        
        const user = {
            firstname: firstname,
            lastname: lastname,
            username: username,
            email: email,
            password: password
        }
        
        try {
            const response = await Register(user);
            setRedirect(true);
            console.log(response)
        }
        catch(error) {
            console.log(error)
            // if (!user.email) {
            //     setError(error.data.message)
            // }
        }        
    }

    if (redirect) {
        return <Redirect to ="/signin"/>;
    }

    return (
        <>
            <div className="title">
                <h1>Welcome to ScholarDoor</h1>
            </div>
            <form className="form-signup-container" onSubmit={handleSubmit(onSubmit)} >
                <div className="form-title">
                    <h2><Link to={'/signup'}> Sign up</Link></h2>
                    <h2><Link to={'/signin'}> Sign in</Link></h2>
                </div>        
                            
                <div className="form-inputs">
                    <PermIdentityIcon className="icons"/>
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
                        <span style={{color: 'red', marginTop: '5px'}}>
                            {errors.firstname.message}
                            <ErrorOutlineIcon style={{position: 'absolute', top: '15%', right: '3%', fontSize: '20px'}}/>
                        </span>}
                </div>
                <div className="form-inputs">
                    <PermIdentityIcon className="icons"/>
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
                        <span style={{color: 'red', marginTop: '5px'}}>
                            {errors.lastname.message}
                            <ErrorOutlineIcon style={{position: 'absolute', top: '15%', right: '3%', fontSize: '20px'}}/>
                        </span>}
                </div>
                <div className="form-inputs">
                    <PermIdentityIcon className="icons"/>
                    <input
                    type="text"
                    name="username"
                    className="form-input"
                    placeholder="Enter your username"
                    {...register('username', {
                        required: "Username is required", 
                        minLength: {value: 5, 
                        message: "Username must be greater than 5 charactors"
                    }})}
                    onChange={e => setUsername(e.target.value)}
                    />
                    {errors.username && 
                        <span style={{color: 'red', marginTop: '5px'}}>
                            {errors.username.message}
                            <ErrorOutlineIcon style={{position: 'absolute', top: '15%', right: '3%', fontSize: '20px'}}/>
                        </span>}
                </div>
                <div className="form-inputs">
                    <MailOutlineIcon className="icons"/>
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
                    {error.email && (
                        <span style={{color: 'red', marginTop: '5px'}}>
                            {error.email}
                        </span>
                    )}
                    {errors.email && 
                        <span style={{color: 'red', marginTop: '5px'}}>
                            {errors.email.message}
                            <ErrorOutlineIcon style={{position: 'absolute', top: '15%', right: '3%', fontSize: '20px'}}/>
                        </span>}
                </div>
                <div className="form-inputs">
                    <HttpsOutlinedIcon className="icons"/> 
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
                        <span style={{color: 'red', marginTop: '5px'}}>
                            {errors.password.message}
                            <ErrorOutlineIcon style={{position: 'absolute', top: '15%', right: '3%', fontSize: '20px'}}/>
                        </span>}
                </div>
                <div className="term-of-condition">
                    <input 
                    type="checkbox"
                    name="termsAccepted"                    
                    />
                    <p>I agree to the term of service and acknowledge the <Link to="/private-policy">Privacy Policy</Link></p>
                </div>
                <button 
                    type="submit" 
                    className="signup-btn" 
                    >
                        Signup
                    
                </button>     
            </form>
        </>
    )
}


export default Signup;
