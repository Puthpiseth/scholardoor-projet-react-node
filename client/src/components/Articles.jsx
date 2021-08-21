import React, {useState, useEffect} from 'react';
import MoreVert from '@material-ui/icons/MoreVert'
import '../styles/components/article.scss';
import { getArticles } from '../services/article';
import {FileViewer} from "./FileViewer";
import { Loading } from './Loading';
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
        width : '90%',
        [theme.breakpoints.up('sm')] : {
            width : '50%'
        }
    },
    optionIcons : {
        width : '20px',
        height : '20px',
    }
  
}));

function Articles() {
    const [articles, setArticles] = useState([]);
    const [anchorEl, setAnchorEl ] = useState(null);
    const [openMenu, setOpenMenu] = useState(false);
    const [openViewer, setOpenViewer]  = useState(false);
    const [fileBase64, setFileBase64] = useState('');
    const [datasLoading, setDatasLoading] = useState(true);
    const classes = useStyle();

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
    return (
        <Grid 
            container 
            classes = {{container : classes.container}}
            spacing = {3}
        >
        {/* //         <div className="box">
        //             <div className="articleWrapper">
        //                 <div className="titleWrapper">
        //                     <p className="articleTitle" name="title">Arial Photo at Phnom Kulen</p>
        //                     <p className="download" name="filePath">Download</p>
        //                 </div>
        //                 <div>
        //                     <p className="authorsAbstract" name="authors">TUN, VINCENT, GREGORY</p>
        //                     <p className="authorsAbstract" name="abstract">Phnom Kulen is located at the north of Siem Reap</p>
        //                 </div>
        //                 <div className="view">                      
        //                     <p className="numberOfView" name="view">0</p>
        //                     <p className="viewText">Views</p>
        //                 </div>  

        //                 <div className="articleButtons">
        //                     <button className="editButton">Edit article</button>
        //                     <button className="deleteButton">Delete article</button>
        //                 </div>
        //             </div>
        //         </div> */}
            {/* < */}
            {datasLoading && <Loading />}
            {articles.map((article, i) => {
                return(
                    <Grid 
                        item  
                        xs = {12}
                    >
                        <Card key = {i}>
                            <CardHeader 
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
                            <CardContent>
                                <h3>{article.authors}</h3>
                                <h3>{article.abstract}</h3>
                                <h4>{`${article.viewId ?? 0}  views`}</h4>
                            </CardContent>
                        </Card>
                        <Menu
                            open = {openMenu}
                            onClose = {handleCloseMenu}
                            anchorEl = {anchorEl}
                        >
                            <MenuItem
                                onClick = {handleOpenViewer}
                            >
                                Visionner
                            </MenuItem>
                            <MenuItem>Éditer</MenuItem>
                            <MenuItem>Télécharger</MenuItem>
                            <MenuItem>Supprimer</MenuItem>
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