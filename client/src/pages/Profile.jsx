import React from "react";
import ProfileContainer from "../components/Profile-container";
import ShowArticles from "../components/ShowArticles";
import Navbar from '../components/Navbar';
import {makeStyles} from '@material-ui/core'

const useStyle = makeStyles(theme => ({
  root : {
    display: 'flex',
    flexDirection : 'column',
    justifyContent: 'center',
    alignItems : 'center',
    marginTop : '150px',    
    '& > *' : {
      marginBottom : '80px'
    },
    [theme.breakpoints.up('sm')] : {
      marginTop: "200px",
  }, 
    [theme.breakpoints.up('md')] : {
      flexDirection : 'row',
      justifyContent : 'space-around',
      alignItems: "flex-start",
    },
    [theme.breakpoints.up('lg')] : {
      width: "90%",
    },
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
