import { brandConstants } from '../_constants';
import { brandService } from '../_services';
import { alertActions } from '.';
import { history } from '../_helpers';

export const brandActions = {
    create,
    getAllByPage,
    // getById,
    // update,
    delete: _delete
};


function create(brand) {
    return dispatch => {
        dispatch(request(brand));

        brandService.create(brand)
            .then(
                brand => { 
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

    function request(brand) { return { type: brandConstants.BRAND_CREAT_REQUEST, brand } }
    function success(brand) { return { type: brandConstants.BRAND_CREAT_SUCCESS, brand } }
    function failure(error) { return { type: brandConstants.BRAND_CREAT_FAILURE, error } }
}

function getAllByPage(pageNumber, pageSize) {
    return dispatch => {
        dispatch(request());

        brandService.getAllByPage(pageNumber, pageSize)
            .then(
                brands => dispatch(success(brands)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request(brands) { return { type: brandConstants.BRAND_GETALL_REQUEST, brands } }
    function success(brands) { return { type: brandConstants.BRAND_GETALL_SUCCESS, brands } }
    function failure(error) { return { type: brandConstants.BRAND_GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        brandService.delete(id)
            .then(
                brand => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: brandConstants.BRAND_DELETE_REQUEST, id } }
    function success(id) { return { type: brandConstants.BRAND_DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: brandConstants.BRAND_DELETE_FAILURE, id, error } }
}