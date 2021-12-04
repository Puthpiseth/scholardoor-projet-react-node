import { makeStyles, Avatar, Button } from "@material-ui/core";
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({

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
    profileButtonsContainer : {
        width : '90%',
        [theme.breakpoints.up("sm")] : {
            width : '82%'
        },
        [theme.breakpoints.up("md")] : {
            width : '85%',
        },
        [theme.breakpoints.up("lg")] : {
            width : '90%',
        },
    },
}));

function AuthorsProfileContainerActions() {
    const classes = useStyles();
    const history = useHistory();
    
    return (
        <div className={classes.profileButtonsContainer}>
            <Button 
                size = 'medium'
                className={classes.followBtn}
                style={{background: '#0F6A7D', color: '#fff', 
                    borderRadius: "5px",boxShadow: "0 0 2px #999999",
                    '&:hover': {opacity: "0.8"}, marginRight: "4px"
                }}
            >
                Follow
            </Button>
            <Button 
                onClick = {() => history.push('/message')}
                size = 'medium'
                className={classes.messageBtn}
                style={{background: '#2794f2', color: '#fff', marginRight: "4px",
                        borderRadius: "5px",boxShadow: "0 0 2px #999999",
                }}
            >
                Message
            </Button>
            <Button 
                size = 'medium'
                className={classes.contactBtn}
                style={{background: '#E5E5E5', color: '#474747', 
                        borderRadius: "5px",boxShadow: "0 0 2px #999999",
            }}
            >
                Contact
            </Button>
        </div>
            
    )
}

export default AuthorsProfileContainerActions;
