import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent, Divider, Grid, Select, InputLabel, FormControl, MenuItem, FormLabel, Paper, TextField, makeStyles } from '@material-ui/core';
import { KeyboardTimePicker, TimePicker } from "@material-ui/pickers";
import { DateTimePickerComponent, TimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import { format, add, subMinutes, sub, endOfDay } from 'date-fns';
const useStyles = makeStyles((theme) => ({

}));

export function ShiftEditor({ parentProps, setStartTime, setEndTime, setStaffId, skillDataSrc }) {

    const classes = useStyles();
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [skill, setSkill] = useState(parentProps.SkillId);

    const handleStart = (e) => {
        setStart(e.target.value);
        const StartTime = new Date(parentProps.startTime || parentProps.StartTime);

        StartTime.setHours(e.target.value.getHours(), e.target.value.getMinutes());

        setStartTime(StartTime);
    }
    const handleEnd = (e) => {
        setEnd(e.target.value);
        const EndTime = new Date(parentProps.startTime || parentProps.StartTime);

        EndTime.setHours(e.target.value.getHours(), e.target.value.getMinutes());
        setEndTime(EndTime);
    }

    useEffect(() => {
        //INIT
        setStaffId(parentProps.StaffId);
        let tmp = new Date(parentProps.startTime || parentProps.StartTime);
        setStartTime(tmp);
        let startTmp = new Date();
        startTmp.setHours(tmp.getHours(), tmp.getMinutes());
        setStart(startTmp);
        let tmp1 = new Date(parentProps.endTime || parentProps.EndTime);
        setEndTime(tmp1);
        let endTmp = new Date();
        endTmp.setHours(tmp1.getHours(), tmp1.getMinutes());
        setEnd(endTmp);

        // setSkill(parentProps.SkillId);
    }, []);

    const employeeData = [
        { Name: 'Alice', Id: 1, GroupId: 1, Color: '#bbdc00', Designation: 'Content writer' },
        { Name: 'Nancy', Id: 2, GroupId: 2, Color: '#9e5fff', Designation: 'Designer' },
        { Name: 'Robert', Id: 3, GroupId: 1, Color: '#bb0c00', Designation: 'Software Engineer' },
        { Name: 'Robson', Id: 4, GroupId: 2, Color: '#9e5fff', Designation: 'Support Engineer' },
        { Name: 'Laura', Id: 5, GroupId: 1, Color: '#bbdc00', Designation: 'Human Resource' },
        { Name: 'Margaret', Id: 6, GroupId: 2, Color: '#9e5fff', Designation: 'Content Analyst' }
    ];
    const fields = { text: 'Name', value: 'Id' };
    return (
        <div>
            <Divider />
            <CardContent>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <FormLabel >Skill</FormLabel>
                            <Select variant="outlined"
                                value={skill ? skill : "0"}
                                inputProps={{ id: "Skill" }}
                                onChange={(e)=>{setSkill(e.target.value)}}
                                required
                            >
                                {
                                    skillDataSrc.map(e => (
                                        (<MenuItem key={e.id} value={e.id}>{e.name}</MenuItem>)
                                    ))
                                }
                            </Select>

                        </FormControl>
                    </Grid>
                    {/* <Grid item >
                        <MultiSelectComponent placeholder='Choose owner' data-name="StaffId" dataSource={employeeData} fields={fields} value={parentProps.StaffId} />
                    </Grid> */}
                    <input type="hidden" />
                    <Grid item container xs={12} spacing={5}>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <FormLabel >From</FormLabel>

                                <TimePickerComponent format='HH:mm' value={start} onChange={handleStart} min="0:00" strictMode={true} allowEdit={false} />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <FormLabel >To</FormLabel>

                                <TimePickerComponent format='HH:mm' value={end} min="0:00" onChange={handleEnd} strictMode={true} allowEdit={false} />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <FormLabel >Description</FormLabel>
                            <TextField
                                inputProps={{ name: "Description", className: "e-field", id: "Description" }}
                                placeholder="Leave a comment..."
                                variant="outlined"
                                multiline
                                rows={4}
                                style={{ width: "100%" }}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
            </CardContent>
        </div>
    );
}