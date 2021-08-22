import React from "react";
import ProfileContainer from "../components/Profile-container";
import ShowArticles from "../components/ShowArticles";
import Navbar from '../components/Navbar';
import {makeStyles} from '@material-ui/core'

const useStyle = makeStyles(theme => ({
  root : {
    display: "flex",
    flexDirection : "column",
    paddingTop : '100px',
    alignItems : 'center',
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
      <Navbar/>
      <ProfileContainer />
      <ShowArticles />
    </div>
  );
}

export default Profile;
