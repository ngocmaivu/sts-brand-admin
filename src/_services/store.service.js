import { authHeader } from '../_helpers';
import { getOfficialAPI } from '../apis/sts';
export const storeService = {
    create,
    getAllByPage,
    getById,
    createStoreManager,
    update,
    delete: _delete
};

function getAllByPage() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };

    return fetch(`${getOfficialAPI()}brands/stores`, requestOptions)
    .then(handleResponse)
    // .then(stores => {
    //     // store user details and jwt token in local storage to keep user logged in between page refreshes
    //     localStorage.setItem('stores', JSON.stringify(stores));
    //     // localStorage.setItem('jwt_decode', JSON.stringify(jwt_decode(user.token)));
    //     return stores;
    // });
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };

    return fetch(`${getOfficialAPI()}stores/${id}`, requestOptions).then(handleResponse);
}

function create(store) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(store)
    };

    return fetch(`${getOfficialAPI()}stores`, requestOptions).then(handleResponse);
}

function createStoreManager(assign) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(assign)
    };

    return fetch(`${getOfficialAPI()}manager/assign/store-manager`, requestOptions).then(handleResponse);
}

function update(store) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(store)
    };

    return fetch(`${getOfficialAPI()}manager/stores/${store.id}`, requestOptions).then(handleResponse);;
}

function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${getOfficialAPI()}stores/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // // auto logout if 401 response returned from api
                // logout();
                // location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}