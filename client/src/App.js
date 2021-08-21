import Signup from './pages/Signup';
import Signin from './pages/Signin';
import ForgotPassword from './pages/Forgot-password';
import ResetPassword from './pages/Reset-password';
import ErrorEmail from './pages/Error-email';
import Articles from './pages/Articles';
import PrivatePolicy from './pages/Private-policy'
import EditProfile from './pages/EditProfile';
import Home from './pages/Home'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/signin' component={Signin} />
        <Route exact path = '/home' compoent ={Home} />
        <Route exact path='/forgot-password' component={ForgotPassword} />
        <Route exact path='/reset-password' component={ResetPassword} />
        <Route exact path='/error-email' component={ErrorEmail} />
        <Route exact path='/edit-profile' component={EditProfile} />
        <Route exact path='/articles' component={Articles} />
        <Route exact path='/private-policy' component={PrivatePolicy} />
      </Switch>
      <Footer/>
    </Router>
  );
}

export default App;
