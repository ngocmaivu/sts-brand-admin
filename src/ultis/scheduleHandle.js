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
        Description: obj.data().Description ? obj.data().Description: ""
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