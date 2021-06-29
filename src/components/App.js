import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Redirect, Router } from "react-router";
import history from "../history";
import { connect } from "react-redux";
import Layout from './layout';
import theme from '../themes/Theme';
import { ThemeProvider } from '@material-ui/styles';
import Staffs from './view/staff/Staffs';
import Stores from './view/Stores';
import {StoreNew} from './view/StoreNew';
import { PrivateRoute } from './PrivateRoute';
import Profile from './ProfilePage/Profile';
import EditProfile from './ProfilePage/EditProfile';
import { LoginPage } from './LoginPage/LoginPage';
import StaffNew from './view/staff/StaffNew';
import Staff from './view/staff/Staff';
import ScheduleMain from './view/schedule';
import Notification from './view/notification';
import BrandHome from './BrandHome/BrandHome';
import SettingSchedule from './view/schedule/SettingSchedule';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { DatePicker } from '@syncfusion/ej2-react-calendars';
import EditBrand from './ProfilePage/EditBrand';

class App extends React.Component {

  render() {
    return (
      <div>
        <ThemeProvider theme={theme}>
          <MuiPickersUtilsProvider utils={DatePicker}>
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
                <Route path="/editbrand" exact>
                  <EditBrand />
                </Route>
                <Route path="/stores/new" >
                  <StoreNew />
                </Route>
                <Route path="/staff" exact>
                  <Staffs />
                </Route>
                <Route path="/staff/new" exact>
                  <StaffNew />
                </Route>
                <Route path="/staff/:id" >
                  <Staff />
                </Route>
                <Route path="/notify">
                  <Notification />
                </Route>
                <Route path="/schedule/view">
                  <ScheduleMain />
                </Route>
                <Route path="/schedule/setting">
                  <SettingSchedule />
                </Route>
                <Route path="/brandhome">
                  <BrandHome />
                </Route>
              </Layout>
              <Redirect from="*" to="/" />
            </Switch>
          </Router>
          </MuiPickersUtilsProvider>
        </ThemeProvider>
      </div>
    );
  }
}

export default connect()(App);
