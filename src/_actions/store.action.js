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

const user = JSON.parse(localStorage.getItem('jwt_decode'));

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
                    // history.push('/stores');
                    // dispatch(alertActions.success('Create Store successful'));
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

function getById() {
    return dispatch => {
        dispatch(request());

        storeService.getById(user.storeId)
            .then(
                store => {
                    dispatch(success(store));
                    dispatch(alertActions.success('Get Store by id successful'));
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
                    if(user.role === "brand manager") history.push('/stores');
                    else return;
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

// import sts from '../apis/sts';
// import { storeConstants } from "../_constants"
// import { authHeader } from "../_helpers/auth-header";
// const userInfor = JSON.parse(localStorage.getItem("jwt_decode"))

// export const createStore = (data) => async dispatch => {
//     try {
//         const response = await sts.post("/stores", { ...data }, { headers: authHeader() });
//         dispatch({ type: storeConstants.STORE_CREAT_SUCCESS });
//     } catch (e) {
//         console.log(e);
//         dispatch({ type: storeConstants.STORE_CREAT_FAILURE });
//         // TODO excepction

//     }
// }

// export const getStore = (pageIndex, pageSize, searchValue) => async dispatch => {
//     try {
//         //TODO Phân quyền brand/store ở đây


//         if (searchValue === "") {
//             searchValue = null;
//         }
//         var response = null;

//         response = await sts.get("/brands/stores", {
//             headers: authHeader(),
//             params: {
//                 PageNumber: pageIndex,
//                 PageSize: pageSize,
//                 KeyWord: searchValue
//             }
//         });

//         console.log(response);
//         console.log(1);

//         console.log();
//         dispatch({ type: storeConstants.STORE_GETALL_SUCCESS, payload: { datas: response.data, ...JSON.parse(response.headers.pagination), searchValue } });
//     } catch (error) {
//         console.log(error);
//         dispatch({ type: storeConstants.STORE_GETALL_FAILURE, payload: { error: "ERROR" } });
//     }
// }

// export const getStoreInfo = (id) => async dispatch => {
//     const skills = await loadSkills();
//     const stores = await loadStores();
//     const init_data = {};
//     try {
//         const response = await sts.get(`/stores/${id}`, { headers: authHeader(), });

//         dispatch({ type: storeConstants.STORE_GETBYID_SUCCESS, payload: { skills, stores, data: response.data } });
//     } catch (e) {
//         console.log(e);
//     }

// }

// export const deleteStore = (id) => async dispatch => {
//     //TODO fix
//     try {
//         const api = `/stores/${id}`;
//         const response = await sts.delete(api, { headers: authHeader() });
//         dispatch({ type: storeConstants.STORE_DELETE_SUCCESS, payload: id });
//     } catch (error) {
//         console.log(error);
//     }
// }

// const loadSkills = async () => {
//     try {
//         const response = await sts.get("/brands/skills/all", { headers: authHeader(), });
//         return response.data;
//     } catch (e) {
//         console.log('Load Skill Fail');
//         console.log(e);
//     }
// }

// const loadStores = async () => {
//     try {
//         const response = await sts.get("/brands/stores/all", { headers: authHeader(), });
//         return response.data;
//     } catch (e) {
//         console.log('Load Stores Fail');
//         console.log(e);
//     }
// }

