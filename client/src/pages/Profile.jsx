import React from "react";
import ProfileContainer from "../components/Profile-container";
import Articles from "../components/Articles";
import {makeStyles} from '@material-ui/core'

const useStyle = makeStyles(theme => ({
  root : {
    display: "flex",
    flexDirection : "column",
    alignItems : 'center',
    border : '2px solid red',
    '& > *' : {
      marginBottom : '80px'
    },
    [theme.breakpoints.up('sm')] : {
      
      flexDirection : 'row',
      justifyContent : 'space-around',
      alignItems : 'flex-start',
      paddingTop : '200px',
    }
  },
  
}))

function Profile() {
  const classes = useStyle();
  
  return (
    <div className={classes.root}>
      <ProfileContainer />
      <Articles />
    </div>
  );
}

export default Profile;
