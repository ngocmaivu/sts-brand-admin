import { skillConstants } from '../_constants';
import { skillService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const skillActions = {
    create,
    getAllSkill,
    updateSkill,
    delete: _delete
};


function create(skill) {
    return dispatch => {
        dispatch(request(skill));

        skillService.create(skill)
            .then(
                skill => { 
                    dispatch(success());
                    history.push('/editbrand');
                    dispatch(alertActions.success('Create skill successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(skill) { return { type: skillConstants.SKILL_CREAT_REQUEST, skill } }
    function success(skill) { return { type: skillConstants.SKILL_CREAT_SUCCESS, skill } }
    function failure(error) { return { type: skillConstants.SKILL_CREAT_FAILURE, error } }
}

function getAllSkill() {
    return dispatch => {
        dispatch(request());

        skillService.getAllSkill()
            .then(
                skills => {
                    dispatch(success(skills));
                    dispatch(alertActions.success('Get skill successful'));
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: skillConstants.SKILL_GETALL_REQUEST } }
    function success(skills) { return { type: skillConstants.SKILL_GETALL_SUCCESS, skills } }
    function failure(error) { return { type: skillConstants.SKILL_GETALL_FAILURE, error } }
}

function updateSkill() {
    return dispatch => {
        dispatch(request());

        skillService.updateSkill()
            .then(
                skills => {
                    dispatch(success(skills));
                    dispatch(alertActions.success('Get skill successful'));
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: skillConstants.SKILL_GETALL_REQUEST } }
    function success(skills) { return { type: skillConstants.SKILL_GETALL_SUCCESS, skills } }
    function failure(error) { return { type: skillConstants.SKILL_GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        skillService.delete(id)
            .then(
                skill => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: skillConstants.SKILL_DELETE_REQUEST, id } }
    function success(id) { return { type: skillConstants.SKILL_DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: skillConstants.SKILL_DELETE_FAILURE, id, error } }
}