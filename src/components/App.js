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
import { StoreNew } from './view/StoreNew';
import { PrivateRoute } from './PrivateRoute';
import Profile from './ProfilePage/Profile';
import EditProfile from './ProfilePage/EditProfile';
import { LoginPage } from './LoginPage/LoginPage';
import StaffNew from './view/staff/StaffNew';
import Staff from './view/staff/Staff';
import ScheduleMain from './view/schedule';
import SchedulePlans from './view/weekSchedulePlan';
import Notification from './view/notification';
import BrandHome from './BrandHome/BrandHome';
import SettingSchedule from './view/schedule/SettingSchedule';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import EditBrand from './ProfilePage/EditBrand';
import AvailablePage from './view/schedule/Available';
import { alertActions } from '../_actions';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { RegisterPage } from './RegisterPage';
import SettingBrandSkill from './ProfilePage/SettingBrandSkill';
import EditStore from './EditStore/EditStore';
import StoreTimekeeping from './Timekeeping/StoreTimekeeping';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
class App extends React.Component {

  // constructor(props) {
  //   super(props);
  //   history.listen((location, action) => {
  //     // clear alert on location change
  //     this.props.clearAlerts();
  //   });
  // }
  // state = { open: false }
  render() {
    // const { alert } = this.props;

    // if (alert.message === "" || !alert.message) {
    //   this.state.open = false
    // }
    // else this.state.open = true
    return (
      <div>
        <ThemeProvider theme={theme}>
          {/* <Snackbar open={this.state.open} autoHideDuration={3000} onClose={() => this.state.open = false} >
            <Alert severity="success">
              {alert.message &&
                <div className={`alert ${alert.type}`}>{alert.message}</div>
              }
            </Alert>
          </Snackbar> */}
          {/* <MuiPickersUtilsProvider utils={DatePicker}> */}
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Router history={history} >
              <Switch>
                {/* <Route path="/" component={LoginPage} /> */}
                <PrivateRoute path="/" exact> <LoginPage /> </PrivateRoute>
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
                <Layout>
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
                  <Route path="/editStore/:id" render={(props) => <EditStore {...props} />} />
                  {/* <EditStore />
                  </Route> */}
                  <Route path="/stores/new" >
                    <StoreNew />
                  </Route>
                  <Route path="/staffs" exact>
                    <Staffs />
                  </Route>
                  <Route path="/settingSkill" exact>
                    <SettingBrandSkill />
                  </Route>
                  <Route exact path="/staff/new" component={StaffNew} />
                  <Route exact path="/staff/info/:id" component={Staff} />
                  {/* <Route exact path="/staff/:id" component={Staff} /> */}
                  <Route path="/notify">
                    <Notification />
                  </Route>
                  <Route path="/schedule/view">
                    <ScheduleMain />
                  </Route>

                  <Route path="/storeTimekeeping" exact>
                    <StoreTimekeeping />
                  </Route>
                  <Route path="/schedule/plans/:status">
                    <SchedulePlans />
                  </Route>
                  <Route path="/schedule/setting">
                    <SettingSchedule />
                  </Route>
                  <Route path="/schedule/available">
                    <AvailablePage />
                  </Route>
                  <Route path="/brandhome">
                    <BrandHome />
                  </Route>
                </Layout>
                <Redirect from="*" to="/" />
              </Switch>
            </Router>

          </MuiPickersUtilsProvider>
        </ThemeProvider >
      </div >
    );
  }
}
function mapState(state) {
  const { alert } = state;
  return { alert };
}

const actionCreators = {
  clearAlerts: alertActions.clear
};
export default connect(mapState, actionCreators)(App);
