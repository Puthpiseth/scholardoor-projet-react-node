import React from 'react';
import '../Styles/pages/Signup.css';

function signup() {
    return (
        <form className="form">
            <div className="form-title">
                <h2 className="signup">Sign up</h2>
                <h2 className="signin">Sign in</h2>
            </div>
            <div className="form-inputs">
                <input
                type="text"
                name="username"
                className="form-input"
                placeholder="Enter your username"
                />
            </div>
            <div className="form-inputs">
                <input
                type="email"
                name="email"
                className="form-input"
                placeholder="Enter your email"
                />
            </div>
            <div className="form-inputs">
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
            <button type="submit" >Signup</button>     
        </form>
    )
}

export default signup
