import { createStyles, Tab, Tabs, withStyles, makeStyles, Grid, CardHeader, CardContent, Card, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Select, MenuItem, FormControl, FormLabel, TextField } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DemandSkill from './DemandSkill';
import { TextFields } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';

const styles = (theme) => createStyles({
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
        height: "100%",
        marginRight: 10
    },
    root: {
        //  flexGrow: 1,
        //  backgroundColor: theme.palette.background.div,
        // display: 'flex',
        height: "100%",
        padding: 10
        //  border: "none"
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
            style={{ height: '100%' }}
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

class DemandPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tabIndex: 0,
            openDeleteDialog: false,
            openEditDialog: false
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


    handleChange = (event, newValue) => {
        console.log(event);
        this.setState({ tabIndex: newValue });
    }
    onDelete = () => {
        this.setState({ openDeleteDialog: true });
    }

    onEdit = () => {
        this.setState({ openEditDialog: true });
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
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title"><Typography variant="h4">Edit</Typography></DialogTitle>
                <DialogContent>
                    <Grid contrainer>
                        <Grid item xs={12}>
                            <FormControl margin="normal" fullWidth>
                                <FormLabel >Select skill</FormLabel>
                                <Select variant="outlined">
                                    <MenuItem value={0}>Skill 1</MenuItem>
                                    <MenuItem value={1}>Skill 2</MenuItem>
                                    <MenuItem value={2}>Skill 3</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item container>
                            <Grid item xs={6}>
                                <FormControl margin="normal" fullWidth>
                                    <FormLabel >Quantity</FormLabel>
                                    <TextField variant="outlined" size="small" />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl margin="normal" fullWidth>
                                    <FormLabel >Select level</FormLabel>
                                    <Select variant="outlined">
                                        <MenuItem value={0} selected>Beginner</MenuItem>
                                        <MenuItem value={1}>Immegiate</MenuItem>
                                        <MenuItem value={2}>Experience</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid item alignItems="center" xs={12}>
                            <FormControl margin="normal" fullWidth>
                                <FormLabel >Select time range</FormLabel>

                                <Grid container spacing={2}>
                                    <Grid item style={{ width: 180 }} >
                                        <Autocomplete
                                            options={this.timeSlots}
                                            getOptionLabel={(option) => option.title}
                                            getOptionSelected={(option, value) => option.title === value.title}
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
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => { handleClose(); }} color="primary" autoFocus>
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
                    <Button onClick={() => { handleClose(); }} color="primary" autoFocus>
                        Confirm
                    </Button>

                </DialogActions>
            </Dialog>
        );
    }

    render() {
        const classes = this.props.classes;
        return (
            <Grid container className={classes.root}>
                <Grid item xs={2}>
                    <Tabs
                        value={this.state.tabIndex}
                        orientation="vertical"
                        onChange={this.handleChange}
                        className={classes.tabs}
                        indicatorColor="primary"
                        textColor="primary"
                    >
                        {this.days.map(day => (<Tab classes={{ root: classes.tabs_root }} disableRipple label={day.title} key={day.title} value={day.value} />))}
                    </Tabs>
                </Grid>
                <Grid item xs={10}>
                    <TabPanel value={0} index={0}>

                        <div>
                            <Grid spacing={2} style={{ borderBottom: "1px solid #dfe2e6", paddingLeft: 20, paddingBottom: 8 }} container alignItems="center" >
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
                        </div>

                        <Grid container style={{ padding: 20, height: "100%" }} spacing={2}>
                            {
                                data.find(e => e.day == this.state.tabIndex).demands.map(demand => {
                                    return (
                                        <Grid key={demand.skillId} item  >
                                            <DemandSkill skillDemand={demand} onDelete={this.onDelete} onEdit={this.onEdit} />
                                        </Grid>);
                                })
                            }
                        </Grid>

                        <Grid container xs={12} justify="flex-end" spacing={1} direction="row">
                            <Grid item >
                                <Button variant="contained" color="primary">Save change</Button>
                            </Grid>
                            <Grid item>
                                <Button variant="outlined" color="primary">Cancel </Button>
                            </Grid>
                        </Grid>
                    </TabPanel>
                </Grid>
                {this.renderDeleteDialog()}
                {this.renderEditDialog()}
            </Grid >
        );
    }
}

export default withStyles(styles, { withTheme: true })(DemandPage);



