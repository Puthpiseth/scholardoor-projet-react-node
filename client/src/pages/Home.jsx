// import {useState, useEffect} from 'react';
import Navbar from '../components/Navbar';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100vh",
    }
}));

function Home(){
    const classes = useStyles();
    return(
        <>
            <Navbar/>
            <div className={classes.root}>
                
            </div>
            
            
            
        </>
    )
}

export default Home;