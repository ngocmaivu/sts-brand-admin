import { getDay, addDays, intervalToDuration } from 'date-fns';
import { forEach } from 'lodash';
import firebase from "../firebase";
import { getConstraintDefault, getOperatingTimesDefault } from './scheduleDefault';

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

export function convertToJSONDateWithoutChangeValue(dateSrc) {
    var date = new Date(dateSrc);
    date.setUTCDate(dateSrc.getDate());
    date.setUTCHours(dateSrc.getHours());
    date.setUTCMinutes(dateSrc.getMinutes());

    return date.toJSON();
}

export function convertDemandData(demandData) {
    return {
        id: demandData.id,
        skillId: demandData.skillId,
        level: demandData.level,
        quantity: demandData.quantity,
        workStart: convertToJSONDateWithoutChangeValue(demandData.workStart),
        workEnd: convertToJSONDateWithoutChangeValue(demandData.workEnd),
    }
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
        if (timeWork[timeStartKey] && timeWork[timeEndKey]) {
            let duration = intervalToDuration({
                start: new Date(timeWork[timeStartKey]),
                end: new Date(timeWork[timeEndKey])
            });

            totalMinutesPerWeek += duration.hours * 60 + duration.minutes;
        }


    });

    return totalMinutesPerWeek / 60;
}

export function getHourDuration(start, end) {

    let duration = intervalToDuration({
        start: new Date(start),
        end: new Date(end)
    });

    let result = duration.hours * 60 + duration.minutes;
    return (result / 60).toFixed(1);
}


export const getSchedulesDataFromFirebase = (weekScheduleId, storeId, brandId, getScheduleCallback) => {
    const ref = firebase.firestore().collection("brands");
    try {
        ref.doc(`${brandId}-${storeId}`).get().then((doc) => {
            if (!doc.exists) {
                getScheduleCallback([]);
            }

            ref.doc(`${brandId}-${storeId}`).collection("schedules").get().then(
                (snapshot) => {
                    let isExistWeekSchedule = false;
                    snapshot.forEach((doc) => {
                        let schedule = doc.data();
                        if (schedule.Id == weekScheduleId) {
                            console.log("SEE " + schedule.Id);
                            isExistWeekSchedule = true;
                            ref.doc(`${brandId}-${storeId}`)
                                .collection("schedules")
                                .doc(doc.id)
                                .collection("shifts").get().then(
                                    (snapshot) => {
                                        console.log(snapshot);
                                        let src = snapshot.docs.map(shift => {
                                            return {
                                                username: shift.data().StaffId,
                                                timeEnd: convertToJSONDateWithoutChangeValue(shift.data().EndTime.toDate()),
                                                timeStart: convertToJSONDateWithoutChangeValue(shift.data().StartTime.toDate()),
                                                skillId: shift.data().SkillId,
                                                storeId: storeId,
                                            }
                                        });
                                        getScheduleCallback(src);
                                    }
                                );

                        }
                    });
                    getScheduleCallback([]);
                }
            )
        });
    } catch (e) {
        console.log(e);
        getScheduleCallback([]);
    }

}

export const cloneSchedulesDataFromFirebase = (weekScheduleIdSrc, weekScheduleIdDest, storeId, brandId) => {
    const ref = firebase.firestore().collection("brands");

    try {
        ref.doc(`${brandId}-${storeId}`).get().then((doc) => {
            if (!doc.exists) {
                return;
            }

            ref.doc(`${brandId}-${storeId}`).collection("schedules").get().then(
                (snapshot) => {
                    let isExistWeekSchedule = false;
                    snapshot.forEach((doc) => {
                        let schedule = doc.data();
                        if (schedule.Id == weekScheduleIdSrc) {

                            isExistWeekSchedule = true;
                            ref.doc(`${brandId}-${storeId}`)
                                .collection("schedules")
                                .doc(doc.id)
                                .collection("shifts").get().then(
                                    (snapshot) => {
                                        console.log(snapshot);

                                        ref.doc(`${brandId}-${storeId}`).collection("schedules").add({
                                            StartDate: schedule.StartDate,
                                            Id: weekScheduleIdDest
                                        }).then((docRef) => {
                                            snapshot.docs.forEach(
                                                shift => {
                                                    docRef.collection("shifts").add(shift.data());
                                                }
                                            )
                                        }
                                        );

                                    }
                                );

                        }
                    });
                    return;
                }
            )
        });
    } catch (e) {
        console.log(e);
    }

}

export const getConstraintDefaultFromFirebase = (storeId, brandId, callBack) => {
    const ref = firebase.firestore().collection("brands");

    //Check Brand-Store on firebase
    ref.doc(`${brandId}-${storeId}`).get().then((doc) => {

        if (!doc.exists) {
            //Set doc
            const data = {
                BrandId: brandId,
                StoreId: storeId,
                DefaultScheduleConfig: {
                    constraints: getConstraintDefault(),
                    operatingTimes: getOperatingTimesDefault()
                }
            };

            ref.doc(`${brandId}-${storeId}`)
                .set(data)
                .then(() => {
                    console.log("Document successfully written!");
                    callBack({ constraints: getConstraintDefault(), operatingTimes: getOperatingTimesDefault() });
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
        } else {
            if (!doc.data().DefaultScheduleConfig) {
                ref.doc(`${this.BrandId}-${this.StoreId}`).update({
                    DefaultScheduleConfig: {
                        constraints: getConstraintDefault(),
                        operatingTimes: getOperatingTimesDefault()
                    }
                });
                callBack({ constraints: getConstraintDefault(), operatingTimes: getOperatingTimesDefault() });
            } else {
                console.log(doc.data().DefaultScheduleConfig.constraints);

                callBack({
                    constraints: doc.data().DefaultScheduleConfig.constraints,
                    operatingTimes: doc.data().DefaultScheduleConfig.operatingTimes
                });
            }
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });

}