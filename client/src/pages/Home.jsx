import {useState, useEffect} from 'react';
import Navbar from '../components/Navbar';
import MoreVert from '@material-ui/icons/MoreVert';
import { getAllUsersArticles} from '../services/article';
import {FileViewer} from "../components/FileViewer";
import { Loading } from '../components/Loading';
import {jsPDF} from 'jspdf';
import {
    Avatar,
    Card,
    CardHeader,
    CardContent,
    IconButton,
    Menu,
    MenuItem,
    makeStyles,
    Grid
} from '@material-ui/core';
import AvatarGroup from '@material-ui/lab/AvatarGroup';


const useStyles = makeStyles((theme) => ({
    
    root: {
        
    },
    homeContainer :{
        width : "90%",
        margin: "0 auto",
        [theme.breakpoints.up('sm')] : {
            width : "70%",
            // height: "75%",
            // overflowY: "scroll",
        }
    },
    cardHeader :{
        display: "flex",
        // justifyContent: "flex-start",
        alignItems: "center",
        width: "94%",
        margin: "0 auto",
        borderBottom: "1px solid #999999"
        // border: "1px solid red",
    },
    profileAvatarIcon: {
        marginRight: "4px",
    },
    optionIcons : {
        width : '20px',
        height : '20px',
    },
    avatarWrapper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#fff",
        margin: "4px auto",
        width: "85%",
        height: "8vh",
        borderRadius: "4px",
        boxShadow: "0 1px #C4C4C4",
        overflowX: "scroll",
        [theme.breakpoints.up('sm')] : {
            width : "68%",
            // height: "30vh",
            // flexDirection: "column",

        }
    },
    friendsAvatar: {
        marginRight: "4px"
    },
    avatarAndLabel: {
        display: "flex",
    },
    friendsAvatarName: {
        display: "none",
        // [theme.breakpoints.up('sm')] : {
        //     display: "block",

        // }
    },
    contacts: {
        display: "none",
        // [theme.breakpoints.up('sm')] : {
        //     display: "block",
        //     position: "relative",
        //     bottom: "20%",
        //     left: "18%",
        //     margin: "0 %",
        // },
        
    }

}));

function Home(){
    const [articles, setArticles] = useState([]);
    const [anchorEl, setAnchorEl ] = useState(null);
    const [openMenu, setOpenMenu] = useState(false);
    const [openViewer, setOpenViewer]  = useState(false);
    const [fileBase64, setFileBase64] = useState('');
    const [datasLoading, setDatasLoading] = useState(true);
    const classes = useStyles();
    const {avatar} = JSON.parse(localStorage.getItem('token')).user


    useEffect(()=>{
        const loadArticles = async() => {
            const articles = await getAllUsersArticles();
            const sortedArticles = articles.data.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            console.log(articles)
            setArticles(sortedArticles);
            setDatasLoading(false)
        };

        loadArticles();

    }, []);
    //open car menu option on click
    const handleOpenMenu = (e) => {
        const index = e.currentTarget.getAttribute('data-index');
        setAnchorEl(e.currentTarget);
        setOpenMenu(true);
        setFileBase64(articles[index].filePath)
    }
    //close menu option on blur
    const handleCloseMenu = () => {
        setOpenMenu(false);
        setAnchorEl(null);
    }
    //open file modal viewer
    const handleOpenViewer = () => {
        setOpenViewer(true);
    }
    //close file modal viewer
    const handleCloseViewer = () => {
        setOpenMenu(false);
        setOpenViewer(false)
    }

    // Download article's pdf file
    const pdfDownload = () => {
        const doc = new jsPDF();
        doc.save("a4.pdf");
    }
    
    return(
        <>
            <Navbar/>
            {datasLoading && <Loading />}
            {articles.map((article, i) => {

                return (
                    <div className={classes.root}>
                    <Grid 
                        container 
                        classes = {{container : classes.homeContainer}}
                        spacing = {2}
                    >
                        <Grid item xs = {12}>
                            <Card key = {i}>
                                <div className={classes.cardHeader}>
                                    <Avatar 
                                        className={classes.profileAvatarIcon}
                                        src = {`data:image/png;base64,${avatar}`} 
                                        alt = "avatar"
                                    />
                                    <div>
                                        <p className={classes.firstnameAndLastname}>
                                            {`${article.articleAuthor?.firstname} ${article.articleAuthor?.lastname}`}
                                        </p>
                                        <p className={classes.articlePublicationDate}>{new Date(article.createdAt).toUTCString().split('GMT')[0]}</p>
                                    </div>
                                </div>

                                <CardHeader
                                    title={article.title}
                                    action = {
                                        <IconButton
                                            onClick = {handleOpenMenu}
                                            data-index = {i}
                                            className={classes.header}
                                        >
                                            <MoreVert className = {classes.optionIcons}/>
                                        </IconButton>
                                    }
                                />
                                        <CardContent>
                                        <h3>{article.authors}</h3>
                                        <h3>{article.abstract}</h3>
                                        <h4>{`${article.viewId ?? 0}  views`}</h4>
                                        </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                    </div>
                )
        })}
            <Menu
                open = {openMenu}
                onClose = {handleCloseMenu}
                anchorEl = {anchorEl}
            >
                <MenuItem
                    onClick = {handleOpenViewer}
                >
                    View
                </MenuItem>

                <MenuItem
                    onClick ={pdfDownload}
                >
                    Download
                </MenuItem>
                <MenuItem >Add to library</MenuItem>
            </Menu>
            <FileViewer 
                open = {openViewer}
                onClose = {handleCloseViewer}
                fileSrc = {fileBase64}
            />

            <AvatarGroup max={4}>
                <Avatar alt="Remy Sharp" src />
                <Avatar alt="Travis Howard" src />
                <Avatar alt="Cindy Baker" src />
                <Avatar alt="Agnes Walker" src />
                <Avatar alt="Trevor Henderson" src />
            </AvatarGroup>
            
        </>

        
    )

    
}

export default Home;