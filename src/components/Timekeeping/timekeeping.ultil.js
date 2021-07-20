
import { getTotalHoursPerWeek } from '../../ultis/scheduleHandle';

export function getTotalHours  (attendances) {
    return getTotalHoursPerWeek(attendances, "timeCheckIn", "timeCheckOut");
}

export function countAttendances(attendances){
    var count = 0;
    attendances.forEach(attendance => {
        if (attendance.timeCheckIn && attendance.timeCheckOut) count++;
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

export const getCountEarlyAndLately = (attendances) => {
    var count_comeLately = 0;
    var count_leaveEarly = 0;

    attendances.forEach(attendance => {

        if (attendance.timeCheckIn && attendance.timeCheckOut) {
            let timeCheckIn = new Date(attendance.timeCheckIn);
            let timeCheckOut = new Date(attendance.timeCheckOut);

            let timeStart = new Date(attendance.shiftAssignment.timeStart);
            let timeEnd = new Date(attendance.shiftAssignment.timeEnd);

            if (checkComeLateLy(timeCheckIn, timeStart)) count_comeLately++;
            if (checkLeaveEarly(timeCheckOut, timeEnd)) count_leaveEarly++;
        }
    }
    );
    return {
        comeLately: count_comeLately,
        leaveEarly: count_leaveEarly
    };

}

export function getTotalShift(attendances) {
    return attendances.length;
}