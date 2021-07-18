import { brandConstants } from '../_constants';
import { brandService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const brandActions = {
    create,
    getAllByPage,
    getById,
    updateBrand,
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

    function request() { return { type: brandConstants.BRAND_CREAT_REQUEST } }
    function success(brand) { return { type: brandConstants.BRAND_CREAT_SUCCESS, brand } }
    function failure(error) { return { type: brandConstants.BRAND_CREAT_FAILURE, error } }
}

function updateBrand(brand) {
    return dispatch => {
        dispatch(request());

        brandService.update(brand)
            .then(
                brand => {
                    dispatch(success(brand));
                    history.push('/profile');
                    dispatch(alertActions.success('Update brand successful'));

                    console.log("Update brand " + brand);
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: brandConstants.BRAND_UPDATE_REQUEST } }
    function success(brand) { return { type: brandConstants.BRAND_UPDATE_SUCCESS, brand } }
    function failure(error) { return { type: brandConstants.BRAND_UPDATE_FAILURE, error } }
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

function getById() {
    return dispatch => {
        dispatch(request());

        brandService.getById()
            .then(
                brand => {
                    dispatch(success(brand));
                    console.log(brand);
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: brandConstants.BRAND_GETBYID_REQUEST } }
    function success(brand) { return { type: brandConstants.BRAND_GETBYID_SUCCESS, brand } }
    function failure(error) { return { type: brandConstants.BRAND_GETBYID_FAILURE, error } }
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