import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    register,
    getAll,
    getByUserName,
    updateUser,
    delete: _delete
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => {
                    if (user.role === "staff") {
                        dispatch(failure("Invalid user name or password"));
                        dispatch(alertActions.error("Invalid user name or password"));
                    } else {
                        dispatch(success(user));
                        history.push({ pathname: '/stores' });
                    }
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => {
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

function getByUserName() {
    return dispatch => {
        dispatch(request());

        userService.getUserProfile()
            .then(
                userInfor => {
                    dispatch(success(userInfor));
                },
                error => dispatch(failure(error.toString()))
            );

    };

    function request() { return { type: userConstants.GET_USER_REQUEST } }
    function success(userInfor) { return { type: userConstants.GET_USER_SUCCESS, userInfor} }
    function failure(error) { return { type: userConstants.GET_USER_FAILURE, error } }
}

function updateUser(user) {
    return dispatch => {
        dispatch(request());

        userService.update(user)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/profile');
                    dispatch(alertActions.success('Update user successful'));
                    console.log("Update user " + user);
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.UPDATE_USER_REQUEST } }
    function success(user) { return { type: userConstants.UPDATE_USER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.UPDATE_USER_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}