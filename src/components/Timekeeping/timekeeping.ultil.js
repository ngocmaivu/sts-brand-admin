
import _ from 'lodash';
import { getTotalHoursPerWeek, isSameDay } from '../../ultis/scheduleHandle';

export function getTotalHours(attendances, startKey, endKey) {
    return getTotalHoursPerWeek(attendances, startKey, endKey);
}


export function countAttendances(assignments) {
    var count = 0;
    assignments.forEach(assignment => {
        if (!_.isEmpty(assignment)) {
            if (isSameDay(new Date(assignment.timeStart), new Date(assignment.timeCheckIn))
                && isSameDay(new Date(assignment.timeEnd), new Date(assignment.timeCheckOut))) {
                count++;
            }
        }
    });
    return count;
}

export const checkComeLateLy = (timeCheckIn, timeStart) => {
    if (timeCheckIn.getDate() == timeStart.getDate()) {
        if (timeCheckIn.getHours() > timeStart.getHours()) {
            return true;
        } else if (timeCheckIn.getHours() == timeStart.getHours()) {
            if (timeCheckIn.getMinutes() > timeStart.getMinutes()) {
                return true;
            }
        }
    }
    return false;
}

export const checkLeaveEarly = (timeCheckOut, timeEnd) => {
    if (timeCheckOut.getDate() == timeEnd.getDate()) {
        if (timeCheckOut.getHours() < timeEnd.getHours()) {
            return true;
        } else if (timeCheckOut.getHours() == timeEnd.getHours()) {
            if (timeCheckOut.getMinutes() < timeEnd.getMinutes()) {
                return true;
            }
        }
    }
    return false;
}

export const getCountEarlyAndLately = (assigments) => {
    var count_comeLately = 0;
    var count_leaveEarly = 0;

    assigments.forEach(assigment => {
        if (!_.isEmpty(assigment)) {

            if (assigment.timeCheckIn && assigment.timeCheckOut) {
                let timeCheckIn = new Date(assigment.timeCheckIn);
                let timeCheckOut = new Date(assigment.timeCheckOut);

                let timeStart = new Date(assigment.timeStart);
                let timeEnd = new Date(assigment.timeEnd);

                if (checkComeLateLy(timeCheckIn, timeStart)) count_comeLately++;
                if (checkLeaveEarly(timeCheckOut, timeEnd)) count_leaveEarly++;
            }
        }
    }
    );
    return {
        comeLately: count_comeLately,
        leaveEarly: count_leaveEarly
    };

}

export function getTotalShift(assignments) {
    return assignments.length;
}