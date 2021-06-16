import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Redirect, Router } from "react-router";
import history from "../history";
import { connect } from "react-redux";
import Layout from './layout';
import theme from '../themes/Theme';
import { ThemeProvider } from '@material-ui/styles';
import Staffs from './view/Staff';
import Stores from './view/Stores';
import StoreNew from './view/StoreNew';
import { PrivateRoute } from './PrivateRoute';
import Profile from './ProfilePage/Profile';
import EditProfile from './ProfilePage/EditProfile';
import { LoginPage } from './LoginPage/LoginPage';
import StaffNew from './view/StaffNew';

class App extends React.Component {

  render() {
    return (
      <div>
        <ThemeProvider theme={theme}>
          <Router history={history} >
          
            <Switch>
            <Route path="/login" component={LoginPage} />
              <Layout>
                <PrivateRoute path="/" exact> <Stores /> </PrivateRoute>
                <Route path="/stores" exact>
                  <Stores />
                </Route>
                <Route path="/profile" exact>
                  <Profile />
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
                <Route path="/staffs/new" >
                  <StaffNew />
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
