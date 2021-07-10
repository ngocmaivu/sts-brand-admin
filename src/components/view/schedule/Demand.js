import { createStyles, Tab, Tabs, withStyles, makeStyles, Grid, CardHeader, CardContent, Card, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Select, MenuItem, FormControl, FormLabel, TextField } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import DemandSkill from './DemandSkill';
import { Autocomplete } from '@material-ui/lab';
import { loadSkills } from "../../../_services";
const styles = (theme) => createStyles({

    root: {
        //  flexGrow: 1,
        //  backgroundColor: theme.palette.background.div,
        // display: 'flex',
        minHeight: "75vh",
        padding: 10
        //  border: "none"
    },
    dayTabsWrapper: {
        minHeight: "70vh",
    },
    dayTabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
        height: "70vh",
        marginRight: 10
    },
    demandPanelWrapper: {
        minHeight: "70vh",
    },
    demandPanel: {

        height: "100%",
    },
    cardSkillDemand: {
        border: "1px solid #E3F2FD",
        // backgroundColor: "#E3F2FD",
        borderRadius: 4,
        "&:hover": {
            border: "1px solid #2196F3"
        }
    },
    inputAutoComplete: {
        "& .MuiInputBase-root": {
            padding: "0 0 0 10px"
        }

    },

});

const data = [
    {
        day: 0,
        operatingTime: { start: 14, end: 46 },
        demands: [ //mang hay map tuy m
            {
                skillId: 1,
                skillName: "Bartender",
                demandDatas: [
                    { start: 14, end: 46, level: 1, quantity: 2 },
                    { start: 14, end: 46, level: 1, quantity: 2 },
                    { start: 14, end: 46, level: 1, quantity: 2 }
                ]
            },
            {
                skillId: 2,
                skillName: "Cashier",
                demandDatas: [
                    { start: 14, end: 46, level: 1, quantity: 2 },
                    { start: 14, end: 46, level: 1, quantity: 2 },
                    { start: 14, end: 46, level: 1, quantity: 2 }
                ]
            },
            {
                skillId: 3,
                skillName: "Waiter",
                demandDatas: [
                    { start: 14, end: 46, level: 1, quantity: 2 },
                    { start: 14, end: 46, level: 1, quantity: 2 },
                    { start: 14, end: 46, level: 1, quantity: 2 }
                ]
            },
        ]
    },
    {
        day: 1,
        operatingTime: { start: 14, end: 46 },
        demands: [ //mang hay map tuy m
            {
                skillId: 1,
                skillName: "Bartender",
                demandDatas: [
                    { start: 14, end: 24, level: 1, quantity: 2 },
                    { start: 24, end: 34, level: 1, quantity: 2 },
                    { start: 34, end: 46, level: 1, quantity: 2 }
                ]
            },
            {
                skillId: 2,
                skillName: "Cashier",
                demandDatas: [
                    { start: 14, end: 46, level: 1, quantity: 2 },
                    { start: 14, end: 46, level: 1, quantity: 2 },
                    { start: 14, end: 46, level: 1, quantity: 2 }
                ]
            },
            {
                skillId: 3,
                skillName: "Waiter",
                demandDatas: [
                    { start: 14, end: 46, level: 1, quantity: 2 },
                    { start: 14, end: 46, level: 1, quantity: 2 },
                    { start: 14, end: 46, level: 1, quantity: 2 }
                ]
            },
        ]
    },
    {
        day: 2,
        operatingTime: { start: 14, end: 46 },
        demands: [ //mang hay map tuy m
            {
                skillId: 1,
                skillName: "Bartender",
                demandDatas: [
                    { start: 14, end: 46, level: 1, quantity: 2 },
                    { start: 14, end: 46, level: 1, quantity: 2 },
                    { start: 14, end: 46, level: 1, quantity: 2 }
                ]
            },
            {
                skillId: 2,
                skillName: "Cashier",
                demandDatas: [
                    { start: 14, end: 46, level: 1, quantity: 2 },
                    { start: 14, end: 46, level: 1, quantity: 2 },
                    { start: 14, end: 46, level: 1, quantity: 2 }
                ]
            },
            {
                skillId: 3,
                skillName: "Waiter",
                demandDatas: [
                    { start: 14, end: 46, level: 1, quantity: 2 },
                    { start: 14, end: 46, level: 1, quantity: 2 },
                    { start: 14, end: 46, level: 1, quantity: 2 }
                ]
            },
        ]
    },
    {
        day: 3,
        operatingTime: { start: 14, end: 46 },
        demands: [ //mang hay map tuy m
            {
                skillId: 1,
                skillName: "Bartender",
                demandDatas: [
                    { start: 14, end: 46, level: 1, quantity: 2 },
                    { start: 14, end: 46, level: 1, quantity: 2 },
                    { start: 14, end: 46, level: 1, quantity: 2 }
                ]
            },
            {
                skillId: 2,
                skillName: "Cashier",
                demandDatas: [
                    { start: 14, end: 46, level: 1, quantity: 2 },
                    { start: 14, end: 46, level: 1, quantity: 2 },
                    { start: 14, end: 46, level: 1, quantity: 2 }
                ]
            },
            {
                skillId: 3,
                skillName: "Waiter",
                demandDatas: [
                    { start: 14, end: 46, level: 1, quantity: 2 },
                    { start: 14, end: 46, level: 1, quantity: 2 },
                    { start: 14, end: 46, level: 1, quantity: 2 }
                ]
            },
        ]
    },
    {
        day: 4,
        operatingTime: { start: 14, end: 46 },
        demands: [ //mang hay map tuy m
            {
                skillId: 1,
                skillName: "Bartender",
                demandDatas: [
                    { start: 14, end: 46, level: 1, quantity: 2 },
                    { start: 14, end: 46, level: 1, quantity: 2 },
                    { start: 14, end: 46, level: 1, quantity: 2 }
                ]
            },
            {
                skillId: 2,
                skillName: "Cashier",
                demandDatas: [
                    { start: 14, end: 46, level: 1, quantity: 2 },
                    { start: 14, end: 46, level: 1, quantity: 2 },
                    { start: 14, end: 46, level: 1, quantity: 2 }
                ]
            },
            {
                skillId: 3,
                skillName: "Waiter",
                demandDatas: [
                    { start: 14, end: 46, level: 1, quantity: 2 },
                    { start: 14, end: 46, level: 1, quantity: 2 },
                    { start: 14, end: 46, level: 1, quantity: 2 }
                ]
            },
        ]
    },
    {
        day: 5,
        operatingTime: { start: 14, end: 46 },
        demands: [ //mang hay map tuy m
            {
                skillId: 1,
                skillName: "Bartender",
                demandDatas: [
                    { start: 14, end: 46, level: 1, quantity: 2 },
                    { start: 14, end: 46, level: 1, quantity: 2 },
                    { start: 14, end: 46, level: 1, quantity: 2 }
                ]
            },
            {
                skillId: 2,
                skillName: "Cashier",
                demandDatas: [
                    { start: 14, end: 46, level: 1, quantity: 2 },
                    { start: 14, end: 46, level: 1, quantity: 2 },
                    { start: 14, end: 46, level: 1, quantity: 2 }
                ]
            },
            {
                skillId: 3,
                skillName: "Waiter",
                demandDatas: [
                    { start: 14, end: 46, level: 1, quantity: 2 },
                    { start: 14, end: 46, level: 1, quantity: 2 },
                    { start: 14, end: 46, level: 1, quantity: 2 }
                ]
            },
        ]
    },
    {
        day: 6,
        operatingTime: { start: 14, end: 46 },
        demands: [ //mang hay map tuy m
            {
                skillId: 1,
                skillName: "Bartender",
                demandDatas: [
                    { start: 14, end: 46, level: 1, quantity: 2 },
                    { start: 14, end: 46, level: 1, quantity: 2 },
                    { start: 14, end: 46, level: 1, quantity: 2 }
                ]
            },
            {
                skillId: 2,
                skillName: "Cashier",
                demandDatas: [
                    { start: 14, end: 46, level: 1, quantity: 2 },
                    { start: 14, end: 46, level: 1, quantity: 2 },
                    { start: 14, end: 46, level: 1, quantity: 2 }
                ]
            },
            {
                skillId: 3,
                skillName: "Waiter",
                demandDatas: [
                    { start: 14, end: 46, level: 1, quantity: 2 },
                    { start: 14, end: 46, level: 1, quantity: 2 },
                    { start: 14, end: 46, level: 1, quantity: 2 }
                ]
            },
        ]
    },
]

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
            style={{ minHeight: '100%' }}
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

const CREATE = "CREATE";
const UPDATE = "UPDATE";
const DELETE = "DELETE";
const NONE = "NONE";
class DemandPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            openDeleteDialog: false,
            openEditDialog: false,
            EditorIndex: -1,
            dataSrc: [],
            skillSrc: [],
            currentAction: NONE,
            dayIndex: 0,
            skillIdSelect: null,
            startTime: null,
            endTime: null,
            quantity: 1,
            level: 1,
            demandIndex: null

        }
        this.timeSlots = Array.from(new Array(24 * 2)).map(
            (_, index) => ({
                title: `${index < 20 ? '0' : ''}${Math.floor(index / 2)}:${index % 2 === 0 ? '00' : '30'}`,
                value: index
            })
        );

        this.days = [
            { title: "Monday", value: 0 },
            { title: "Tuesday", value: 1 },
            { title: "Wednesday", value: 2 },
            { title: "Thursday", value: 3 },
            { title: "Friday", value: 4 },
            { title: "Saturday", value: 5 },
            { title: "Sunday", value: 6 },
        ]
    }

    initData = async () => {
        var skills = await loadSkills();

        var days = [0, 1, 2, 3, 4, 5, 6];
        this.setState({
            skillSrc: skills,
            skillIdSelect: skills[0].id,
            startTime: this.timeSlots[0],
            endTime: this.timeSlots[0],
            dataSrc: days.map(
                day => {
                    return {
                        day: day,
                        demands: skills.map(skill => {

                            return {
                                skillId: skill.id,
                                skillName: skill.name,
                                demandDatas: []
                            };
                        })
                    };

                }
            )
        });
    }

    componentDidMount = async () => {
        await this.initData();
    }
    handleChange = (event, newValue) => {
        console.log(event);
        this.setState({ dayIndex: newValue });
    }
    onDelete = (demandIndex, skillId) => {
        this.setState({ openDeleteDialog: true, currentAction: DELETE, demandIndex: demandIndex, skillIdSelect: skillId });
    }

    onEdit = (demandIndex, skillId) => {
        this.setState({ openEditDialog: true, currentAction: UPDATE, demandIndex: demandIndex, skillIdSelect: skillId });
    }

    onStartAdd = () => {
        this.setState({ openEditDialog: true, currentAction: CREATE, });
    }

    onSave = () => {

        var demand = {
            start: this.state.startTime.value,
            end: this.state.endTime.value,
            level: this.state.level, quantity: this.state.quantity
        };

        switch (this.state.currentAction) {
            case CREATE:
                this.setState(
                    prevState => {
                        var dataSrcTmp = prevState.dataSrc;

                        var demandDayIndex = dataSrcTmp.findIndex(demandDay => demandDay.day == this.state.dayIndex);
                        var skillIndex = dataSrcTmp[demandDayIndex].demands.findIndex(
                            demandSkill => demandSkill.skillId == this.state.skillIdSelect
                        );
                        dataSrcTmp[demandDayIndex].demands[skillIndex].demandDatas.push(demand);
                        return dataSrcTmp;
                    }
                );
                return;
            case UPDATE:
                this.setState(
                    prevState => {
                        var dataSrcTmp = prevState.dataSrc;

                        var demandDayIndex = dataSrcTmp.findIndex(demandDay => demandDay.day == this.state.dayIndex);
                        var skillIndex = dataSrcTmp[demandDayIndex].demands.findIndex(
                            demandSkill => demandSkill.skillId == this.state.skillIdSelect
                        );
                        dataSrcTmp[demandDayIndex].demands[skillIndex].demandDatas[this.state.demandIndex] = demand;
                        return dataSrcTmp;
                    }
                );
                return;
            case DELETE:
                this.setState(
                    prevState => {
                        var dataSrcTmp = prevState.dataSrc;

                        var demandDayIndex = dataSrcTmp.findIndex(demandDay => demandDay.day == this.state.dayIndex);
                        var skillIndex = dataSrcTmp[demandDayIndex].demands.findIndex(
                            demandSkill => demandSkill.skillId == this.state.skillIdSelect
                        );
                        dataSrcTmp[demandDayIndex].demands[skillIndex].demandDatas.splice(this.state.demandIndex, 1);
                        return dataSrcTmp;
                    }
                );
                return;

        }
    }

    renderEditDialog = () => {

        const handleClose = () => {
            this.setState({ openEditDialog: false });
        }

        return (
            <Dialog
                open={this.state.openEditDialog}
                onClose={handleClose}
                maxWidth="sm"
                fullWidth={false}
            >
                <DialogTitle id="alert-dialog-title">Edit</DialogTitle>
                <DialogContent>
                    <Grid container>
                        <Grid item xs={12}>
                            <FormControl margin="normal" fullWidth>
                                <FormLabel >Select skill</FormLabel>
                                <Select variant="outlined"
                                    value={this.state.skillIdSelect ? this.state.skillIdSelect : ""}
                                    onChange={(e) => { this.setState({ skillIdSelect: e.target.value }) }}>
                                    {this.state.skillSrc.map(skill => (
                                        <MenuItem key={skill.id} value={skill.id}>{skill.name}</MenuItem>))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item container>
                            <Grid item xs={6}>
                                <FormControl margin="normal" fullWidth>
                                    <FormLabel >Quantity</FormLabel>
                                    <TextField variant="outlined" size="small"
                                        value={this.state.quantity}
                                        onChange={(e) => { this.setState({ quantity: e.target.value }) }} />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl margin="normal" fullWidth>
                                    <FormLabel >Select level</FormLabel>
                                    <Select variant="outlined"
                                        value={this.state.level}
                                        onChange={(e) => { this.setState({ level: e.target.value }) }}
                                    >
                                        <MenuItem value={0} selected>Beginner</MenuItem>
                                        <MenuItem value={1}>Immegiate</MenuItem>
                                        <MenuItem value={2}>Experience</MenuItem>
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
                                            options={this.timeSlots}
                                            value={this.state.startTime}
                                            onChange={(e, newValue) => {
                                                this.setState({ startTime: newValue })
                                            }}
                                            getOptionLabel={(option) => option.title}

                                            renderInput={(params) => (
                                                <TextField
                                                    classes={{
                                                        "root": this.props.classes.inputAutoComplete
                                                    }}

                                                    {...params} variant="outlined" />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item>To</Grid>
                                    <Grid item style={{ width: 180 }}>
                                        <Autocomplete
                                            style={{ padding: 0 }}
                                            options={this.timeSlots}
                                            value={this.state.endTime}
                                            onChange={(e, newValue) => {
                                                this.setState({ endTime: newValue })
                                            }}
                                            getOptionLabel={(option) => option.title}
                                            renderInput={(params) => (
                                                <TextField
                                                    classes={{
                                                        "root": this.props.classes.inputAutoComplete
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
                    <Button onClick={() => { handleClose(); this.setState({ currentAction: NONE }) }} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => { handleClose(); this.onSave(); }} color="primary" autoFocus>
                        Confirm
                    </Button>

                </DialogActions>
            </Dialog>
        );
    }

    renderDeleteDialog = () => {

        const handleClose = () => {
            this.setState({ openDeleteDialog: false });
        }

        return (
            <Dialog
                open={this.state.openDeleteDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Delete Dialog?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {`Do you want to delete this demand card: `}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => { handleClose(); this.onSave(); }} color="primary" autoFocus>
                        Confirm
                    </Button>

                </DialogActions>
            </Dialog>
        );
    }

    render() {
        const classes = this.props.classes;
        return (
            <Grid container className={classes.root} justify="space-between">
                <Grid item xs={2} className={classes.dayTabsWrapper}>
                    <Tabs
                        value={this.state.dayIndex}
                        orientation="vertical"
                        onChange={this.handleChange}
                        className={classes.dayTabs}
                        indicatorColor="primary"
                        textColor="primary"
                    >
                        {this.days.map(day => (<Tab classes={{ root: classes.tabs_root }} disableRipple label={day.title} key={day.title} value={day.value} />))}
                    </Tabs>
                </Grid>
                <Grid item xs={10} className={classes.demandPanelWrapper}>
                    <TabPanel value={0} index={0} >

                        <div >
                            <Grid container direction="row" justify="space-between" alignItems="center"
                                style={{
                                    borderBottom: "1px solid #dfe2e6", paddingBottom: 8
                                }}>
                                <Grid item spacing={2} xs={8}
                                    style={{ paddingLeft: 20, }} container alignItems="center" >
                                    <Grid item style={{ maxWidth: 600, flexGrow: 1, fontWeight: 500 }}> <Typography variant="h4">Operating Hour</Typography></Grid >

                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item style={{ width: 180 }}>
                                            <Autocomplete
                                                options={this.timeSlots}
                                                getOptionLabel={(option) => option.title}
                                                getOptionSelected={(option, value) => option.title === value.title}
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
                                                options={this.timeSlots}
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
                                </Grid>
                                <Grid item >
                                    <Button variant="contained" color="primary" onClick={this.onStartAdd}>Add</Button>
                                </Grid>
                            </Grid>
                        </div>

                        <Grid container className={classes.demandPanel} style={{
                            padding: 8, height: "100%", flexWrap: "nowrap",
                            overflowX: "scroll"
                        }} spacing={2} >
                            {
                                this.state.dataSrc && this.state.dataSrc.length != 0 ? (this.state.dataSrc.find(e => e.day == this.state.dayIndex).demands.map(demand => {
                                    return (
                                        <Grid key={demand.skillId} item style={{
                                            height: 600
                                        }} >
                                            <DemandSkill skillDemand={demand} onDelete={this.onDelete} onEdit={this.onEdit} />
                                        </Grid>);
                                })) : "Loadding"
                            }
                        </Grid>


                    </TabPanel>
                </Grid>

                <Grid item container xs={12} justify="flex-end" spacing={1} direction="row">
                    <Grid item >
                        <Button variant="contained" color="primary">Save change</Button>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" color="primary">Cancel </Button>
                    </Grid>
                </Grid>
                {this.renderDeleteDialog()}
                {this.renderEditDialog()}
            </Grid >
        );
    }


}

export default withStyles(styles, { withTheme: true })(DemandPage);



