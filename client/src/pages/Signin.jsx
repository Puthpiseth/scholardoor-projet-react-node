import React, {useState} from 'react';
import '../styles/pages/signin.scss';
import { Link, Redirect } from 'react-router-dom'
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import HttpsOutlinedIcon from '@material-ui/icons/HttpsOutlined';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { Login } from '../services/user';


function Signin(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const handleClick = async (e) => {
        e.preventDefault();
        
        const user = {
            email: email,
            password: password
        }
        
        try {
            const response = await Login(user);
            localStorage.setItem('token', response.data.token);
            setRedirect(true);
        }

        catch(error) {
                console.log(error)
        }
    }
    if (redirect) {
        return <Redirect to ="/forgot-password"/>;
    }

    return (
        <>
            <div className="title">
                <h1>Welcome to ScholarDoor</h1>
            </div>
            <form className="form" >
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
                    onChange={e => setEmail(e.target.value)}
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
                    onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div className="forgot-password">
                    <p><Link to={'/forgot-password'}> forgot password?</Link></p>
                </div>
                <div className="remember-me">
                    <input type="checkbox"/>
                    <p>Remember me</p>
                </div>
            
                <button type="submit" className="signin-btn" onClick={e => handleClick(e)}>Signin</button>     
            </form>
        </>
    )
}

export default Signin;

