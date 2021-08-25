import {makeStyles, Button} from '@material-ui/core';
import {useHistory} from 'react-router-dom'


const useStyle = makeStyles(theme => ({
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
}))


function ConnectedUserProfileContainerActions(){
    const history = useHistory();
    const classes = useStyle();
    return(
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
    )
}

export default ConnectedUserProfileContainerActions;