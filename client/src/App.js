import Signup from './pages/Signup';
import Signin from './pages/Signin';
import ForgotPassword from './pages/Forgot-password';
import ResetPassword from './pages/Reset-password';
import ErrorEmail from './pages/Error-email';
import Profile from './pages/Profile';
import PrivatePolicy from './pages/Private-policy'

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/signup' component={Signup}></Route>
        <Route exact path='/signin' component={Signin}></Route>
        <Route exact path='/forgot-password' component={ForgotPassword}></Route>
        <Route exact path='/reset-password' component={ResetPassword}></Route>
        <Route exact path='/error-email' component={ErrorEmail}></Route>
        <Route exact path='/profile/:username' component={Profile}></Route>
        <Route exact path='/private-policy' component={PrivatePolicy}></Route>
        

      </Switch>
    </Router>
  );
}

export default App;
