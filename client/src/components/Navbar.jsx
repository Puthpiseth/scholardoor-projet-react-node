// import {Link} from 'react-router-dom'
import React, { useState } from 'react';
import { AppBar, Toolbar, makeStyles } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import HomeIcon from '@material-ui/icons/Home';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import Popover from '@material-ui/core/Popover';
import { Link } from 'react-router-dom';
import logo from '../../src/theme/images/Logo.png';

const useStyles = makeStyles((theme) => ({
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "#0F6A7D",
        height: "8vh",
    },
    logoIcon: {
        width: "65px", 
        height: "40px",
    },
    search: {
        display: "flex",
        alignItems: "center",
        backgroundColor: "#F6f4f4",
        borderRadius: theme.shape.borderRadius,
        width: "40%",
        height: "4vh",
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
        width: "25px",
        height: "25px"
        
    },
    input: {
        marginLeft: theme.spacing(1),
        fontSize: "14px",
        width: "80%",
        
    },
    rightIcon: {
        display: "flex",
        alignItems: "center",
    },
    rightSideIcon: {
        width: "35px", 
        height: "35px",
        color: "white",
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

    const [anchorEl, setAnchorMenuEl] = useState(false);
    const [burgerMenuIconAnchorEl, setBurgerMenuIconAnchorEl] = useState(false);

    const isMenuOpen = Boolean(anchorEl);
    const isBurgerMenuOpen = Boolean(burgerMenuIconAnchorEl);

    const handleProfileMenuOpen = (e) => {
        setAnchorMenuEl(e.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorMenuEl(null);
    };

    const handleBurgerMenuOpen = (e) => {
        setBurgerMenuIconAnchorEl(e.currentTarget);
    }

    const handleBurgerMenuClose = (e) => {
        setBurgerMenuIconAnchorEl(null);
    }

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Popover
            anchorEl={anchorEl}
            id={menuId}
            keepMounted
            open={isMenuOpen}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            style={{ marginTop: "45px" }}
        >
            <Link to='/profile' style={{textDecoration: "none", color: "black" }}>
                <MenuItem 
                    style={{fontSize: "14px", margin: "5px"}} 
                    onClick={handleMenuClose}>Your profile
                </MenuItem>
            </Link>
            <Link to='/libraries' style={{textDecoration: "none", color: "black" }}>
                <MenuItem 
                    style={{fontSize: "14px", margin: "5px"}} 
                    onClick={handleMenuClose}>Your libraries
                </MenuItem>
            </Link>
            <Link to='/privacy' style={{textDecoration: "none", color: "black" }}>
                <MenuItem 
                    style={{fontSize: "14px", margin: "5px"}} 
                    onClick={handleMenuClose}>Privacy
                </MenuItem>
            </Link>
            <Link to='/terms-and-policies' style={{textDecoration: "none", color: "black" }}>
                <MenuItem 
                    style={{fontSize: "14px", margin: "5px"}} 
                    onClick={handleMenuClose}>Terms and policies
                </MenuItem>
            </Link>
            <Link to='/signout' style={{textDecoration: "none", color: "black" }}>
                <MenuItem 
                    style={{fontSize: "14px", margin: "5px"}} 
                    onClick={handleMenuClose}>Sign out
                </MenuItem>
            </Link>
        </Popover>
    );
    
    const burgerMenuId = 'primary-search-account-burger-menu';
    const renderBurgerMenu = (
        <Popover
            anchorEl={anchorEl}
            id={burgerMenuId}
            keepMounted
            open={isBurgerMenuOpen }
            onClose={handleBurgerMenuClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            style={{marginTop: "15px"}}            
        >
            <Link to='/profile' style={{textDecoration: "none", color: "black" }}>
                <MenuItem 
                    style={{fontSize: "14px"}} 
                    onClick={handleBurgerMenuClose}>Your profile
                </MenuItem>
            </Link>
            <Link to='/' style={{textDecoration: "none", color: "black" }}>
                <MenuItem 
                    style={{fontSize: "14px"}} 
                    onClick={handleBurgerMenuClose}>Homepage
                </MenuItem>
            </Link>
            <Link to='/upload-work' style={{textDecoration: "none", color: "black" }}>
                <MenuItem 
                    style={{fontSize: "14px"}} 
                    onClick={handleBurgerMenuClose}>Upload work
                </MenuItem>
            </Link>
            <Link to='/libraries' style={{textDecoration: "none", color: "black" }}>
                <MenuItem 
                    style={{fontSize: "14px"}} 
                    onClick={handleBurgerMenuClose}>Your libraries
                </MenuItem>
            </Link>
            <Link to='/signout' style={{textDecoration: "none", color: "black" }}>
                <MenuItem 
                    style={{fontSize: "14px"}} 
                    onClick={handleBurgerMenuClose}>Sign out
                </MenuItem>
            </Link>
        </Popover>
    );


    const iconHover = {cursor: "pointer", marginLeft: "12%"};

    return (
        <>
            <AppBar>
                <Toolbar className={classes.toolbar}>
                <Link to='/' style={{textDecoration: "none", color: "black" }}>
                    <img 
                        src= { logo } 
                        className={classes.logoIcon} 
                        alt="logo-icon" 
                        style={iconHover} 
                    />
                </Link>
                    <div className={classes.search}>
                        <SearchIcon className={classes.searchIcon}/>
                        <InputBase 
                            placeholder="Search"
                            className={classes.input}
                        />
                    </div>
                    <div className={classes.rightIcon}>
                        <Tooltip title={<h1 style={{fontSize: 10}}>Home</h1>} arrow >
                            <Link to='/'>
                                <HomeIcon
                                    aria-label="show Homeicon's description" 
                                    className={classes.rightSideIcon} 
                                    style={iconHover} 
                                />
                            </Link>
                        </Tooltip>
                        <Tooltip title={<h1 style={{fontSize: 10}}>Upload work</h1>} arrow >
                            <Link to='/upload-work'>
                                <CloudUploadIcon
                                    aria-label="show UploadworkIcon's description"  
                                    className={classes.rightSideIcon} 
                                    style={iconHover}
                                />
                            </Link>
                        </Tooltip>
                        <Tooltip title={<h1 style={{fontSize: 10}}>Your profile</h1>} arrow >
                            <Link to='/profile'><AccountCircle
                                    aria-label="show avatarIcon's description"  
                                    className={classes.rightSideIcon} 
                                    style={iconHover}
                                />
                            </Link>
                        </Tooltip>
                        <Tooltip title={<h1 style={{fontSize: 10}}>Your Account</h1>} arrow >
                            <ArrowDropDownIcon
                                edge="end"
                                aria-label="show arrowDropDownIcon's description"
                                aria-controls={menuId}
                                aria-haspopup="true"  
                                className={classes.rightSideIcon}
                                style={iconHover}
                                onClick={handleProfileMenuOpen} 
                                color="inherit"
                            />            
                        </Tooltip>
                    </div>
                    <MenuIcon
                    edge="end" 
                        aria-controls={burgerMenuId}
                        aria-haspopup="true"  
                        className={classes.menuIcon}
                        onClick={handleBurgerMenuOpen}
                        color="inherit"
                    />
                </Toolbar>
            </AppBar>
            {renderMenu}
            {renderBurgerMenu}
        </>
    )
}

export default Navbar;