import { storeConstants } from '../_constants';
import { storeService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const storeActions = {
    create,
    getAllByPage,
    // getById,
    // update,
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

function getAllByPage(pageNumber, pageSize) {
    return dispatch => {
        dispatch(request());

        storeService.getAllByPage(pageNumber, pageSize)
            .then(
                stores => dispatch(success(stores)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request(stores) { return { type: storeConstants.STORE_GETALL_REQUEST, stores } }
    function success(stores) { return { type: storeConstants.STORE_GETALL_SUCCESS, stores } }
    function failure(error) { return { type: storeConstants.STORE_GETALL_FAILURE, error } }
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