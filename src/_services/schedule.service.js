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
};

export const getWeekScheduleDemand = async (weekId) => {
    try {
        const response = await sts.get(`/week-schedules/${weekId}/week-schedule-details`, {
            headers: authHeader(),
        });
        return response.data;

    } catch (error) {
        console.log(error);
        return null;
    }
}

export const triggerCompute = async (weekScheduleId) => {
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

export const checkCompute = async (shiftScheduleResultId) => {
    try {

        const response = await sts.post("/manager/schedule/result", { shiftScheduleResultId: shiftScheduleResultId }, { headers: authHeader() });

        return response.data;

    } catch (error) {
        console.log(error);
        return null;
    }
};


export const commitConstraint = async (constraint) => {
    try {

        const response = await sts.put(`/store-schedule-details/${constraint.id}`, { ...constraint }, { headers: authHeader() });

        return response.data;

    } catch (error) {
        console.log(error);
        return null;
    }
};

export const createDemand = async (demand, weekScheduleId) => {
    try {
        const response = await sts.post("/week-schedule-details", [{ ...demand, weekScheduleId }], { headers: authHeader() });

        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const updateDemand = async (demand) => {
    try {
        const response = await sts.put(`/week-schedule-details/${demand.id}`, { ...demand }, { headers: authHeader() });
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const deleteDemand = async (id) => {
    try {
        const response = await sts.delete(`/week-schedule-details/${id}`, { headers: authHeader() });

        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getShiftRegisterDatas = async (weekId) => {
    try {

        const response = await sts.get(`/week-schedules/${weekId}/shift-registers`, {
            headers: authHeader(),
        });
        return response.data;

    } catch (error) {
        console.log(error);
        return null;
    }
};

export const getScheduleDatas = async (weekScheduleId) => {
    try {
        const response = await sts.post("/manager/schedule/data", { weekScheduleId }, { headers: authHeader() });

        return { ...response.data, isError: false };
    } catch (error) {
        console.log(error);
        return { isError: true, message: "Error" };
    }
};

export const getStaffInfo = (id) => async dispatch => {

    try {
        const response = await sts.get(`/admin/users/${id}`, { headers: authHeader(), });

        return response.data;
    } catch (e) {
        console.log(e);
    }

}

export const fetchWeekSchedule = async (dateStart, status) => {
    try {
        const response = await sts.get(`/week-schedules`, {
            params: {
                dateStart: new Date(dateStart),
                status: status
            },
            headers: authHeader(),
        });
        return response.data;
    } catch (e) {
        console.log(e);
    }
}
