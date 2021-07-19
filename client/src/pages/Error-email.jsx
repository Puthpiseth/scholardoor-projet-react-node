import React from 'react'
import '../styles/pages/error-email.scss';
import { Link } from 'react-router-dom';

function ErrorEmail() {
    return (        
        <div className="error-email-container">
            < div className="error-email-wrapper">
                <div className="error-opps">
                    <h1>Opps!</h1>
                </div>
                <div className="error-validation">
                    <h2>Validation error</h2>
                </div>
            
                <div className="content-wrapper">
                    <p>The email address is invalid or not found.</p>
                </div>
                <div className="back-to-forgot-password">
                    <p><Link to='/forgot-password'>Back to forgot password</Link></p>
                </div>
            </div>
        </div> 
    )
}

export default ErrorEmail;
