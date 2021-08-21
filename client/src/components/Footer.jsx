import React from 'react'
import { makeStyles } from "@material-ui/core";
import {Link} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    copyright: {
        display: "flex",
        justifyContent: "center", 
        fontSize: "14px",  
        
    },
    privatePolicy: {
        fontSize: "14px", 
        marginLeft: theme.spacing(1),
    }
}));


function Footer() {
    const classes = useStyles();

    return (
        <div className={classes.copyrightPrivatePolicy}>
            <p className={classes.copyright}>ScholarDoor© 2021 All rights reserved <Link to="/private-policy" className={classes.privatePolicy}>Private Policy</Link></p>
        </div>
    )
}

export default Footer;
