import sts from '../apis/sts';
import { staffConstants } from "../_constants"
import { authHeader } from "../_helpers/auth-header";


export const createStaff = (data) => async dispatch => {
    try {
        const response = await sts.post("/manager/users/staff", { ...data }, { headers: authHeader() });
        dispatch({ type: staffConstants.STAFF_CREATE_SUCCESS });
    } catch (e) {
        console.log(e);
        dispatch({ type: staffConstants.STAFF_CREATE_FAILURE });
        // TODO excepction

    }
}

export const updateStaff = (data) => async dispatch => {
    try {
        const response = await sts.put("/manager/users/staff", { ...data }, { headers: authHeader() });
        dispatch({ type: staffConstants.STAFF_UPDATE_SUCCESS });
    } catch (e) {
        console.log(e);
        dispatch({ type: staffConstants.STAFF_UPDATE_FAILURE });
        // TODO excepction

    }
}

export const getStaffs = (pageIndex, pageSize, searchValue) => async dispatch => {
    try {
        //TODO Phân quyền brand/store ở đây

        if (searchValue === "") {
            searchValue = null;
        }

        const response = await sts.get("/stores/staff", {
            headers: authHeader(),
            params: {
                PageNumber: pageIndex,
                PageSize: pageSize,
                KeyWord: searchValue
            }
        });
        console.log(response);
        console.log(1);

        console.log();
        dispatch({ type: staffConstants.STAFF_GETALL_SUCCESS, payload: { datas: response.data, ...JSON.parse(response.headers.pagination), searchValue } });
    } catch (error) {
        console.log(error);
        dispatch({ type: staffConstants.STAFF_GETALL_FAILURE, payload: { error: "ERROR" } });
    }
}

export const loadStaffNew = () => async dispatch => {
    const skills = await loadSkills();
    const stores = await loadStores();
    const init_data = {};
    skills.forEach(skill => (
        init_data[`skill${skill.id}Level`] = 0
    ));

    dispatch({ type: staffConstants.STAFF_LOAD, payload: { data: init_data, skills, stores } });
}


export const getStaffInfo = (id) => async dispatch => {
    const skills = await loadSkills();
    const stores = await loadStores();
    const init_data = {};
    try {
        const response = await sts.get(`/admin/users/${id}`, { headers: authHeader(), });

        dispatch({ type: staffConstants.STAFF_GET, payload: { skills, stores, data: response.data } });
    } catch (e) {
        console.log(e);
    }

}

export const deleteStaff = (id) => async dispatch => {
    //TODO fix
    try {
        const api = `/admin/users/${id}`;
        const response = await sts.delete(api, { headers: authHeader() });
        dispatch({ type: staffConstants.STAFF_DELETE_SUCCESS, payload: id });
    } catch (error) {
        console.log(error);
    }
}

const loadSkills = async () => {
    try {
        const response = await sts.get("/brands/skills/all", { headers: authHeader(), });
        return response.data;
    } catch (e) {
        console.log('Load Skill Fail');
        console.log(e);
    }
}

const loadStores = async () => {
    try {
        const response = await sts.get("/brands/stores/all", { headers: authHeader(), });
        return response.data;
    } catch (e) {
        console.log('Load Stores Fail');
        console.log(e);
    }
}

