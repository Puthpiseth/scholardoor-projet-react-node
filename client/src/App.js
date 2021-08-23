import React, {useContext} from 'react'
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Profile from './pages/Profile';
import PrivatePolicy from './pages/Private-policy'
import UploadArticle from './pages/Upload_Article';
import EditProfile from './pages/EditProfile';
import Home from './pages/Home';
import Footer from './components/Footer';
import AppContext from './store';
import AuthorsProfileDetails from './pages/AuthorsProfileDetails';

import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

const PrivateRoute = (props) => {

  const authContext = useContext(AppContext)

  if(localStorage.getItem('token')) {
    return <Route component={props.component} exact path={props.path} />
  } else {
    return <Route render ={() => <Redirect to ='/' />} />
  }
}
function App() {

  return (
      <Router>
        <Switch>
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/' component={Signin} />
          <PrivateRoute path ='/home' component ={Home} />
          <PrivateRoute path='/upload-article' component={UploadArticle} />
          <PrivateRoute path='/edit-profile' component={EditProfile} />
          <PrivateRoute path='/profile' component={Profile} />
          <PrivateRoute path = '/details/:userId' component= {AuthorsProfileDetails} />
          <Route exact path='/private-policy' component={PrivatePolicy} />
        </Switch>
        <Footer/>
      </Router>
  );
}

export default App;
