import { getDay, addDays, intervalToDuration } from 'date-fns';

const MONDAY = 1;

export function getFirstDayOfWeek(d) {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff));
}

export function isSameDay(d1, d2) {
    return d1.getFullYear() === d2.getFullYear() &&
        d1.getDate() === d2.getDate() &&
        d1.getMonth() === d2.getMonth();
}

export function convertShift(obj) {
    return {
        StaffId: obj.data().StaffId,
        EndTime: obj.data().EndTime.toDate(),
        StartTime: obj.data().StartTime.toDate(),
        SkillId: obj.data().SkillId,
        Skill: obj.data().SkillName,
        Id: obj.id,
        Description: obj.data().Description ? obj.data().Description : ""
    }
}

export function convertShiftToFireBaseObj(obj) {
    return {
        StaffId: obj.StaffId,
        StartTime: obj.StartTime,
        EndTime: obj.EndTime,
        SkillId: obj.SkillId,
        SkillName: obj.Skill,
        Id: obj.Id,
        Description: obj.Description
    }
}

//  17h05 -> 17:30 -> 17.5, > 17:31 -> 18
export function getHoursInRoundDoubleFormat(date) {
    date = new Date(date);
    let minuteToHourIndex = 0;
    let minutes = date.getMinutes();
    if (minutes > 5) {
        minuteToHourIndex = minutes <= 30 ? 0.5 : 1;
    }
    return date.getHours() + minuteToHourIndex;
}

export function getDateJSONFrom(dateStart, day, hoursIndouble) {
    var date = new Date(dateStart);
    date.setUTCDate(dateStart.getDate());
    date = addDays(date, day);
    let hours = Math.floor(hoursIndouble);

    let minutes = hoursIndouble - Math.floor(hoursIndouble);
    minutes = minutes * 60;

    date.setUTCHours(hours, minutes);
    console.log(date.toJSON());
    console.log(date);
    return date;
}

// {
//     "id": 34,
//     "weekScheduleId": 2,            
//     "skillId": 21,
//     "level": 1,
//     "quantity": 2,
//     "workStart": "2021-07-12T07:00:31.091",
//     "workEnd": "2021-07-12T12:00:31.091",       
// }

export function convertDemandDataToDemandPresent(demandData, dateStart) {
    // console.log(demandData);

    var day = getDay(new Date(demandData.workStart)) == 0 ? 6 : getDay(new Date(demandData.workStart)) - MONDAY;
    return {
        id: demandData.id,
        skillId: demandData.skillId,
        level: demandData.level,
        quantity: demandData.quantity,
        day: day,
        start: getHoursInRoundDoubleFormat(demandData.workStart),
        end: getHoursInRoundDoubleFormat(demandData.workEnd),
    }
}

export function convertDemandPresentToDemandData(demandData, dateStart) {

    return {
        id: demandData.id,
        skillId: demandData.skillId,
        level: demandData.level,
        quantity: demandData.quantity,
        workStart: getDateJSONFrom(dateStart, demandData.day, demandData.start),
        workEnd: getDateJSONFrom(dateStart, demandData.day, demandData.end),
    }
}

export function getTotalHoursPerWeek(timeWorks, timeStartKey, timeEndKey) {
    let totalMinutesPerWeek = 0;

    timeWorks.forEach(timeWork => {
        let duration = intervalToDuration({
            start: new Date(timeWork[timeStartKey]),
            end: new Date(timeWork[timeEndKey])
        });
        totalMinutesPerWeek += duration.hours * 60 + duration.minutes;
    });

    return totalMinutesPerWeek / 60;
}

