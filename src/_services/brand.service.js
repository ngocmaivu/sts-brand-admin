import { authHeader } from '../_helpers';

export const brandService = {
    create,
    getAllByPage,
    getById,
    update,
    delete: _delete
};

function getAllByPage(pageNumber, pageSize) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(), 
    };

    return fetch(`https://sts-project.azurewebsites.net/api/brands?PageNumber=${pageNumber}&PageSize=${pageSize}`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };

    return fetch(`https://sts-project.azurewebsites.net/api/brands/${id}`, requestOptions).then(handleResponse);
}

function create(brand) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(brand)
    };

    return fetch(`https://sts-project.azurewebsites.net/api/brands`, requestOptions).then(handleResponse);
}

function update(brand) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(brand)
    };

    return fetch(`https://sts-project.azurewebsites.net/api/brands/${brand.id}`, requestOptions).then(handleResponse);;
}

function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`https://sts-project.azurewebsites.net/api/brands/${id}`, requestOptions).then(handleResponse);
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