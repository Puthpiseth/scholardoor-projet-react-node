// import {Link} from 'react-router-dom'
// import React, {  } from 'react';
import { AppBar, Toolbar, makeStyles } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import HomeIcon from '@material-ui/icons/Home';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import Tooltip from '@material-ui/core/Tooltip';
// import { Link } from 'react-router-dom';
import logo from '../../src/theme/images/Logo.png';

const useStyles = makeStyles((theme) => ({
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "#0F6A7D",
    },
    logoIcon: {
        width: "60px", 
        height: "35px",
    },
    search: {
        display: "flex",
        alignItems: "center",
        backgroundColor: "#F6f4f4",
        borderRadius: theme.shape.borderRadius,
        width: "25%",
        height: "35px",
        [theme.breakpoints.down("sm")]: {
            width: "40%",
        },
        [theme.breakpoints.down("xs")]: {
            width: "55%",
            marginLeft: theme.spacing(4),
        }
    },
    searchIcon: {
        color: "black",
        marginLeft: theme.spacing(1),
        width: "20px",
        height: "20px"
        
    },
    input: {
        marginLeft: theme.spacing(1),
        fontSize: "12px",
        width: "80%",
        
    },
    rightIcon: {
        display: "flex",
        alignItems: "center",
    },
    rightSideIcon: {
        width: "28px", 
        height: "28px",
        marginRight: theme.spacing(5),
        [theme.breakpoints.down("xs")]: {
            display: "none",
        },
        
    },
    menuIcon: {
        width: "30px", 
        height: "30px",
        
        [theme.breakpoints.down("lg")]: {
            display: "none",
        },
        [theme.breakpoints.down("xs")]: {
            display: "block",
        },
    }
    
}));


function Navbar() {
    const classes = useStyles();
    // const [open, setOpen] = useState(false);

    // const handleClose = () => {
    //     setOpen(false);
    // };

    // const handleOpen = () => {
    //     setOpen(true);
    // };

    // const renderMobileMenu = () => {
    //     // <MenuItem></MenuItem>
    // }

    const iconHover = {
        cursor: "pointer", 
        tooltip: {
            fontSize: 11,
        }};

    return (
        <AppBar>
            <Toolbar className={classes.toolbar}>
                <img src= { logo } className={classes.logoIcon} alt="logo-icon" />
                <div className={classes.search}>
                    <SearchIcon className={classes.searchIcon}/>
                    <InputBase 
                        placeholder="Search"
                        className={classes.input}
                    />
                </div>
                <div className={classes.rightIcon}>
                    <Tooltip title={<h1 style={{fontSize: 8}}>Home</h1>} arrow >
                        <HomeIcon
                            aria-label="show Homeicon's description" 
                            className={classes.rightSideIcon} 
                            style={iconHover} 
                        />
                    </Tooltip>
                    <Tooltip title={<h1 style={{fontSize: 8}}>Upload work</h1>} arrow >
                        <CloudUploadIcon
                            aria-label="show UploadworkIcon's description"  
                            className={classes.rightSideIcon} 
                            style={iconHover}
                        />
                        
                    </Tooltip>
                    <Tooltip title={<h1 style={{fontSize: 8}}>Your profile</h1>} arrow >
                        <AccountCircle
                            aria-label="show avatarIcon's description"  
                            className={classes.rightSideIcon} 
                            style={iconHover}
                        />
                    </Tooltip>
                </div>
                <MenuIcon className={classes.menuIcon}/>
            </Toolbar>
            
        </AppBar>
        // <div className="navbar-container">
        //     <div className="leftNav">
        //         <div className="logo">
        //             <h1>ScholarDoor</h1>
        //         </div>
        //         <div className="search">
        //             <SearchIcon className="searchIcon"/>
        //             <input className="input" placeholder="Search"/>
        //         </div>
        //         </div>
        //     <div className="rightNav">
        //         <div className="homeIcon">
        //             <Link to='/'><HomeIcon className="rightNav-icons"/></Link>
        //             <p className="home">Home</p>
        //         </div>
                    
        //         <div className="mailIcon">
        //             <Link to='/message'><MailIcon className="rightNav-icons"/></Link>
        //             <p className="message">Message</p>
                    
        //         </div>
                    
        //         <div className="notificationIcon">
        //             <NotificationsIcon className="rightNav-icons"/>
        //             <p className="notification">Notifications</p>
        //         </div>
        //         <div className="accountCircleIcon">
        //             <Link to='/profile'><AccountCircle className="rightNav-icons"/></Link> 
        //             <p className="profile">Profile</p>
        //         </div>
        //     </div>      
        // </div>
    )
}

export default Navbar;