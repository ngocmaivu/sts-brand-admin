import sts from '../apis/sts';
import { scheduleConstants, staffConstants } from "../_constants"
import { authHeader } from "../_helpers/auth-header";
import { getScheduleDatas } from "../_services/schedule.service"
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