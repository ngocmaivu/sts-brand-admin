import sts from '../apis/sts';
import { reportConstants } from "../_constants"
import { authHeader } from "../_helpers/auth-header";

import { convertToJSONDateWithoutChangeValue } from "../ultis/scheduleHandle";


export const fetchStaffReport = (username, fromDate, toDate) => async dispatch => {
    try {
        let from = new Date(fromDate);
        from.setHours(0, 0);
        let to = new Date(toDate);
        to.setHours(0, 0);
        console.log(fromDate, toDate);
        const response = await sts.get(`/manager/stores/${username}/report`, {
            headers: authHeader(),
            params: {
                FromDate: convertToJSONDateWithoutChangeValue(from),
                ToDate: convertToJSONDateWithoutChangeValue(to)
            }
        });
        console.log(response);

        dispatch({ type: reportConstants.REPORT_FETCH_STAFF, payload: { datas: response.data } });
    } catch (error) {
        console.log(error);
    }
}


export const fetchStoreReport = (fromDate, toDate) => async dispatch => {
    try {

        let from = new Date(fromDate);
        from.setHours(0, 0);
        let to = new Date(toDate);
        to.setHours(23, 59);

        const response = await sts.get(`/manager/stores/report`, {
            headers: authHeader(),
            params: {
                FromDate: convertToJSONDateWithoutChangeValue(from),
                ToDate: convertToJSONDateWithoutChangeValue(to)
            }
        });
        console.log(response);

        dispatch({ type: reportConstants.REPORT_FETCH_STORE, payload: { datas: response.data } });
    } catch (error) {
        console.log(error);
    }
}