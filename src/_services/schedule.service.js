import sts from '../apis/sts';
import { authHeader } from "../_helpers/auth-header";

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

export const getWeekScheduleId = async (dateStart) => {
    try {

        const response = await sts.get("/week-schedules", {
            headers: authHeader(),
            params: {
                dateStart: dateStart
            }
        });
        return response.data;

    } catch (error) {
        console.log(error);
        return null;
    }
}

export const computeSchedule = async (weekScheduleId) => {
    try {

        const response = await sts.get("/manager/schedule", {
            headers: authHeader(),
            params: {
                weekScheduleId: weekScheduleId
            }
        });
        return response.data;

    } catch (error) {
        console.log(error);
        return null;
    }
};