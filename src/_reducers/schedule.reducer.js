import { scheduleConstants } from '../_constants';
import _ from 'lodash';

const INIT = {
    template: null,
    weekSchedules: null,
    status: null,
    currentSchedule: null
}

export function scheduleReducer(state = INIT, action) {
    console.log(action.type);
    switch (action.type) {

        case scheduleConstants.SCHEDULE_DATA_INPUT:
            return { ...state, template: action.payload };
        case scheduleConstants.FETCH_WEEK_SCHEDULES:
            return { ...state, status: action.payload?.status, weekSchedules: action.payload?.data };
        case scheduleConstants.FETCH_WEEK_SCHEDULE:
            return { ...state, currentSchedule: action.payload };
        default:
            return state;
    }
}