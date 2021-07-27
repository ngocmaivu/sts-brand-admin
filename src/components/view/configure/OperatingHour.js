import {
    CardHeader, Paper, Divider, Typography, Switch,
    createStyles, withStyles, CardContent, Grid, Checkbox,
    FormControl, MenuItem, FormLabel, Select, TextField, Button, Tabs, Box, Table, TableRow, TableHead, TableCell, TableBody, AccordionDetails, AccordionSummary, Accordion
} from '@material-ui/core';

import Autocomplete from '@material-ui/lab/Autocomplete';
import React from 'react';
import { CardCustom } from '../../CardCustom';


const styles = (Theme) => createStyles({
    inputAutoComplete: {
        "& .MuiInputBase-root": {
            padding: "0 0 0 10px"
        }

    },
    container: {
        padding: 10,
        height: "100%"
    }
})

const getTimeSlots = (min, max) => Array.from(new Array(max - min + 1)).map(
    (_, index) => ({
        title: `${(index + min) < 20 ? '0' : ''}${Math.floor((index + min) / 2)}h${(index + min) % 2 === 0 ? '00' : '30'}`,
        value: index + min
    })
)

const SectionSetting = ({ label, children, key, checkboxComponent }) => {
    return (
        <Grid style={{ borderBottom: "1px solid #dfe2e6", paddingBlock: 15 }} key={key} container item alignItems="center" >
            <Grid item style={{ maxWidth: 600, flexGrow: 1, fontWeight: 500 }}>{checkboxComponent}</Grid >
            <Grid item style={{ maxWidth: 600, flexGrow: 1, fontWeight: 500 }}>{label}</Grid >
            {/* <Grid item style={{ flexGrow: 1 }}></Grid > */}
            <Grid item xs={6} >
                {children}
            </Grid>

        </Grid>
    );
}

const OperatingHourPerDay = (props) => {
    const { title, isWorking, handleChangeIsWorking, from, handleChangeFrom, handleChangeTo, to } = props;

    const timeSlotsFromLable = getTimeSlots(0, to - 1);
    const getFromValue = timeSlotsFromLable.find(e => e.value == from);
    const timeSlotsToLable = getTimeSlots(from + 1, 48);
    const getToValue = timeSlotsToLable.find(e => e.value == to);
    return (
        <SectionSetting label={title}
            checkboxComponent={
                <Checkbox checked={isWorking} color="primary"
                    onChange={(event) => {
                        handleChangeIsWorking(event.target.checked)
                    }
                    } />
            }>
            <Grid container spacing={2} alignItems="center" >
                <Grid item style={{ width: 180 }}>
                    <Autocomplete
                        disabled={!isWorking}
                        value={getFromValue}
                        options={timeSlotsFromLable}
                        getOptionLabel={(option) => option.title}
                        onChange={(e, newValue) => {
                            console.log(newValue);
                            handleChangeFrom(newValue.value);
                        }}
                        renderInput={(params) => (
                            <TextField

                                {...params} variant="outlined" size="small" />
                        )}
                    />
                </Grid>
                <Grid item>To</Grid>
                <Grid item style={{ width: 180 }}>
                    <Autocomplete
                        disabled={!isWorking}
                        value={getToValue}
                        style={{ padding: 0 }}
                        options={timeSlotsToLable}
                        onChange={(e, newValue) => {
                            handleChangeTo(newValue.value);
                        }}
                        getOptionLabel={(option) => option.title}
                        renderInput={(params) => (
                            <TextField

                                {...params} variant="outlined" size="small" />
                        )}
                    />
                </Grid>
            </Grid>
        </SectionSetting>
    );
}

const timeSlots = Array.from(new Array(24 * 2)).map(
    (_, index) => ({
        title: `${index < 20 ? '0' : ''}${Math.floor(index / 2)}:${index % 2 === 0 ? '00' : '30'}`,
        value: index
    })
);

class OperatingHoursConfig extends React.Component {
    constructor(props) {
        super(props);
        this.dayOfWeeks = [
            {
                title: "Monday",
                value: 0
            },
            {
                title: "Tuesday",
                value: 1
            },
            {
                title: "Wednesday",
                value: 2
            }, {
                title: "Thursday",
                value: 3
            }, {
                title: "Friday",
                value: 4
            }, {
                title: "Saturday",
                value: 5
            }, {
                title: "Sunday",
                value: 6
            }
        ];

        this.state = {
            datas: props.initialValues
        };
    }
    handleSubmit = () => {
        this.props.onSubmit(this.state.datas);
    }

    render() {
        const classes = this.props.classes;
        return (
            <div >



                <CardContent>
                    <Grid container spacing={5}>

                        <Grid item xs={12}>
                            <CardCustom header="Set Operating Time for store">
                                <Grid container direction="column" spacing={1} style={{ paddingLeft: 20 }} >
                                    {
                                        this.dayOfWeeks.map(day => {
                                            return (
                                                <OperatingHourPerDay title={day.title} key={day.value}
                                                    isWorking={this.state.datas.find(
                                                        e => e.day == day.value
                                                    ).isWorking}
                                                    from={this.state.datas.find(
                                                        e => e.day == day.value
                                                    ).from}
                                                    to={this.state.datas.find(
                                                        e => e.day == day.value
                                                    ).to}
                                                    handleChangeIsWorking={(newValue) => {
                                                        this.setState(
                                                            (preState) => {
                                                                preState.datas.find(e => e.day == day.value).isWorking = newValue;

                                                                return { datas: preState.datas };
                                                            }
                                                        );
                                                    }}

                                                    handleChangeFrom={(newValue) => {
                                                        this.setState(
                                                            (preState) => {
                                                                preState.datas.find(e => e.day == day.value).from = newValue;

                                                                return { datas: preState.datas };
                                                            }
                                                        );
                                                    }}

                                                    handleChangeTo={(newValue) => {
                                                        this.setState(
                                                            (preState) => {
                                                                preState.datas.find(e => e.day == day.value).to = newValue;
                                                                return { datas: preState.datas };
                                                            }
                                                        );
                                                    }}
                                                />
                                            );
                                        })
                                    }
                                </Grid>
                            </CardCustom>
                        </Grid>

                        <Grid item container xs={12} justify="flex-end" spacing={1} direction="row">
                            <Grid item >
                                <Button variant="contained" color="primary" onClick={() => { this.handleSubmit(); }}>Save change</Button>
                            </Grid>
                        </Grid>

                    </Grid>
                </CardContent>


            </div>
        );
    }
}
export default withStyles(styles, { withTheme: true })(OperatingHoursConfig);