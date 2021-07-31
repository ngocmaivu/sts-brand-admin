import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent, Divider, Grid, Select, InputLabel, FormControl, MenuItem, FormLabel, Paper, TextField, makeStyles } from '@material-ui/core';
import { KeyboardTimePicker, TimePicker } from "@material-ui/pickers";
import { DateTimePickerComponent, TimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import { format, add, subMinutes, sub, endOfDay } from 'date-fns';
import { levels } from '../../../_constants/levelData';
import { connect } from 'react-redux';
import { getFirstDayOfWeek } from '../../../ultis/scheduleHandle';


const useStyles = makeStyles((theme) => ({

}));

const DemandEditor = ({ parentProps, setWorkStart, setWorkEnd, setSkillId, skillDataSrc, defaultConfig }) => {

    const classes = useStyles();
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");

    const [quantity, setQuantity] = useState(parentProps.quantity ? parentProps.quantity : 1);
    const [level, setLevel] = useState(parentProps.level);

    const handleStart = (e) => {
        setStart(e.target.value);
        if (e.target.value) {
            const workStart = new Date(parentProps.workStart || parentProps.WorkStart);
            workStart.setHours(e.target.value.getHours(), e.target.value.getMinutes());
            setWorkStart(workStart);
        }
    }

    const handleEnd = (e) => {
        setEnd(e.target.value);
        if (e.target.value) {
            const workEnd = new Date(parentProps.workEnd || parentProps.workEnd);
            workEnd.setHours(e.target.value.getHours(), e.target.value.getMinutes());
            setWorkEnd(workEnd);
        }
    }

    useEffect(() => {


        console.log(parentProps);

        //INIT
        setSkillId(parentProps.skillId);

        let tmp = new Date(parentProps.workStart);

        let dayOfWeek = tmp.getDay();
        console.log(dayOfWeek);
        if (dayOfWeek == 0) {
            dayOfWeek = 6;
        } else {
            dayOfWeek -= 1;
        }

        console.log(defaultConfig);
        console.log(tmp);


        setWorkStart(tmp);
        let startTmp = new Date();
        startTmp.setHours(tmp.getHours(), tmp.getMinutes());
        setStart(startTmp);

        let tmp1 = new Date(parentProps.workEnd);
        setWorkEnd(tmp1);
        let endTmp = new Date();
        endTmp.setHours(tmp1.getHours(), tmp1.getMinutes());
        setEnd(endTmp);


        // setSkill(parentProps.SkillId);
    }, []);

    return (
        <div>
            <Divider />
            <CardContent>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <FormLabel >Level</FormLabel>
                            <Select variant="outlined"
                                value={level ? level : 1}
                                inputProps={{ id: "input-level" }}
                                onChange={(e) => { setLevel(e.target.value) }}
                                required
                            >
                                {
                                    levels.map(e => (
                                        (<MenuItem key={e.value} value={e.value}>{e.label}</MenuItem>)
                                    ))
                                }
                            </Select>

                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <FormLabel >Quantity</FormLabel>
                            <TextField variant="outlined" size="small"
                                value={quantity}
                                type="number"
                                inputProps={{ id: "input-quantity" }}
                                onChange={(e) => { setQuantity(e.target.value); }} />
                        </FormControl>
                    </Grid>
                    <Grid item container xs={12} spacing={5}>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <FormLabel >From</FormLabel>

                                <TimePickerComponent format='HH:mm' value={start} required onChange={handleStart} min="0:00" strictMode={true} allowEdit={false} />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <FormLabel >To</FormLabel>
                                <TimePickerComponent format='HH:mm' value={end} required min="0:00" onChange={handleEnd} strictMode={true} allowEdit={false} />
                            </FormControl>
                        </Grid>
                    </Grid>

                </Grid>
            </CardContent>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        defaultConfig: state.schedule.defaultConfig
    }
}

export default connect(
    mapStateToProps, {}
)(DemandEditor);