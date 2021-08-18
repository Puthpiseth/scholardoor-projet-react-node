import React from 'react';
import { makeStyles } from "@material-ui/core";
import AccountCircle from '@material-ui/icons/AccountCircle';


const useStyles = makeStyles((theme) => ({

    mainContainer: {
        marginTop: "15%",
        
        [theme.breakpoints.down("md")]: {
            marginTop: "22%",
        },
        [theme.breakpoints.down("sm")]: {
            marginTop: "30%",
        },
        [theme.breakpoints.down("xs")]: {
            marginRight: "6%",
        },
        
    },
    profileAvatarIcon: {
        color: "#C4C4C4",
        width: "120px",
        height: "120px",
        marginLeft: "5%",
        [theme.breakpoints.down("lg")]: {
            marginLeft: "6%",
            width: "110px",
            height: "110px",
        },
        [theme.breakpoints.down("md")]: {
            marginLeft: "11%",
        },
        [theme.breakpoints.down("sm")]: {
            width: "100px",
            height: "100px",
        },
        [theme.breakpoints.down("xs")]: {
            marginLeft: "36%",
        },  
    },

    profileInfo: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "4px",
        border: "1px solid #E5E5E5",
        [theme.breakpoints.down("lg")]: {
            width: "20%",
        },  
        [theme.breakpoints.down("md")]: {
            width: "35%",
        },
        [theme.breakpoints.down("xs")]: {
            width: "110%",            
        },       
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
        fontSize: "14px",
        [theme.breakpoints.down("xs")]: {
            fontSize: "18px",
        },  
    },

    follow: {
        display: "flex",
    },

    followers: {
        display: "flex",
        marginRight: "15%",
    },

    followersText: {
        marginRight: "15%",
        fontSize: "14px",
        [theme.breakpoints.down("xs")]: {
            fontSize: "18px",
        },  
    },

    following: {
        display: "flex",
    },

    followingText: {
        marginLeft: "10%",
        fontSize: "14px",
        [theme.breakpoints.down("xs")]: {
            fontSize: "18px",
        },  
    },
    
    profileUploadButton: {
        background: "#0F6A7D",
        color: "#fff",
        fontSize: "14px",
        border: "none",
        borderRadius: "5px",
        boxShadow: "0 0 2px #999999",
        height: "4vh",
        marginRight: theme.spacing(1),
        cursor: "pointer",
            "&:hover": {
                opacity: 0.9,
            },
        [theme.breakpoints.down("xs")]: {
            height: "5vh",
            fontSize: "18px",
            marginRight: theme.spacing(2),
        }, 
    },

    profileEditButton: {
        background: "",
        color: "#474747",
        fontSize: "14px",
        border: "none",
        borderRadius: "5px",
        boxShadow: "0 0 2px #999999",
        height: "4vh",
        cursor: "pointer",
        "&:hover": {
            color: "#fff",
            background: "#2794f2",
        },
        [theme.breakpoints.down("xs")]: {
            height: "5vh",
            fontSize: "18px",
        },  
    },

}));

function ProfileContainer() {
    const classes = useStyles();
    
    return (
        <main>
            <div className={classes.mainContainer}>
                <AccountCircle className={classes.profileAvatarIcon}/>
                <div className={classes.profileInfo}>
                    <div className={classes.profileWrapper}>
                        <div>
                            <p className={classes.usernameText} name="username">Puthpiseth TUN</p>
                            <p className={classes.profileText} name="position">Director of Academic Affairs</p>
                            <p className={classes.profileText} name="affiliation">Royal University of Fine Arts</p>
                            <p className={classes.profileText} name="researchInterest">History of Art, Buddhism</p>
                            <p className={classes.profileText} name="location">Cambodia</p>
                        </div>
                        <div className={classes.follow}>
                            <div className={classes.followers}>
                                <p className={classes.followersText} name="followers">0</p>
                                <p className={classes.followersText}>Followers</p>
                            </div>
                            <div className={classes.following} >
                                <p className={classes.followingText} name="following">0</p>
                                <p className={classes.followingText}>Following</p>
                            </div>
                        </div>
                        <div className={classes.profileButtons}>
                            <button className={classes.profileUploadButton}>
                                Upload work
                            </button>
                            <button className={classes.profileEditButton}>  
                                Edit profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ProfileContainer;
