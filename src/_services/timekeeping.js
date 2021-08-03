import format from "date-fns/format";
import sts from "../apis/sts";
import { convertToJSONDateWithoutChangeValue } from "../ultis/scheduleHandle";
import { authHeader } from "../_helpers";


export const fetchTimeKeeping = async (fromDate, toDate) => {
    try {
        const pattern = "yyyy-MM-dd";
        const response = await sts.get(`/stores/timekeeping`, {
            params: {
                FromDate: format(fromDate, pattern),
                ToDate: format(toDate, pattern)
            },
            headers: authHeader(),
        });
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export const calculateTimeKeeping = async (fromDate, toDate) => {
    try {
        let from = new Date(fromDate);
        from.setHours(0, 0);
        let to = new Date(toDate);
        to.setHours(23, 59);
        const response = await sts.post("/manager/stores/calculate-work-time",
            {
                FromDate: convertToJSONDateWithoutChangeValue(from),
                ToDate: convertToJSONDateWithoutChangeValue(to)
            }, { headers: authHeader() });

        console.log(response.data);
        return response.data;

    } catch (error) {
        console.log(error);
        return null;
    }
};

