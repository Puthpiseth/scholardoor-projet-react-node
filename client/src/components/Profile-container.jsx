import React, {useState, useEffect} from 'react';
import { makeStyles, Avatar } from "@material-ui/core";
import ConnectedUserProfileContainerActions from './ConnectedUserProfileContainerActions';
import AuthorDetailsProfileContainerActions from './AuthorDetailsProfileContainerActions'

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
   
}));

function ProfileContainer({isConnectedUser, userDetails}) {
    const classes = useStyles();
    const [user, setUser] = useState({});
    
    useEffect(()=>{
        if(isConnectedUser){
            const {user} = JSON.parse(localStorage.getItem('token'));
            setUser(user);
            return
        }
        setUser(userDetails);
    },[userDetails, user, isConnectedUser]);
    
    return (
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
            {isConnectedUser && <ConnectedUserProfileContainerActions />}
            {!isConnectedUser && <AuthorDetailsProfileContainerActions />}
            
        </div>
    )
}

export default ProfileContainer;
