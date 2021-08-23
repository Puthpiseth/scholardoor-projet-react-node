import React, {useState, useEffect} from 'react';
import MoreVert from '@material-ui/icons/MoreVert'
import '../styles/components/article.scss';
import {getArticles, deleteArticle} from '../services/article';
import {FileViewer} from "./FileViewer";
import { Loading } from './Loading';
import {useHistory} from 'react-router-dom';
import { saveAs } from 'file-saver';

import {
    Card,
    CardHeader,
    CardContent,
    IconButton,
    Menu,
    MenuItem,
    makeStyles,
    Grid
} from '@material-ui/core'


const useStyle = makeStyles(theme => ({
    container :{
        width : "90%",
        [theme.breakpoints.up('sm')] : {
            width : '50%'
        }
    },
    articleCard: {
        background: "#fdfcfc",
        border: "1px solid #C4C4C4",
    },
    optionIcons : {
        width : '22px',
        height : '22px',
    },
    menuItemsOption: {
        fontSize: "13px",
    },
    headerTitle: {
        fontSize: "18px",
        fontWeight: "bold",
        color: "#474747",
        cursor: "pointer",
        "&:hover": {
            color: "#2794f2"
        }
    },
    authors: {
        fontSize: "16px",
        fontWeight: "400",
    },
    abstract: {
        fontSize: "14px",
        fontWeight: "400",
    },
    view: {
        fontSize: "13px",
        fontWeight: "400",
    }
}));

function Articles() {
    const [articles, setArticles] = useState([]);
    const [anchorEl, setAnchorEl ] = useState(null);
    const [openMenu, setOpenMenu] = useState(false);
    const [openViewer, setOpenViewer]  = useState(false);
    const [fileBase64, setFileBase64] = useState('');
    const [datasLoading, setDatasLoading] = useState(true);
    const [fileName, setFileName] = useState('')
    const classes = useStyle();
    const history = useHistory();

    useEffect(()=>{
        const loadArticles = async() => {
            const articles = await getArticles();
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
        setFileBase64(articles[index].filePath);
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
    }
    //close file modal viewer
    const handleCloseViewer = () => {
        setOpenMenu(false);
        setOpenViewer(false)
    }

    const removeArticles = async(e)=> {
        const index = anchorEl.getAttribute('data-index')
        const {id}= articles[index]
        await deleteArticle(id);
        const filterArray = articles.filter(article => article.id !== id);
        setArticles(filterArray);
    
    }

    const handleDownloadFile = () =>{
        saveAs(`data:application/pdf;base64,${fileBase64}`, fileName)
    }
    return (
        <Grid 
            container 
            classes = {{container : classes.container}}
            spacing = {3}
        >
        
            {datasLoading && <Loading />}
            {articles.map((article, i) => {
                return(
                    <Grid 
                        item  
                        xs = {12}
                    >
                        <Card
                            className={classes.articleCard} 
                            key = {i}>
                            <CardHeader
                                classes={{title: classes.headerTitle}}
                                title = {article.title}
                                
                                action = {
                                    <IconButton
                                        onClick = {handleOpenMenu}
                                        data-index = {i}
                                    >
                                        <MoreVert className = {classes.optionIcons}/>
                                    </IconButton>
                                }
                            />
                                <CardContent className={classes.articleContent}>
                                    <h3 className={classes.authors}>{article.authors}</h3>
                                    <h3 className={classes.abstract}>{article.abstract}</h3>
                                    <h4 className={classes.view}>{`${article.viewId ?? 0} views`}</h4>
                                </CardContent>
                        </Card>
                        <Menu
                            open = {openMenu}
                            onClose = {handleCloseMenu}
                            anchorEl = {anchorEl}
                        >
                            <MenuItem
                                className={classes.menuItemsOption}
                                onClick = {handleOpenViewer}
                            >
                                View
                            </MenuItem>
                            <MenuItem
                                className={classes.menuItemsOption} 
                                onClick ={()=> history.push('/upload-article')}
                            >
                                Edit
                            </MenuItem>
                            <MenuItem
                                className={classes.menuItemsOption}
                                onClick = {handleDownloadFile}
                            >
                                Download
                            </MenuItem>
                            <MenuItem
                                className={classes.menuItemsOption}
                                onClick={removeArticles}
                                data-index = {i}
                            >
                                Delete
                            </MenuItem>
                        </Menu>
                        <FileViewer 
                            open = {openViewer}
                            onClose = {handleCloseViewer}
                            fileSrc = {fileBase64}
                        />
                                
                    </Grid>
                )
            })}
        </Grid>            
    )
}

export default Articles;