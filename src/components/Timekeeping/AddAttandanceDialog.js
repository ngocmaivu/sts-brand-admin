import { Dialog, DialogTitle, DialogContent, FormControl, FormLabel, Grid, Typography, Button, TextField, DialogActions, Select, MenuItem } from '@material-ui/core';
import { DatePicker, TimePicker } from '@material-ui/pickers';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';


export const AddAttandanceDialog = (props) => {

    const { open, handleClose, staffs, staffCurrent, handleSubmit, storeId } = props;

    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [note, setNote] = useState("");
    const [staff, setStaff] = useState(null);
    const [disabledButton, setDisabledButton] = useState(false);

    useEffect(() => {
        if (staffCurrent) {
            setStaff(staffCurrent);
        } else {
            if (!_.isEmpty(staffs)) setStaff(staffs[0].username);
        }
    }, [props.staffCurrent])

    return (
        <Dialog
            onClose={handleClose}
            fullWidth={true}
            maxWidth="sm"
            open={open}>
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                <Typography variant="h3">Add Attandance</Typography>
            </DialogTitle>
            <DialogContent dividers>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <FormLabel>Staff Name</FormLabel>
                            <Select variant="outlined" size="small"
                                onChange={(e) => {
                                    setStaff(e.target.value);
                                }}
                                value={staff}>
                                {
                                    staffs.map(staff => (
                                        <MenuItem key={staff.username} value={staff.username}>{staff.firstName + " " + staff.lastName}</MenuItem>
                                    ))
                                }
                            </Select>
                            {/* <TextField id="outlined-basic" variant="outlined" size="small" value="Ly Van Cuong"
                                inputProps={{ readonly: true }} /> */}

                        </FormControl>
                    </Grid>
                    <Grid container item direction="row" spacing={2} justify="space-between">
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <FormLabel>Date</FormLabel>
                                <DatePicker value={date} onChange={(e) => { setDate(e) }} inputVariant="outlined" size="small" />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <FormLabel>Time check</FormLabel>
                                <TimePicker size="small" value={time} onChange={(e) => { setTime(e) }} inputVariant="outlined" />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <FormLabel>Note:</FormLabel>
                            <TextField id="outlined-basic" variant="outlined" size="small" value={note} onChange={(e) => { setNote(e.target.value); }} multiline rows={5}
                                inputProps={{ readonly: true }} />

                        </FormControl>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary"> Close</Button>
                <Button onClick={async () => {
                    setDisabledButton(true);
                    console.log({ staff, date, time, note });
                    let timeCheck = new Date(date);
                    timeCheck.setHours(time.getHours());
                    timeCheck.setMinutes(time.getMinutes());

                    let result = await handleSubmit({
                        username: staff,
                        timeCheck: timeCheck,
                        storeId: storeId,
                        checkType: 3
                    });
                    setDisabledButton(false);

                    if (result) {
                        console.log(result);
                        handleClose();
                    } else {

                    }

                }} color="primary" disabled={disabledButton}> Save</Button>
            </DialogActions>
        </Dialog>);
}