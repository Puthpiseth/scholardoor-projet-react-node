import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router';
import Navbar from '../components/Navbar';
import Details from './Detail';
import ProfileContainer from '../components/Profile-container'
import {makeStyles} from '@material-ui/core'
import {getDetails} from '../services/article';

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

function AuthorsProfileDetails() {
  const [articles, setArticles] = useState([]);
  const [author, setAuthor] = useState({});
  const {userId} = useParams()
  const [datasLoading, setDatasLoading] = useState(true);
  
  useEffect(() => {
    const loadDetails = async() => {
        const details = await getDetails(userId);
        setAuthor(details.data[0].articleAuthor);
        console.log(details.data[0].articleAuthor)
        setArticles(details.data);
        setDatasLoading(false)
        console.log(details.data[0])
    };

    loadDetails();

}, []);
    const classes = useStyle()
    return (
        <div className={classes.root}>
            <Navbar/>
            <ProfileContainer userDetails = {author}/>
            <Details
              articles = {articles}
              author = {author}
              datasLoading = {datasLoading}
            />
        </div>
    )
}

export default AuthorsProfileDetails

