import React from 'react';
import '../styles/components/navbar.scss';
import {Link} from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';


function Navbar() {
    return (
        <div className="navbar-container">
            <div className="leftNav">
                <div className="logo">
                    <h1>ScholarDoor</h1>
                </div>
                <div className="search">
                    <SearchIcon className="searchIcon"/>
                    <input className="input" placeholder="Search"/>
                </div>
                </div>
            <div className="rightNav">
                <div className="homeIcon">
                    <Link to='/'><HomeIcon className="rightNav-icons"/></Link>
                    <p className="home">Home</p>
                </div>
                    
                <div className="mailIcon">
                    <Link to='/message'><MailIcon className="rightNav-icons"/></Link>
                    <p className="message">Message</p>
                    
                </div>
                    
                <div className="notificationIcon">
                    <NotificationsIcon className="rightNav-icons"/>
                    <p className="notification">Notifications</p>
                </div>
                <div className="accountCircleIcon">
                    <Link to='/profile'><AccountCircle className="rightNav-icons"/></Link> 
                    <p className="profile">Profile</p>
                </div>
            </div>      
        </div>
    )
}

export default Navbar;