import React, {useState, useEffect} from 'react';
import { makeStyles, Avatar, Button } from "@material-ui/core";
import {useHistory} from 'react-router-dom'


const useStyles = makeStyles((theme) => ({

    mainContainer: {
        display : 'flex',
        flexDirection : 'column',
        alignItems : 'center',
        width: "90%",
        padding : '15px 0',
        borderRadius : '6px',
        border : '0.5px solid lightgrey',
        boxShadow :'0 0 2px black',
        [theme.breakpoints.up("sm")]: {
            width : '40%'
        },
        [theme.breakpoints.up("lg")]: {
            width : '20%',
            padding : '35px 0',
        },
        // [theme.breakpoints.up("md")]: {
            //     width : '60%'
            // },
            // [theme.breakpoints.up("xs")]: {
            //     width : '90%'
            // },
        
    },
    profileAvatarIcon: {
        color: "#C4C4C4",
        width: "120px",
        height: "120px",
        [theme.breakpoints.down("lg")]: {
            width: "110px",
            height: "110px",
        },
        [theme.breakpoints.down("md")]: {
        },
        [theme.breakpoints.down("sm")]: {
            width: "100px",
            height: "100px",
        },
       
    },

    profileInfo: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "4px",
        // border: "1px solid #E5E5E5",
        width : '100%'      
    },
    
    profileWrapper: {
        padding: "2% 0% 10% 2%",
    },

    usernameText: {
        fontWeight: "bold", 
        fontSize: "20px",
        [theme.breakpoints.down("xs")]: {
            fontSize: "30px",
        },  
    },

    profileText: {
        fontSize: "16px",
        [theme.breakpoints.down("xs")]: {
            fontSize: "18px",
        },  
    },

    follow: {
        display: "flex",
        width : '100%',
        justifyContent : 'space-around'
    },
    fellas: {
        fontSize : '1.4rem',
        flex :1 
    },
    profileButtonsContainer : {
        display : 'flex',
        width : '58%',
        justifyContent : 'space-around',
        [theme.breakpoints.up("lg")] : {
            width : '70%'
        }
    },
    profileUploadButton: {
        background: "#0F6A7D",
        color: "#fff",
        fontSize: "14px",
        borderRadius: "5px",
        boxShadow: "0 0 2px #999999",
        [theme.breakpoints.down("xs")]: {
            fontSize: "16px",
        }, 
    },
    
    profileEditButton: {
        color: "#474747",
        fontSize: "14px",
        borderRadius: "5px",
        boxShadow: "0 0 2px #999999",
        [theme.breakpoints.down("xs")]: {
            fontSize: "16px",
        },  
    },

}));

function ProfileContainer() {
    const classes = useStyles();
    const [user, setUser] = useState({});
    const history = useHistory();
    
    useEffect(()=>{
        const {user} = JSON.parse(localStorage.getItem('token'));
        setUser(user);
    },[]);
    
    return (
        // <main>
            <div className={classes.mainContainer}>
                <Avatar className={classes.profileAvatarIcon} src = {user.avatar} alt = "avatar"/>
                <div className={classes.profileInfo}>
                    <div className={classes.profileWrapper}>
                        <div>
                            <p className={classes.usernameText} name="username">{`${user.firstname} ${user.lastname}`}</p>
                            <p className={classes.profileText} name="position">{user.position}</p>
                            <p className={classes.profileText} name="affiliation">{user.affiliation}</p>
                            <p className={classes.profileText} name="researchInterest">{user.researchInterest}</p>
                            <p className={classes.profileText} name="location">{user.location}</p>
                        </div>
                        <div className={classes.follow}>
                            <p className={classes.fellas} name="followers">0 Follower</p>
                            <p className={classes.fellas} name="following">0 Following</p>
                        </div>
                    </div>
                </div>
                <div className={classes.profileButtonsContainer}>
                    <Button 
                        onClick = {() => history.push('/upload-article')}
                        size = 'medium'
                        className={classes.profileUploadButton}
                    >
                        Upload work
                    </Button>
                    <Button 
                        onClick = {() => history.push('/create-profile')}
                        size = 'medium'
                        variant = 'outlined'
                        className={classes.profileEditButton}
                    >  
                        Edit profile
                    </Button>
                </div>
            </div>
        // {/* </main> */}
    )
}

export default ProfileContainer;
