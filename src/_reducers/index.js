import { combineReducers } from 'redux';
import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { brand } from './brand.reduces';
import { stores } from './store.reduces';
import { skill } from './skill.reducers';
import { alert } from './alert.reducer';
import { staffReducer as staffs } from "./staff.reducers";
import { reportStaff, reportStore } from "./report";
import { reducer as reducerForm } from 'redux-form';
import { scheduleReducer as schedule } from './schedule.reducer';
const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  staffs,
  brand,
  skill,
  form: reducerForm,
  stores,
  schedule,
  reportStaff,
  reportStore
});

export default rootReducer;