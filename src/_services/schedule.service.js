import sts from '../apis/sts';
import { authHeader } from "../_helpers/auth-header";
import { getFirstDayOfWeek } from "../ultis/scheduleHandle";
export const loadStores = async () => {
    try {
        const response = await sts.get("/brands/stores/all", { headers: authHeader(), });
        return response.data;
    } catch (e) {
        console.log('Load Stores Fail');
        console.log(e);
    }
}

export const loadSkills = async () => {
    try {
        const response = await sts.get("/brands/skills/all", { headers: authHeader(), });
        return response.data;
    } catch (e) {
        console.log('Load Skill Fail');
        console.log(e);
    }
}

export const getStaffs = async () => {
    try {

        const response = await sts.get("/stores/staff/all", {
            headers: authHeader(),
        });
        return response.data;

    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getWeekSchedule = async (dateStart) => {
    try {


        //fix error change date
        dateStart.setHours(dateStart.getUTCHours());
        const response = await sts.get("/week-schedules", {
            headers: authHeader(),
            params: {
                dateStart: new Date(dateStart)
            }
        });
        console.log(response.data);
        return response.data;

    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getWeekScheduleConstraint = async (weekId) => {
    try {

        const response = await sts.get(`/week-schedules/${weekId}/store-schedule-details`, {
            headers: authHeader(),
        });
        return response.data;

    } catch (error) {
        console.log(error);
        return null;
    }
}

export const computeSchedule = async (weekScheduleId) => {
    try {

        const response = await sts.post("/manager/schedule", { weekScheduleId: weekScheduleId }, { headers: authHeader() });
        console.log(weekScheduleId);
        console.log(response.data);
        return response.data;

    } catch (error) {
        console.log(error);
        return null;
    }
};