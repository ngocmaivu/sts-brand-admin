import sts from '../apis/sts';
import { authHeader } from "../_helpers/auth-header";
import { convertToJSONDateWithoutChangeValue, getFirstDayOfWeek } from "../ultis/scheduleHandle";

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


export const updateConstraint = async (constraint) => {
    try {
        const response = await sts.put(`/store-schedule-details/${constraint.id}`, { ...constraint }, { headers: authHeader() });
        return response.data;

    } catch (error) {
        console.log(error);
        return null;
    }
};
export const postConstraint = async (constraint) => {
    try {
        console.log(constraint);
        const response = await sts.post(`/store-schedule-details/`, [...constraint], { headers: authHeader() });
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

export const createDemands = async (demands) => {
    try {
        const response = await sts.post("/week-schedule-details", demands, { headers: authHeader() });

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

export const deleteWeekSchedule = async (id) => {
    try {
        const response = await sts.delete(`/week-schedules/${id}`, {
            headers: authHeader(),
        });
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export const cloneSchedule = async (weekScheduleId) => {
    try {

        const response = await sts.post("/week-schedules/clone",
            {
                weekScheduleId: weekScheduleId,
            }, { headers: authHeader() });
        console.log(weekScheduleId);
        console.log(response.data);
        return response.data;

    } catch (error) {
        console.log(error);
        return null;
    }
};

export const publishSchedule = async (weekScheduleId, shifts) => {
    try {

        const response = await sts.post("/manager/schedule/publish",
            {
                weekScheduleId: weekScheduleId,
                shiftAssignments: shifts
            }, { headers: authHeader() });

        console.log(weekScheduleId);
        console.log(response.data);
        return response.data;

    } catch (error) {
        console.log(error);
        return null;
    }
};

export const unpublishSchedule = async (weekScheduleId) => {
    try {

        const response = await sts.post("/manager/schedule/unpublish",
            {
                weekScheduleId: weekScheduleId,
                shiftAssignments: []
            }, { headers: authHeader() });

        console.log(weekScheduleId);
        console.log(response.data);
        return response.data;

    } catch (error) {
        console.log(error);
        return null;
    }
};

export const fetchSkillsOfStaff = async (username,) => {
    try {
        const response = await sts.get(`manager/users/${username}/skills`, {

            headers: authHeader(),
        });
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export const fetchAttandances = async (username, FromDate, ToDate) => {
    try {
        let from = new Date(FromDate);
        from.setHours(0, 0);
        let to = new Date(ToDate);
        to.setHours(23, 59);

        const response = await sts.get(`/manager/users/${username}/attendances`, {
            params: {
                FromDate: convertToJSONDateWithoutChangeValue(from),
                ToDate: convertToJSONDateWithoutChangeValue(to)
            },
            headers: authHeader(),
        });
        return response.data;

    } catch (error) {
        console.log(error);
        return null;
    }
}

export const fetchAllAttandances = async (FromDate, ToDate) => {
    try {

        let from = new Date(FromDate);
        from.setHours(0, 0);
        let to = new Date(ToDate);
        to.setHours(23, 59);

        const response = await sts.get(`/manager/users/attendances`, {
            params: {
                FromDate: convertToJSONDateWithoutChangeValue(from),
                ToDate: convertToJSONDateWithoutChangeValue(to)
            },
            headers: authHeader(),
        });
        return response.data;

    } catch (error) {
        console.log(error);
        return null;
    }
}

export const deleteAttandance = async (id) => {
    try {

        const response = await sts.delete(`/attendances/${id}`, {
            headers: authHeader(),
        });
        return response.data;

    } catch (error) {
        console.log(error);
        return null;
    }
}

export const updateWeekScheduleName = async (weekScheduleId, name) => {
    try {

        const response = await sts.put("/week-schedules/" + weekScheduleId,
            {
                name
            }, { headers: authHeader() });
        return response.data;

    } catch (error) {
        console.log(error);
        return null;
    }
};

