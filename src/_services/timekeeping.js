import format from "date-fns/format";
import sts from "../apis/sts";
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