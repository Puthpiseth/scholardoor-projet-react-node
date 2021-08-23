import React, {useState, useEffect} from 'react';
import { makeStyles, Avatar, Button } from "@material-ui/core";
import {useHistory} from 'react-router-dom'


const useStyles = makeStyles((theme) => ({

    mainContainer: {
        display : 'flex',
        flexDirection : 'column',
        alignItems : 'center',
        width: "85%",
        padding : '15px 0',
        borderRadius : '6px',
        border : '0.5px solid lightgrey',
        boxShadow :'0 0 1px black',
        [theme.breakpoints.up("sm")]: {
            width : '77%',
            padding : '30px 0',
        },
        [theme.breakpoints.up("md")]: {
                width : '35%',
        },
        [theme.breakpoints.up("lg")]: {
            width : "30%",
            marginLeft: "12%",
        },        
    },
    profileAvatarIcon: {
        color: "#C4C4C4",
        width: "120px",
        height: "120px",       
    },
    profileInfo: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "4px",
        width : '100%',
         // [theme.breakpoints.up("md")]: {
        //     width : '90%'
        // }, 
    },
    profileWrapper: {
        padding: "2% 0% 10% 2%",
    },

    usernameText: {
        fontWeight: "bold", 
        fontSize: "28px",
    },

    profileText: {
        fontSize: "1.4rem",
        [theme.breakpoints.up("sm")] : {
            fontSize: "1.6rem",
        }
    },

    follow: {
        display: "flex",
        width : '100%',
        justifyContent : 'space-around'
    },
    fellas: {
        fontSize : '1.4rem',
        flex :1,
        [theme.breakpoints.up("sm")] : {
            fontSize: "1.6rem",
        }, 
    },
    profileButtonsContainer : {
        display : 'flex',
        width : '80%',
        justifyContent : 'space-around',
        [theme.breakpoints.up("sm")] : {
            width : '45%'
        },
        [theme.breakpoints.up("md")] : {
            width : '75%',
        },
        [theme.breakpoints.up("lg")] : {
            width : '68%',
        },
    },
    profileUploadButton: {
        background: "#0F6A7D",
        color: "#fff",
        fontSize: "14px",
        borderRadius: "4px",
        boxShadow: "0 0 2px #999999", 
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
                <Avatar className={classes.profileAvatarIcon} src = {`data:image/png;base64,${user.avatar}`} alt = "avatar"/>
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
                        className={classes.uploadArticleButton}
                        style={{background: '#0F6A7D', color: '#fff', 
                            borderRadius: "5px",boxShadow: "0 0 2px #999999",
                            '&:hover': {opacity: "0.8"}
                        }}
                    >
                        Upload new article
                    </Button>
                    <Button 
                        onClick = {() => history.push('/edit-profile')}
                        size = 'medium'
                        className={classes.eidtProfileUploadButton}
                        style={{background: '#E5E5E5', color: '#474747', 
                        borderRadius: "5px",boxShadow: "0 0 2px #999999",
                    }}
                    >
                        Edit profile
                    </Button>
                </div>
            </div>
        // {/* </main> */}
    )
}

export default ProfileContainer;
