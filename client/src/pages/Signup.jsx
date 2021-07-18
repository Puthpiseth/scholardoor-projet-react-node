import React from 'react';
import '../styles/pages/signup.scss';
import { Link } from 'react-router-dom'
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import HttpsOutlinedIcon from '@material-ui/icons/HttpsOutlined';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

function signup() {
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
                    <PermIdentityIcon className="icons"/>
                    <input
                    type="text"
                    name="firstname"
                    className="form-input"
                    placeholder="Enter your firstname"
                    />
                </div>
                <div className="form-inputs">
                    <PermIdentityIcon className="icons"/>
                    <input
                    type="text"
                    name="lastname"
                    className="form-input"
                    placeholder="Enter your lastname"
                    />
                </div>
                <div className="form-inputs">
                    <PermIdentityIcon className="icons"/>
                    <input
                    type="text"
                    name="username"
                    className="form-input"
                    placeholder="Enter your username"
                    />
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
                <div className="term-of-condition">
                    <input type="checkbox"/>
                    <p>I agree to the term of service and acknowledge the Privacy Policy</p>
                </div>
                <button type="submit" className="signup-btn">Signup</button>     
            </form>
        </div>
    )
}

export default signup
