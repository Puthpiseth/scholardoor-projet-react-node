import React from 'react'
import '../styles/pages/forgot-password.scss';
import { Link } from 'react-router-dom';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

function ForgotPassword() {
    return (
        <div>
            <form className="forgot-password-form">
                <div className="forgot-password-wrapper">
                    <div className="forgot-password-title">
                        <h2>Forgot Password</h2>
                    </div>
                    <div className="forgot-password-instruction">
                        <h4 className="line-1">Enter your email address and we will send you</h4>
                        <h4 className="line-2">instructions to reset your password</h4>
                    </div>
                </div>
                <div className="form-inputs">
                    <MailOutlineIcon className="mail-icons"/>
                    <input
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="Enter your email"
                    />
                </div>
                <div className="forgot-password-sumbit">
                    <button type="submit" className="forgot-password-btn">submit</button>
                    <p className="back-to-link"><Link to='/signin'>Back to sign in</Link></p>
                </div>
            </form> 
        </div>
    )
}

export default ForgotPassword;
