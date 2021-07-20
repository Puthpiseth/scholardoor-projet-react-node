import React from 'react';
import '../styles/pages/reset-password.scss';
import HttpsOutlinedIcon from '@material-ui/icons/HttpsOutlined';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { Link } from 'react-router-dom'

function ResetPassword() {
    return (
        <div className="reset-password-container">
            <div className="reset-password-wrapper">
                    <div className="reset-password-title">
                        <h2>Reset Password</h2>
                    </div>
                    <div className="reset-password-instruction">
                        <p>Please enter your new password</p>
                    </div>
            </div>
            <div className="reset-password-inputs">
                <HttpsOutlinedIcon className="password-icons"/> 
                <div className="visibility-icons">
                    <VisibilityIcon className="show-icons"/>
                    <VisibilityOffIcon className="hide-icons"/>
                </div>
                <input
                type="password"
                name="password"
                className="password-input"
                placeholder="Enter your new password"
                />
        
                <div className="reset-confirm-password-inputs">
                    <HttpsOutlinedIcon className="password-icons"/> 
                    <div className="visibility-icons">
                        <VisibilityIcon className="show-icons"/>
                        <VisibilityOffIcon className="hide-icons"/>
                    </div>
                    <input
                    type="password"
                    name="confirm-password"
                    className="password-input"
                    placeholder="Confirm your password"
                    />
                </div>
            </div>

            <div className="reset-password-submit">
                <button type="submit" className="reset-password-btn">submit</button>
                <p className="back-to-signin"><Link to='/signin'>Back to sign in</Link></p>
            </div>
        </div>
        
    )
}

export default ResetPassword;
