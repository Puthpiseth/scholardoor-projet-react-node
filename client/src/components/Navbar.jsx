// import {Link} from 'react-router-dom'
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { 
    AppBar,
    Toolbar,
    makeStyles,
    Avatar,
    BottomNavigation,
    BottomNavigationAction
 } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import HomeIcon from '@material-ui/icons/Home';
import DescriptionIcon from '@material-ui/icons/Description';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
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
        [theme.breakpoints.down("md")]: {
            width: "35%",
        },
        [theme.breakpoints.down("sm")]: {
            width: "60%",
        },
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
    //each icon with label block
    bottomNavigationWrapper : {
        height : '100%',
        display : 'flex',
        alignItems :'center'
    },
    //each labeled icon
    rightIcons: {
        display: "flex",
        alignItems: "center",
        background : 'inherit',
        justifyContent : 'space-evently',
        width : '38%',
        height : '100%',
        [theme.breakpoints.down("lg")]: {
            width : '40%',
        },
        [theme.breakpoints.down("md")]: {
            width : '45%',
        },
        [theme.breakpoints.down("sm")]: {
            display: "none",
        },
        [theme.breakpoints.down("xs")]: {
            display: "none",
        },
        
    },
    //label under navigation icon
    BottomNavigationLabel : {
        fontSize : '1.2rem',
        color : 'white'
    },
    //all labeled icon wrapper
    rightSideIcon: {
        width: "35px", 
        height: "35px",
        color: "white",
        margin: '4px',
    },
    // burger menu
    menuIcon: {
        width: "30px", 
        height: "30px",
        [theme.breakpoints.down("lg")]: {
            display: "none",
        },
        [theme.breakpoints.down("md")]: {
            display: "none",
        },
        [theme.breakpoints.down("sm")]: {
            display: "block",
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
    const {avatar} = JSON.parse(localStorage.getItem('token')).user
    const {user} = JSON.parse(localStorage.getItem('token'));
    const isMenuOpen = Boolean(anchorEl);
    const isBurgerMenuOpen = Boolean(burgerMenuIconAnchorEl);
    const history = useHistory();

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
    const handleLogOout = () => localStorage.removeItem('token');

    const renderDropDownMenu = (
        <Popover
            anchorEl={anchorEl}
            id = 'primary-search-account-menu'
            keepMounted
            open={isMenuOpen}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            style={{ marginTop: "55px", padding: "5px" }}
        >
        
            <Link to='/profile' style={{textDecoration: "none", color: "black"}}>
                <MenuItem
                    style={{fontSize: "14px", margin: "5px", fontWeight: "bold"}} 
                    onClick={handleMenuClose}
                >
                    {`${user.firstname} ${user.lastname}`}
                </MenuItem>
            </Link>
            <Link to='/edit-profile' style={{textDecoration: "none", color: "black" }}>
                <MenuItem 
                    style={{fontSize: "14px", margin: "5px"}} 
                    onClick={handleMenuClose}>Edit profile
                </MenuItem>
            </Link>
            <Link to='/privacy' style={{textDecoration: "none", color: "black" }}>
                <MenuItem 
                    style={{fontSize: "14px", margin: "5px"}} 
                    onClick={handleMenuClose}>Your library
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
            <Link to='/' style={{textDecoration: "none", color: "black" }}>
                <MenuItem 
                    style={{fontSize: "14px", margin: "5px"}} 
                    onClick={handleLogOout}>Sign out
                </MenuItem>
            </Link>
        </Popover>
    );
    
    const renderBurgerMenu = (
        <Popover
            anchorEl={anchorEl}
            id={'primary-search-account-burger-menu'}
            keepMounted
            open={isBurgerMenuOpen }
            onClose={handleBurgerMenuClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            // style={{marginTop: "0px"}}            
        >
            <Link to='/profile' style={{textDecoration: "none", color: "black" }}>
                <MenuItem 
                    style={{fontSize: "14px", fontWeight: "bold"}} 
                    onClick={handleBurgerMenuClose}
                >
                    {`${user.firstname} ${user.lastname}`}
                </MenuItem>
            </Link>
            <Link to='/edit-profile' style={{textDecoration: "none", color: "black" }}>
                <MenuItem 
                    style={{fontSize: "14px"}} 
                    onClick={handleBurgerMenuClose}>Edit your profile
                </MenuItem>
            </Link>
            <Link to='/home' style={{textDecoration: "none", color: "black" }}>
                <MenuItem 
                    style={{fontSize: "14px"}} 
                    onClick={handleBurgerMenuClose}>Home
                </MenuItem>
            </Link>
            <Link to='/upload-article' style={{textDecoration: "none", color: "black" }}>
                <MenuItem 
                    style={{fontSize: "14px"}} 
                    onClick={handleBurgerMenuClose}>Upload new article
                </MenuItem>
            </Link>
            <Link to='/upload-article' style={{textDecoration: "none", color: "black" }}>
                <MenuItem 
                    style={{fontSize: "14px"}} 
                    onClick={handleBurgerMenuClose}>Your library
                </MenuItem>
            </Link>
            <Link to='/sigin' style={{textDecoration: "none", color: "black" }}>
                <MenuItem 
                    style={{fontSize: "14px"}} 
                    onClick={handleLogOout }>Sign out
                </MenuItem>
            </Link>
        </Popover>
    );


    const iconHover = {cursor: "pointer"};

    return (
        <>
            <AppBar>
                <Toolbar className={classes.toolbar}>
                    <Link to='/home' style={{textDecoration: "none", color: "black" }}>
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
                        <BottomNavigation classes={{root : classes.rightIcons}} showLabels>
                            <BottomNavigationAction 
                                onClick={()=> history.push('/home')}
                                classes = {{label : classes.BottomNavigationLabel, root : classes.bottomNavigationWrapper}}
                                label = 'Home'
                                icon = {
                                    <HomeIcon
                                        aria-label="redirect to home page" 
                                        className={classes.rightSideIcon} 
                                        style={iconHover} 
                                    />
                                }
                            />
                            
                            <BottomNavigationAction 
                                classes = {{label : classes.BottomNavigationLabel, root : classes.bottomNavigationWrapper}}
                                label = 'Upload new article'
                                onClick = {() => history.push('/upload-article')}
                                icon = {
                                    <CloudUploadIcon
                                        aria-label="show UploadworkIcon's description"  
                                        className={classes.rightSideIcon} 
                                        style={iconHover}
                                    />
                                }
                            />
                                
                            <BottomNavigationAction 
                                classes = {{label : classes.BottomNavigationLabel, root : classes.bottomNavigationWrapper}}
                                label = 'Profile'
                                onClick = {() => history.push('/profile')}
                                icon = {
                                    <Avatar
                                        //all avatars uploaded converted to png file
                                        src = {`data:image/png;base64,${avatar}`}
                                        aria-label="show avatarIcon's description"  
                                        className={classes.rightSideIcon} 
                                        style={iconHover}
                                    />
                                } 
                            />
                                
                            <ArrowDropDownIcon
                                edge="end"
                                aria-label="drop down menu"
                                aria-controls = 'primary-search-account-menu'
                                aria-haspopup="true"  
                                className={classes.rightSideIcon}
                                style={iconHover}
                                onClick={handleProfileMenuOpen} 
                                color="inherit"
                            />            
                            
                        </BottomNavigation>
                        <MenuIcon
                            edge="end" 
                            aria-controls= 'primary-search-account-menu'
                            aria-haspopup="true"  
                            className={classes.menuIcon}
                            onClick={handleBurgerMenuOpen}
                            color="inherit"
                        />
                </Toolbar>
            </AppBar>
            {renderDropDownMenu}
            {renderBurgerMenu}
        </>
    )
}

export default Navbar;