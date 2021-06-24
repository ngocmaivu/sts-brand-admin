import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Redirect, Router } from "react-router";
import history from "../history";
import { connect } from "react-redux";
import Layout from './layout';
import Notification from './view/notification'
import theme from '../themes/Theme';
import { ThemeProvider } from '@material-ui/styles';
import Staff from './view/staff/Staff';
import Staffs from './view/staff/Staffs';
import StaffNew from './view/staff/StaffNew';
import ScheduleMain from './view/schedule';
// import Staffs from './view/Staff';
import Stores from './view/Stores';
import StoreNew from './view/StoreNew';
import { PrivateRoute } from './PrivateRoute';
import Profile from './ProfilePage/Profile';
import EditProfile from './ProfilePage/EditProfile';
import { LoginPage } from './LoginPage/LoginPage';
import ViewSchedule from './Schedule/ViewSchedule';
import { HomePage } from './HomePage/HomePage';
import {UserForm} from './Brand/UserForm';

class App extends React.Component {

  render() {
    return (
      <div>
        <ThemeProvider theme={theme}>
          <Router history={history} >
            <Switch>
              <Route path='/login' exact >
                <LoginPage />
              </Route>
              <Layout>
                <PrivateRoute path="/" exact> <Stores /> </PrivateRoute>
                <Route path="/stores" exact>
                  <Stores />
                </Route>
                <Route path="/home" exact>
                  <HomePage />
                </Route>
                <Route path="/profile" exact>
                  <Profile />
                </Route>
                <Route path="/brandCreate" exact>
                  <UserForm />
                </Route>
                <Route path="/editprofile" exact>
                  <EditProfile />
                </Route>
                <Route path="/stores/new" >
                  <StoreNew />
                </Route>
                <Route path="/staffs" exact>
                  <Staffs />
                </Route>
                <Route path="/staff/new" exact>
                  <StaffNew />
                </Route>
                <Route path="/staffs/:id" >
                  <Staff />
                </Route>
                <Route path="/notify">
                  <Notification />
                </Route>
                <Route path="/schedule">
                  <ScheduleMain />
                </Route>
              </Layout>
              <Redirect from="*" to="/" />
            </Switch>
          </Router>
        </ThemeProvider>
      </div>
    );
  }
}

export default connect()(App);
