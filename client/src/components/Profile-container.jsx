import React from 'react'
import '../styles/components/profile-container.scss';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';

function ProfileContainer() {
    
    return (
        <>
        <main>
        <div className="profile-container">
            <div className="profile-background-top"></div>
            <div className="profile-wrapper">
                <div className="profile-avatar" name="avatar">
                    <AccountCircle className="profile-avatar-icon"/>
                </div>
                <div className="profile-info">
                    <p className="username" name="username">Puthpiseth TUN</p>
                    <p className="position" name="position">Director of Academic Affairs</p>
                    <p className="affiliation" name="affiliation">Royal University of Fine Arts</p>
                    <p className="researchInterest" name="researchInterest">History of Art, Buddhism</p>
                    <p className="location" name="location">Phnom Penh, Cambodia</p>
                </div>
                <div className="followers-following">
                    <div className="number-of-followers">
                        <p name="followers">0</p>
                        <p className="follower">Followers</p>
                    </div>
                    <div className="number-of-following" >
                        <p name="following">0</p>
                        <p className="follower">Following</p>
                    </div>
                </div>
                <div className="profile-buttons">
                    <Button 
                        variant="contained" 
                        style={{backgroundColor: "#0F6A7D", color: "#fff", marginRight: "2px"}}>
                        upload work
                    </Button>
                    <Button 
                        variant="contained" 
                        style={{backgroundColor: "#2794f2", color: "#fff", marginRight: "2px"}}> 
                        contact
                    </Button>
                    <Button 
                        variant="contained" 
                        style={{backgroundColor: "#0F6A7D", color: "#fff", marginRight: "2px"}}>
                        edit profile
                    </Button>
                </div>
            </div>
        </div>
        </main>
        </>
    )
}

export default ProfileContainer;
