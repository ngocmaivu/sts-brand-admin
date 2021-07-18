import { authHeader } from '../_helpers';

export const skillService = {
    create,
    getAllSkill,
    updateSkill,
    delete: _delete
};

function getAllSkill() {
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
    };

    return fetch(`https://sts-project.azurewebsites.net/api/brands/skills/all`, requestOptions).then(handleResponse);
}

function create(skill) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(skill)
    };

    return fetch(`https://sts-project.azurewebsites.net/api/skills`, requestOptions).then(handleResponse);
}

function updateSkill(skill) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(skill)
    };

    return fetch(`https://sts-project.azurewebsites.net/api/skills/${skill.id}`, requestOptions).then(handleResponse);;
}

function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`https://sts-project.azurewebsites.net/api/skills/${id}`, requestOptions).then(handleResponse);
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