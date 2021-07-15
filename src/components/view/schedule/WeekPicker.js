import React from 'react';
import { DatePicker } from '@material-ui/pickers';

import isWithinInterval from "date-fns/isWithinInterval";
import clsx from "clsx";
import { IconButton, makeStyles } from '@material-ui/core';
import { format, isSameDay,startOfWeek,endOfWeek } from 'date-fns';

const useStyles = makeStyles( (theme) => ({
    dayWrapper: {
        position: "relative",
    },
    day: {
        width: 36,
        height: 36,
        fontSize: theme.typography.caption.fontSize,
        margin: "0 2px",
        color: "inherit",
    },
    customDayHighlight: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: "2px",
        right: "2px",
        border: `1px solid ${theme.palette.secondary.main}`,
        borderRadius: "50%",
    },
    nonCurrentMonthDay: {
        color: theme.palette.text.disabled,
    },
    highlightNonCurrentMonthDay: {
        color: "#676767",
    },
    highlight: {
        background: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    firstHighlight: {
        extend: "highlight",
        borderTopLeftRadius: "50%",
        borderBottomLeftRadius: "50%",
    },
    endHighlight: {
        extend: "highlight",
        borderTopRightRadius: "50%",
        borderBottomRightRadius: "50%",
    },

}));


function WeekPicker({ onChange, value }) {

    const classes = useStyles();

    const renderWrappedWeekDay = (date, selectedDate, dayInCurrentMonth) => {
        let dateClone = new Date(date);
        let selectedDateClone = new Date(selectedDate);

        const start = startOfWeek(selectedDateClone, {
            weekStartsOn: 1
        });
        const end = endOfWeek(selectedDateClone, {
            weekStartsOn: 1
        });

        const dayIsBetween = isWithinInterval(dateClone, { start, end });
        const isFirstDay = isSameDay(dateClone, start);
        const isLastDay = isSameDay(dateClone, end);

        const wrapperClassName = clsx({
            [classes.highlight]: dayIsBetween,
            [classes.firstHighlight]: isFirstDay,
            [classes.endHighlight]: isLastDay,
        });

        const dayClassName = clsx(classes.day, {
            [classes.nonCurrentMonthDay]: !dayInCurrentMonth,
            [classes.highlightNonCurrentMonthDay]: !dayInCurrentMonth && dayIsBetween,
        });

        return (
            <div className={wrapperClassName}>
                <IconButton className={dayClassName}>
                    <span> {format(dateClone, "d")} </span>
                </IconButton>
            </div>
        );
    };

    return (<DatePicker
        size="small"
        value={value}
        onChange={onChange}
        renderDay={renderWrappedWeekDay}
        inputVariant="outlined"
    />);
}

export default WeekPicker;