import React from 'react';
import '../styles/pages/signin.scss';
import { Link } from 'react-router-dom'
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import HttpsOutlinedIcon from '@material-ui/icons/HttpsOutlined';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

function signin() {
    return (
        <div>
            <div className="title">
                <h1>Welcome to ScholarDoor</h1>
            </div>
            <form className="form">
                <div className="form-title">
                    <h2><Link to={'/signup'}> Sign up</Link></h2>
                    <h2><Link to={'/signin'}> Sign in</Link></h2>
                </div>        
                            
                <div className="form-inputs">
                    <MailOutlineIcon className="icons"/>
                    <input
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="Enter your email"
                    />
                </div>
                <div className="form-inputs">
                    <HttpsOutlinedIcon className="icons"/> 
                    <div className="visibility-icons">
                        <VisibilityIcon className="show-icons"/>
                        <VisibilityOffIcon className="hide-icons"/>
                    </div>
                    <input
                    type="password"
                    name="password"
                    className="form-input"
                    placeholder="Enter your password"
                    />
                </div>
                <div className="forgot-password">
                    <p><Link to={'/forgot-password'}> forgot password?</Link></p>
                </div>
                <div className="remember-me">
                    <input type="checkbox"/>
                    <p>Remember me</p>
                </div>
            
                <button type="submit" className="signin-btn" >Signin</button>     
            </form>
        </div>
    )
}

export default signin;

