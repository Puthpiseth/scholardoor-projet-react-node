import React, {useState, useEffect} from 'react';
import { makeStyles, Avatar, Button } from "@material-ui/core";
import {useHistory} from 'react-router-dom'


const useStyles = makeStyles((theme) => ({

    mainContainer: {
        display : 'flex',
        flexDirection : 'column',
        width: "85%",
        padding : '25px 25px',
        borderRadius : '6px',
        border : '0.5px solid lightgrey',
        boxShadow :'0 0 1px black',
        [theme.breakpoints.up("sm")]: {
            width : '77%',
        },
        [theme.breakpoints.up("md")]: {
            justifyContent : 'flex-start',
            width : '35%',            
        },
        [theme.breakpoints.up("lg")]: {
            width : "25%",
            marginLeft: "12%",
        },        
    },
    profileAvatarIcon: {
        color: "#C4C4C4",
        width: "120px",
        height: "120px",
        [theme.breakpoints.up('sm')] : {
            width: "100px",
            height: "100px",
        },    
        
    },
    profileInfo: {
        borderRadius: "4px",
        width : '85%',
    },
    profileWrapper: {
        padding: "2% 0% 10% 2%",
    },

    usernameText: {
        fontWeight: "bold", 
        fontSize: "28px",
        [theme.breakpoints.up('sm')] : {
            fontSize: "24px",
        }, 
    },

    profileText: {
        fontSize: "1.4rem",
        [theme.breakpoints.up("sm")] : {
            fontSize: "1.6rem",
        }
    },

    follow: {
        display: "flex",
        width : '70%',
        [theme.breakpoints.up("sm")] : {
            width : '55%',
        }, 
        [theme.breakpoints.up("md")] : {
            width : '80%',
        }, 
    },
    fellas: {
        fontSize : '1.4rem',
        flex :1,
        [theme.breakpoints.up("sm")] : {
            fontSize: "1.6rem",
        }, 
    },
    profileButtonsContainer : {
        width : '85%',
        [theme.breakpoints.up("sm")] : {
            width : '82%'
        },
        [theme.breakpoints.up("md")] : {
            width : '90%',
        },
        [theme.breakpoints.up("lg")] : {
            width : '95%',
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
                                '&:hover': {opacity: "0.8"}, marginRight: "6px"
                        }}
                    >
                        Upload new article
                    </Button>
                    <Button 
                        onClick = {() => history.push('/edit-profile')}
                        size = 'medium'
                        className={classes.eidtProfileUploadButton}
                        style={{background: '#E5E5E5', color: '#474747', marginRight: "6px", 
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
