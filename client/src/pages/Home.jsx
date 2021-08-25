import {useState, useEffect} from 'react';
import Navbar from '../components/Navbar';
import MoreVert from '@material-ui/icons/MoreVert';
import {getAllUsersArticles} from '../services/article';
import {FileViewer} from "../components/FileViewer";
import {Loading} from '../components/Loading';
import {saveAs} from 'file-saver';
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


const useStyles = makeStyles((theme) => ({

    homeContainer :{
        margin: "120px auto",
        background: "#fdfcfc",
        width : "90%",
        [theme.breakpoints.up('sm')] : {
            width : "70%",
        },
        [theme.breakpoints.up('md')] : {
            width : "65%",
        },
        [theme.breakpoints.up('lg')] : {
            width : "55%",
        }

    },
    cardHeader :{
        display: "flex",
        alignItems: "center",
        width: "94%",
        margin: "0 auto",
        borderBottom: "1px solid #999999",
        [theme.breakpoints.up('lg')] : {
            width : "96%",
        }
    },
    profileAvatarIcon: {
        width: "50px",
        height: "50px",
        marginRight: "4px",
        cursor: "pointer",
    },
    headerTitle: {
        cursor: "pointer",
        fontSize: "16px",
        '&:hover': {
            textDecoration: "underline",
            textUnderlineOffset: "0.2em",
            textDecorationThickness: "0.1em",
        }
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
        }
    },
    publicationDate: {
        margin: "0 auto",
        width: "92%",
        fontSize: "14px",
        fontWeight: "bold",
        [theme.breakpoints.up('sm')] : {
            width : "94%"
        },
        [theme.breakpoints.up('md')] : {
            width : "95%",
        },
        [theme.breakpoints.up('lg')] : {
            width : "96.5%",
        }
    },
    firstnameAndLastname: {
        cursor: "pointer",
        '&:hover': {
            textDecoration: "underline",
            textUnderlineOffset: "0.2em",
            textDecorationThickness: "0.1em",
        }
    },
    authors : {
        fontWeight: "bold",
        fontSize: "14px",
    },
    abstract: {
        fontWeight: "bold",
        [theme.breakpoints.up('lg')] : {
            fontSize: "14px",
        }
    },
    view: {
        fontWeight: "bold",
    },  
}));

function Home({history}){
    const [articles, setArticles] = useState([]);
    const [anchorEl, setAnchorEl ] = useState(null);
    const [openMenu, setOpenMenu] = useState(false);
    const [openViewer, setOpenViewer]  = useState(false);
    const [fileBase64, setFileBase64] = useState('');
    const [fileName, setFileName] = useState('')
    const [datasLoading, setDatasLoading] = useState(true);
    const classes = useStyles();


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
        setFileName(`${articles[index].title}-${articles[index].authors}.pdf`)
    }
    //close menu option on blur
    const handleCloseMenu = () => {
        setOpenMenu(false);
        setAnchorEl(null);
    }
    //open file modal viewer
    const handleOpenViewer = () => {
        setOpenViewer(true);
    };

    //close file modal viewer
    const handleCloseViewer = () => {
        setOpenMenu(false);
        setOpenViewer(false)
    };

    // Download authors's pdf file
    const handleDownloadFile = () => saveAs(`data:application/pdf;base64,${fileBase64}`, fileName)
    
    const handleRedirectToDeatails = (e) => {
        const userId = e.currentTarget.getAttribute('data-user-id');
        history.push(`/details/${userId}`);
    }

    return(
        <>
            <Navbar/>
            {datasLoading && <Loading />}
            {articles.map((article, i) => {

                return (
                    <Grid 
                        container 
                        classes = {{container : classes.homeContainer}}
                        spacing = {3}
                    >
                        <Grid item xs = {12}>
                            <Card key = {i}>
                                <div 
                                    className={classes.cardHeader} 
                                    data-user-id = {article.articleAuthor?.id} 
                                    onClick = {handleRedirectToDeatails}
                                >
                                    <Avatar 
                                        className={classes.profileAvatarIcon}
                                        src = {`data:image/png;base64,${article.articleAuthor?.avatar}`} 
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
                                    classes={{title: classes.headerTitle}}
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
                                <h3 className={classes.publicationDate}>{article.publicationDate}</h3>
                                    <CardContent className={classes.articleContent}>
                                        <h3 className={classes.authors}>{article.authors}</h3>
                                        <h3 className={classes.abstract}>{article.abstract}</h3>
                                        <h4 className={classes.view}>{`${article.viewId ?? 0}  views`}</h4>
                                    </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
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
                    onClick = {handleDownloadFile}
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
        </>
    )
}

export default Home;