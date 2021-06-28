import { combineReducers } from 'redux';
import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { staffReducer as staffs } from "./staff.reducers";
import { reducer as reducerForm } from 'redux-form';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  staffs,
  form: reducerForm,
});

export default rootReducer;