
import { useState } from "react";
import { makeStyles, Grid, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Select, MenuItem, FormControl, FormLabel, TextField, FormHelperText } from '@material-ui/core';
import React from 'react';
import { Autocomplete } from '@material-ui/lab';
import { levelInit, levels } from "../../../_constants/levelData";
import _ from "lodash";

const useStyles = makeStyles((theme) => ({

}));

const validate = ({ level, quantity, skillIdSelect, startTime, endTime }) => {
    const INIT = {
        level: "Please choose level",
        quantity: "Quantity > 0",
        timeRange: "StartTime < EndTime",
        skillIdSelect: "Please choose Skill",
        startTime: "Please choose Start Time",
        endTime: "Please choose End Time"
    }

    const error = {};

    if (!level) {
        error.level = INIT.level
    }

    if (!quantity || quantity <= 0) {
        error.quantity = INIT.quantity
    }

    if (!skillIdSelect) {
        error.skillIdSelect = INIT.skillIdSelect
    }

    if (!startTime) {
        error.startTime = INIT.startTime
    }

    if (!endTime) {
        error.endTime = INIT.endTime
    }

    if (endTime & startTime) {
        if (startTime >= endTime) {
            error.timeRange = INIT.timeRange
        }
    }
}

const DemandEditor = ({ onSubmit, onCancel,
    openEditDialog, handleClose,
    skillSrc,
    data }) => {



    const classes = useStyles();
    const timeSlots = Array.from(new Array(24 * 2)).map(
        (_, index) => ({
            title: `${index < 20 ? '0' : ''}${Math.floor(index / 2)}:${index % 2 === 0 ? '00' : '30'}`,
            value: index / 2
        })
    );

    const [level, setLevel] = useState(data.level);
    const [startTime, setStartTime] = useState(data.startTime);
    const [endTime, setEndTime] = useState(data.endTime);
    const [quantity, setQuantity] = useState(data.quantity);
    const [skillIdSelect, setSkillIdSelect] = useState(data.skillIdSelect);
    const [error, setError] = useState({});

    const handleSubmit = () => {

        const data = {
            level, startTime, endTime, quantity, skillIdSelect
        };
        let tmp = validate(data);
        if (_.isEmpty(tmp)) {
            onSubmit(data);
            handleClose();
        } else {
            setError(tmp);
        }

    }


    const handleCancel = () => {
        handleClose();
        onCancel();
    }

    return (
        <Dialog
            open={openEditDialog}
            onClose={handleClose}
            maxWidth="sm"
            fullWidth={false}
        >
            <DialogTitle id="alert-dialog-title">Edit</DialogTitle>
            <DialogContent>
                <Grid container>
                    <Grid item xs={12}>
                        <FormControl margin="normal" fullWidth>
                            <FormLabel error={error.skillIdSelect ? false : true} >Select skill</FormLabel>
                            <Select variant="outlined"
                                value={skillIdSelect ? skillIdSelect : ""}
                                onChange={(e) => { setSkillIdSelect(e.target.value); }}>
                                {skillSrc.map(skill => (
                                    <MenuItem key={skill.id} value={skill.id}>{skill.name}</MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>
                                {error?.skillIdSelect}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item container>
                        <Grid item xs={6}>
                            <FormControl margin="normal" fullWidth>
                                <FormLabel >Quantity</FormLabel>
                                <TextField variant="outlined" size="small"
                                    value={quantity}
                                    onChange={(e) => { setQuantity(e.target.value); }} />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl margin="normal" fullWidth>
                                <FormLabel >Select level</FormLabel>
                                <Select variant="outlined"
                                    value={level}
                                    onChange={(e) => { setLevel(e.target.value); }}
                                >
                                    {
                                        levels.map(level => (
                                            <MenuItem key={level.value} value={level.value}>{level.label}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl margin="normal" fullWidth>
                            <FormLabel >Select time range</FormLabel>

                            <Grid container alignItems="center" spacing={2}>
                                <Grid item style={{ width: 180 }} >
                                    <Autocomplete
                                        options={timeSlots}
                                        value={startTime}
                                        onChange={(e, newValue) => {

                                            setStartTime(newValue);
                                        }}
                                        getOptionLabel={(option) => option.title}

                                        renderInput={(params) => (
                                            <TextField
                                                classes={{
                                                    "root": classes.inputAutoComplete
                                                }}

                                                {...params} variant="outlined" />
                                        )}
                                    />
                                </Grid>
                                <Grid item>To</Grid>
                                <Grid item style={{ width: 180 }}>
                                    <Autocomplete
                                        style={{ padding: 0 }}
                                        options={timeSlots}
                                        value={endTime}
                                        onChange={(e, newValue) => {
                                            setEndTime(newValue);
                                        }}
                                        getOptionLabel={(option) => option.title}
                                        renderInput={(params) => (
                                            <TextField
                                                classes={{
                                                    "root": classes.inputAutoComplete
                                                }}
                                                {...params} variant="outlined" />
                                        )}
                                    />
                                </Grid>
                            </Grid>
                        </FormControl>

                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSubmit} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleCancel} color="primary" autoFocus>
                    Confirm
                </Button>

            </DialogActions>
        </Dialog>
    );
}

export default DemandEditor;