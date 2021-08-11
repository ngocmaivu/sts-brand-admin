import { reportConstants } from "../_constants";
import { getDaysArray } from "../ultis/scheduleHandle";
import format from "date-fns/format";
const INIT_STAFF = {
    summary: {
        "totalWorkHours": 0.0,
        "totalArriveLate": 0,
        "totalLeaveEarly": 0,
        "totalAbsent": 0,
        "totalLackCheckIn": 0,
        "totalLackCheckOut": 0,
    },
    records: []
}

export function reportStaff(state = INIT_STAFF, action) {
    switch (action.type) {
        case reportConstants.REPORT_FETCH_STAFF:
            let datas = action.payload.datas;
            let { records, ...summary } = { ...datas };
            if (records.length != 0) {
                records = records.map((record, index) => {
                    return {
                        id: index,
                        ...record
                    };
                })
            }

            return { ...state, records, summary };
        default: return state;
    }
}




const columnsStart = [
    {
        field: 'username',
        headerName: 'Staff',
        width: 200,
        editable: true,
    },
    {
        field: 'fullName',
        headerName: 'Fullname',
        width: 200,
        editable: true,
    },

];

const columnsEnd = [
    {
        field: 'staffTotalWorkHours',
        headerName: 'TotalWorkHours',
        width: 200,
        headerAlign: "center",
        align: "center",
    },
    {
        field: 'staffTotalArriveLate',
        headerName: 'TotalArriveLate',
        width: 200,
        headerAlign: "center",
        align: "center",
    },
    {
        field: 'staffTotalLeaveEarly',
        headerName: 'staffTotalLeaveEarly',
        width: 200,
        headerAlign: "center",
        align: "center",
    },
    {
        field: 'staffTotalAbsent',
        headerName: 'staffTotalAbsent',
        width: 200,
        headerAlign: "center",
        align: "center",
    },
    {
        field: 'staffTotalLackCheckIn',
        headerName: 'staffTotalLackCheckIn',
        width: 200,
        headerAlign: "center",
        align: "center",
    },
    {
        field: 'staffTotalLackCheckOut',
        headerName: 'staffTotalLackCheckOut',
        width: 200,
        headerAlign: "center",
        align: "center",
    },
]

const INIT_STORE = {
    summary: {
        "storeTotalWorkHours": 0.0,
        "storeTotalArriveLate": 0,
        "storeTotalLeaveEarly": 0,
        "storeTotalAbsent": 17,
        "storeTotalLackCheckIn": 0,
        "storeTotalLackCheckOut": 0,
    },
    timeRange: {},
    records: [],
    columns: []
}
const dateNameVariantPattern = "ddMMyyyy";
export function reportStore(state = INIT_STORE, action) {
    switch (action.type) {
        case reportConstants.REPORT_FETCH_STORE:

            let datas = action.payload.datas;
            let { staff, timeRange, ...summary } = { ...datas };
            let records = [];
            //set columns
            let columns = [];
            let columnsMiddle = [];
            let dateArr = getDaysArray(new Date(timeRange.fromDate), new Date(timeRange.toDate));
            columnsMiddle = dateArr.map(d => {
                return {
                    field: "date_" + format(new Date(d), `${dateNameVariantPattern}`),
                    headerName: format(new Date(d), "dd - MMM"),
                    headerAlign: "center",
                    align: "center",
                    type: "number",
                    width: 150,
                };

            });
            columns = [...columnsStart, ...columnsMiddle, ...columnsEnd];

            //set data
            if (staff.length != 0) {
                records = staff.map((record, index) => {
                    let { workDays, ...rest } = { ...record };

                    let workDayRecord = {};
                    workDays.forEach(workDay => {
                        workDayRecord["date_" + format(new Date(workDay.date), `${dateNameVariantPattern}`)] = workDay.workHours;
                    });


                    return {
                        id: index,
                        fullName: record.firstName + " " + record.lastName,
                        ...rest,
                        ...workDayRecord
                    };
                })
            }

            return { ...state, records, summary, columns, timeRange };
        default: return state;
    }
}