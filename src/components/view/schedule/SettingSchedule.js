import {
    CardHeader, Paper, Divider, Typography,
    createStyles, withStyles, CardContent, Grid,
    FormControl, MenuItem, FormLabel, Select, TextField, Button, Tabs, Box, Table, TableRow, TableHead, TableCell, TableBody, AccordionDetails, AccordionSummary, Accordion
} from '@material-ui/core';
import { TimePickerComponent } from '@syncfusion/ej2-react-calendars';
import React from 'react';
import { CardCustom } from '../../CardCustom';
import './schedule.css';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Tab } from '@material-ui/core';
import { useStyles } from '@material-ui/pickers/views/Calendar/SlideTransition';
import PropTypes from 'prop-types';
import Demand from './Demand';
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

const timeSlots = Array.from(new Array(24 * 2)).map(
    (_, index) => ({
        title: `${index < 20 ? '0' : ''}${Math.floor(index / 2)}:${index % 2 === 0 ? '00' : '30'}`,
        value: index
    })
);

const SectionSetting = ({ label, children, }) => {
    return (
        <Grid style={{ borderBottom: "1px solid #dfe2e6", paddingBlock: 15 }} container item alignItems="center" >
            <Grid item style={{ maxWidth: 600, flexGrow: 1, fontWeight: 500 }}>{label}</Grid >
            {/* <Grid item style={{ flexGrow: 1 }}></Grid > */}
            <Grid item xs={6} >
                {children}
            </Grid>

        </Grid>
    );
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    const classes = useStyles();
    return (
        <div
            role="tabpanel" className={classes.card}
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
            style={{ width: '100%', height: "100%" }}
        >
            {value === index && (
                <React.Fragment>
                    {children}
                </React.Fragment>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};


class SettingSchedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabIndex: 1
        }

    }


    handleChange = (event, newValue) => {
        console.log(event);
        this.setState({ tabIndex: newValue });
    }

    render() {
        const classes = this.props.classes;
        return (
            <Paper className={classes.container}>

                <CardHeader title={
                    <Typography variant="h2">
                        Template Schedule Setting
                    </Typography>
                } disableTypography={false}
                    action={
                        <Button variant="contained" color="primary">Add Personal Custom Setting</Button>
                    }
                />
                <Tabs
                    value={this.state.tabIndex}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={this.handleChange}
                    aria-label="disabled tabs example"
                    keep
                >
                    <Tab label="Constraints " value={0} />
                    <Tab label="Demands" value={1} />
                </Tabs>
                <TabPanel value={this.state.tabIndex} index={0}>
                    <CardContent>
                        <Grid container spacing={5} >
                            <Grid item xs={12}>
                                <CardCustom header='General'>
                                    <Grid container direction="column" spacing={1} style={{ paddingLeft: 20 }} >
                                        <SectionSetting label="Operating Hour" >
                                            <Grid container spacing={2} alignItems="center">
                                                <Grid item style={{ width: 180 }}>
                                                    <Autocomplete

                                                        options={timeSlots}
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
                                        </SectionSetting>
                                        <SectionSetting label="Min distance between 2 shifts " >
                                            <TextField classes={{
                                                "root": classes.inputAutoComplete
                                            }} size="small" type="number" variant="outlined" />
                                        </SectionSetting>
                                    </Grid>
                                </CardCustom>
                            </Grid>
                            <Grid item container direction="row" spacing={5}>
                                <Grid item xs={6}>
                                    <CardCustom header='For fulltime'>
                                        <Grid container direction="column" spacing={1} style={{ paddingLeft: 20 }} >
                                            <SectionSetting label="Min Day Off" >
                                                <TextField classes={{
                                                    "root": classes.inputAutoComplete
                                                }} size="small" type="number" variant="outlined" />
                                            </SectionSetting>

                                            <SectionSetting label="Max Day Off" >
                                                <TextField classes={{
                                                    "root": classes.inputAutoComplete
                                                }} size="small" type="number" variant="outlined" />
                                            </SectionSetting>

                                            <SectionSetting label="Min Working Time of the week " >
                                                <TextField classes={{
                                                    "root": classes.inputAutoComplete
                                                }} size="small" type="number" variant="outlined" />
                                            </SectionSetting>

                                            <SectionSetting label="Max Working Time of the week " >
                                                <TextField classes={{
                                                    "root": classes.inputAutoComplete
                                                }} size="small" type="number" variant="outlined" />
                                            </SectionSetting>

                                            <SectionSetting label="Min Working Time of the day " >
                                                <TextField classes={{
                                                    "root": classes.inputAutoComplete
                                                }} size="small" type="number" variant="outlined" />
                                            </SectionSetting>

                                            <SectionSetting label="Max Working Time of the day " >
                                                <TextField classes={{
                                                    "root": classes.inputAutoComplete
                                                }} size="small" type="number" variant="outlined" />
                                            </SectionSetting>
                                            <SectionSetting label="Min shift duration (30 minutes)" >
                                                <TextField classes={{
                                                    "root": classes.inputAutoComplete
                                                }} size="small" type="number" variant="outlined" />
                                            </SectionSetting>

                                            <SectionSetting label="Max shift duration (30 minutes)" >
                                                <TextField classes={{
                                                    "root": classes.inputAutoComplete
                                                }} size="small" type="number" variant="outlined" />
                                            </SectionSetting>

                                            <SectionSetting label="Max number of shift of the day" >
                                                <TextField classes={{
                                                    "root": classes.inputAutoComplete
                                                }} size="small" type="number" variant="outlined" />
                                            </SectionSetting>
                                        </Grid>
                                    </CardCustom>
                                </Grid>
                                <Grid item xs={6}>
                                    <CardCustom header='For parttime'>
                                        <Grid container direction="column" spacing={1} style={{ paddingLeft: 20 }} >
                                            <SectionSetting label="Min Day Off" >
                                                <TextField classes={{
                                                    "root": classes.inputAutoComplete
                                                }} size="small" type="number" variant="outlined" />
                                            </SectionSetting>

                                            <SectionSetting label="Max Day Off" >
                                                <TextField classes={{
                                                    "root": classes.inputAutoComplete
                                                }} size="small" type="number" variant="outlined" />
                                            </SectionSetting>

                                            <SectionSetting label="Min Working Time of the week " >
                                                <TextField classes={{
                                                    "root": classes.inputAutoComplete
                                                }} size="small" type="number" variant="outlined" />
                                            </SectionSetting>

                                            <SectionSetting label="Max Working Time of the week " >
                                                <TextField classes={{
                                                    "root": classes.inputAutoComplete
                                                }} size="small" type="number" variant="outlined" />
                                            </SectionSetting>

                                            <SectionSetting label="Min Working Time of the day " >
                                                <TextField classes={{
                                                    "root": classes.inputAutoComplete
                                                }} size="small" type="number" variant="outlined" />
                                            </SectionSetting>

                                            <SectionSetting label="Max Working Time of the day " >
                                                <TextField classes={{
                                                    "root": classes.inputAutoComplete
                                                }} size="small" type="number" variant="outlined" />
                                            </SectionSetting>
                                            <SectionSetting label="Min shift duration (30 minutes)" >
                                                <TextField classes={{
                                                    "root": classes.inputAutoComplete
                                                }} size="small" type="number" variant="outlined" />
                                            </SectionSetting>

                                            <SectionSetting label="Max shift duration (30 minutes)" >
                                                <TextField classes={{
                                                    "root": classes.inputAutoComplete
                                                }} size="small" type="number" variant="outlined" />
                                            </SectionSetting>

                                            <SectionSetting label="Max number of shift of the day" >
                                                <TextField classes={{
                                                    "root": classes.inputAutoComplete
                                                }} size="small" type="number" variant="outlined" />
                                            </SectionSetting>
                                        </Grid>
                                    </CardCustom>
                                </Grid>
                            </Grid>

                            <Grid item container xs={12} justify="flex-end" spacing={1} direction="row">
                                <Grid item >
                                    <Button variant="contained" color="primary">Save change</Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="outlined" color="primary">Cancel </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                </TabPanel>

                <TabPanel value={this.state.tabIndex} index={1}>


                    <Demand />


                </TabPanel>

                <Divider />
            </Paper >
        );
    }
}

export default withStyles(styles, { withTheme: true })(SettingSchedule);