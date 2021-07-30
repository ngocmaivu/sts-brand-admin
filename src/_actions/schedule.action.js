import sts from '../apis/sts';
import { scheduleConstants, staffConstants } from "../_constants"
import { authHeader } from "../_helpers/auth-header";
import { getScheduleDatas } from "../_services/schedule.service";
import { convertToJSONDateWithoutChangeValue, getConstraintDefaultFromFirebase } from "../ultis/scheduleHandle";
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

export const getScheduleDataInput = (weekScheduleId) => async dispatch => {
    let data = await getScheduleDatas(weekScheduleId);
    if (!data.isError) {
        dispatch({ type: scheduleConstants.SCHEDULE_DATA_INPUT, payload: data });
    } else {

    }

}

export const fetchWeekSchedules = (dateStart, status) => async dispatch => {
    try {
        const response = await sts.get(`/week-schedules`, {
            params: {
                dateStart: convertToJSONDateWithoutChangeValue(new Date(dateStart)),
                status: status
            },
            headers: authHeader(),
        });

        dispatch({ type: scheduleConstants.FETCH_WEEK_SCHEDULES, payload: { data: response.data, status } });
    } catch (e) {
        console.log(e);
    }
}
export const fetchWeekSchedule = (id) => async dispatch => {
    try {
        if (!id) return;

        const response = await sts.get(`/week-schedules/${id}`, {

            headers: authHeader(),
        });

        dispatch({ type: scheduleConstants.FETCH_WEEK_SCHEDULE, payload: response.data });
    } catch (e) {
        console.log(e);
    }
}

export const fetchSkillSrc = () => async dispatch => {
    try {
        const response = await sts.get("/brands/skills/all", { headers: authHeader(), });
        dispatch({ type: scheduleConstants.FETCH_SKILL_SRC, payload: response.data });
    } catch (e) {
        console.log('Load Skill Fail');
        console.log(e);
    }
}

export const fetchDefaultConfig = () => dispatch => {
    const user = JSON.parse(localStorage.getItem("jwt_decode"));
    const callBack = ({ constraints, operatingTimes }) => {

        dispatch({
            type: scheduleConstants.FETCH_DEFAULT_CONFIG, payload: {
                constraints: constraints,
                operatingTimes: operatingTimes
            }
        })
    }
    getConstraintDefaultFromFirebase(user.storeId, user.brandId, callBack);
}

