import { storeConstants } from '../_constants';
import { storeService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const storeActions = {
    create,
    getAllByPage,
    getById,
    update,
    createStoreManager,
    delete: _delete
};


function create(store) {
    return dispatch => {
        dispatch(request(store));

        storeService.create(store)
            .then(
                store => {
                    dispatch(success());
                    history.push('/stores');
                    dispatch(alertActions.success('Create Store successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(store) { return { type: storeConstants.STORE_CREAT_REQUEST, store } }
    function success(store) { return { type: storeConstants.STORE_CREAT_SUCCESS, store } }
    function failure(error) { return { type: storeConstants.STORE_CREAT_FAILURE, error } }
}

function createStoreManager(store) {
    return dispatch => {
        dispatch(request(store));

        storeService.create(store)
            .then(
                store => {
                    dispatch(success());
                    history.push('/stores');
                    dispatch(alertActions.success('Create Store successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(store) { return { type: storeConstants.STORE_CREAT_REQUEST, store } }
    function success(store) { return { type: storeConstants.STORE_CREAT_SUCCESS, store } }
    function failure(error) { return { type: storeConstants.STORE_CREAT_FAILURE, error } }
}

function getAllByPage() {
    return dispatch => {
        dispatch(request());

        storeService.getAllByPage()
            .then(
                stores => {
                    dispatch(success(stores));
                    dispatch(alertActions.success('Get Store successful'));
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: storeConstants.STORE_GETALL_REQUEST } }
    function success(stores) { return { type: storeConstants.STORE_GETALL_SUCCESS, stores } }
    function failure(error) { return { type: storeConstants.STORE_GETALL_FAILURE, error } }
}

function getById(id) {
    return dispatch => {
        dispatch(request());

        storeService.getById(id)
            .then(
                store => {
                    dispatch(success(store));
                    dispatch(alertActions.success('Get Store successful'));
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: storeConstants.STORE_GETBYID_REQUEST } }
    function success(store) { return { type: storeConstants.STORE_GETBYID_SUCCESS, store } }
    function failure(error) { return { type: storeConstants.STORE_GETBYID_FAILURE, error } }
}

function update(store) {
    return dispatch => {
        dispatch(request());

        storeService.update(store)
            .then(
                store => {
                    dispatch(success(store));
                    history.push('/stores');
                    dispatch(alertActions.success('Update store successful'));
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: storeConstants.STORE_UPDATE_FAILURE } }
    function success(store) { return { type: storeConstants.STORE_UPDATE_SUCCESS, store } }
    function failure(error) { return { type: storeConstants.STORE_UPDATE_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        storeService.delete(id)
            .then(
                store => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: storeConstants.STORE_DELETE_REQUEST, id } }
    function success(id) { return { type: storeConstants.STORE_DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: storeConstants.STORE_DELETE_FAILURE, id, error } }
}