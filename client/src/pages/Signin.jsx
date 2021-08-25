import React, {useState} from 'react';
import '../styles/pages/signin.scss';
import {useForm} from 'react-hook-form';
import { Link, Redirect } from 'react-router-dom'
import { loginRequest } from '../services/index';
import logo from '../../src/theme/images/logo_gray.png';


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
            <div className="signin-title">
                <img src={logo} width="160px" height="150px" alt="scholardoor logo"/>
                <h1>Welcome to ScholarDoor</h1>
            </div>
            <form className="form-signin" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-signin-title">
                    <h2><Link to={'/signup'}>Sign up</Link></h2>
                    <h2><Link to={'/'}>Sign in</Link></h2>
                </div>        
                    {error && (
                        <span style={{color: 'white'}}>
                            <p style={{display: 'flex', alignItems: 'center', position: 'relative', 
                                left: '12.5%', backgroundColor: '#EB4132', 
                                fontSize: '14px', width: '75%', height: '3vh', paddingLeft: "5px" }}>
                                    Invalid email or password.
                            </p>
                        </span>
                    )}
                <div className="form-inputs">
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
                    {...register('password', {
                        required: "Password is required", 
                    })}
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
                <button type="submit" className="signin-btn">Signin</button>     
                <p className="linkToSignup">Don't have an account ? <Link className="link" to={'/signup'}>Sign up</Link></p>
            </form>
        </>
    )
}

export default Signin;

