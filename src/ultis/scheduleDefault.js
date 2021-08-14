export const getConstraintDefault = () => [
    {
        weekScheduleId: null,
        staffType: 0,
        minDayOff: 0,
        maxDayOff: 1,
        minHoursPerWeek: 40,
        maxHoursPerWeek: 58,
        minHoursPerDay: 0,
        maxHoursPerDay: 8,
        minShiftDuration: 4,
        maxShiftDuration: 8,
        maxShiftPerDay: 1
    },
    {
        weekScheduleId: null,
        staffType: 1,
        minDayOff: 1,
        maxDayOff: 2,
        minHoursPerWeek: 20,
        maxHoursPerWeek: 40,
        minHoursPerDay: 0,
        maxHoursPerDay: 8,
        minShiftDuration: 4,
        maxShiftDuration: 8,
        maxShiftPerDay: 1
    },
];

export const getOperatingTimesDefault = () => [
    {
        day: 0,
        isWorking: true,
        from: 0,
        to: 25
    },
    {
        day: 1,
        isWorking: true,
        from: 0,
        to: 25
    },
    {
        day: 2,
        isWorking: true,
        from: 0,
        to: 25
    },
    {
        day: 3,
        isWorking: true,
        from: 0,
        to: 25
    },
    {
        day: 4,
        isWorking: true,
        from: 0,
        to: 25
    },
    {
        day: 5,
        isWorking: true,
        from: 0,
        to: 25
    },
    {
        day: 6,
        isWorking: true,
        from: 0,
        to: 25
    },
];

export const getDateTemp = () => new Date(2000, 1, 7);