import React, {useState} from 'react';
import '../styles/pages/signin.scss';
import {useForm} from 'react-hook-form';
import { Link, Redirect } from 'react-router-dom'
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import HttpsOutlinedIcon from '@material-ui/icons/HttpsOutlined';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { loginRequest } from '../services/index';


function Signin() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [redirect, setRedirect] = useState(false);

    const onSubmit = async (e) => {
        const user = { email, password }
        try {
            const response = await loginRequest(user);
            localStorage.setItem('token', JSON.stringify(response.data));
            console.log(response.data)
            setRedirect(true);
        }
        catch(error) {
            setError(error)
            if(!user.email || user.password) {
                setError(error.message);
            }        
        }
    }
    if (redirect) {
        return <Redirect to ="/home"/>;
    }

    return (
        <>
            <div className="title">
                <h1>Welcome to ScholarDoor</h1>
            </div>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-title">
                    <h2><Link to={'/signup'}>Sign up</Link></h2>
                    <h2><Link to={'/signin'}>Sign in</Link></h2>
                </div>        
                    {error && (
                        <span style={{color: 'red', marginTop: '5px'}}>
                            <ErrorOutlineIcon style={{display: 'flex', 
                                position: 'absolute', left: '8%', fontSize: '15px'}}
                            />
                            <p style={{position: 'relative', left: '16%',}}>
                                Invalid email or password.
                            </p>
                        </span>
                    )}
                <div className="form-inputs">
                    <MailOutlineIcon className="icons"/>
                    <input
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="Enter your email"
                    {...register('email', {
                        required: "Email is required", 
                    })}
                    onChange={e => setEmail(e.target.value)}
                    />
                    {errors.email && 
                        <span style={{color: 'red', marginTop: '5px'}}>
                            {errors.email.message}
                            <ErrorOutlineIcon style={{position: 'absolute', 
                                top: '10%', right: '3%', fontSize: '20px'}}
                            />
                        </span>}
                </div>

                <div className="form-inputs">
                    <HttpsOutlinedIcon className="icons"/> 
                    <input
                    type="password"
                    name="password"
                    className="form-input"
                    placeholder="Enter your password"
                    {...register('password', {
                        required: "Password is required", 
                    })}
                    onChange={e => setPassword(e.target.value)}
                    />
                    {errors.password && 
                        <span style={{color: 'red', marginTop: '5px'}}>
                            {errors.password.message}
                            <ErrorOutlineIcon style={{position: 'absolute', top: '10%', right: '3%', fontSize: '20px'}}/>
                        </span>}
                </div>
                <div className="forgot-password">
                    <p><Link to={'/forgot-password'}> forgot password?</Link></p>
                </div>
                <div className="remember-me">
                    <input type="checkbox"/>
                    <p>Remember me</p>
                </div>
            
                <button type="submit" className="signin-btn">Signin</button>     
            </form>
        </>
    )
}

export default Signin;

