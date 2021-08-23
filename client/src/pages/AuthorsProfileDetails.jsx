import React from 'react'
import Navbar from '../components/Navbar';
import Details from './Detail';
import AuthorsProfileContainer from '../components/AuthorsProfileContainer'
import {makeStyles} from '@material-ui/core'

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
    const classes = useStyle()
    return (
        <div className={classes.root}>
            <Navbar/>
            <AuthorsProfileContainer/>
            <Details/>
        </div>
    )
}

export default AuthorsProfileDetails

