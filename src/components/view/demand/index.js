import { createStyles, Tab, Tabs, withStyles, Grid, CardHeader, CardContent, Card, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Select, MenuItem, FormControl, FormLabel, TextField, FormHelperText, Paper, FormControlLabel } from '@material-ui/core';
import React from 'react';

import { loadSkills, getWeekScheduleDemand, updateDemand, deleteDemand, createDemand } from "../../../_services";
import { addDays, differenceInDays, format } from 'date-fns';
import { levelInit, levels } from "../../../_constants/levelData";
import { convertDemandData, firstDayOfWeek, convertToJSONDateWithoutChangeValue } from "../../../ultis/scheduleHandle";
import {
    ScheduleComponent, Inject, Day, Week,
    TimelineViews, TimelineMonth, ViewsDirective, ViewDirective, Resize, DragAndDrop, ResourcesDirective, ResourceDirective

} from "@syncfusion/ej2-react-schedule";
import { extend, isNullOrUndefined, L10n } from '@syncfusion/ej2-base';
import DemandEditor from './DemandEditor';
import "./demand.css";
import { connect } from 'react-redux';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';

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


class DemandPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            byDate: false
        }

        this.rootRef = React.createRef(null);

        this.PreInsertObj = {
            workStart: null,
            workEnd: null,
            quantity: null,
            level: null,
            skillId: null,
        };
    }


    loadDemandDatas = async () => {

        var demandDatas = await getWeekScheduleDemand(this.props.weekScheduleId);
        var NotOperatingTime = this.loadOperatingTimes();
        console.log([...demandDatas, ...NotOperatingTime]);
        if (this.scheduleObj != null) {
            // this.setState({ dataSource: demandDatas });


            let dateStart = new Date(this.props.dateStart);
            let start1 = new Date(this.props.dateStart);
            let end1 = new Date(this.props.dateStart);
            start1.setHours(0);
            end1.setHours(7);

            this.scheduleObj.eventSettings.dataSource = [...demandDatas, ...NotOperatingTime];
        }
    }

    loadOperatingTimes = () => {

        var NotOperatingTime = [];

        if (this.props.defaultConfig && this.props.skillSrc) {
            var operatingTimes = this.props.defaultConfig.operatingTimes;
            let dateStart = new Date(this.props.dateStart);
            operatingTimes.forEach(o => {

                if (o.isWorking) {
                    let start1 = addDays(dateStart, o.day);
                    let end1 = addDays(dateStart, o.day);
                    let start2 = addDays(dateStart, o.day);
                    let end2 = addDays(dateStart, o.day);

                    start1.setHours(0);
                    start1.setMinutes(0);
                    end1.setHours(o.from / 2);
                    end1.setMinutes(o.from % 2 == 1 ? 30 : 0);
                    
                    start2.setHours(o.to / 2);
                    start2.setMinutes(o.to % 2 == 1 ? 30 : 0);
                    console.log(o.to % 2 == 1 ? 30 : 0);
                    end2.setHours(24);
                    end2.setMinutes(0);
                    this.props.skillSrc.forEach(skill => {
                        NotOperatingTime.push({
                            workStart: start1,
                            workEnd: end1,
                            skillId: skill.id,
                            IsBlock: true,
                            level: -1,
                            id: `${o.day}-1-${skill.id}`
                        });
                        NotOperatingTime.push({
                            workStart: start2,
                            workEnd: end2,
                            skillId: skill.id,
                            IsBlock: true,
                            level: -1,
                            id: `${o.day}-1-${skill.id}`
                        });
                    });


                } else {
                    let start1 = addDays(dateStart, o.day);
                    start1.setHours(0);
                    start1.setMinutes(0);

                    let end1 = addDays(dateStart, o.day);
                    end1.setHours(24);
                    end1.setMinutes(0);
                    this.props.skillSrc.forEach(skill => {
                        NotOperatingTime.push({
                            workStart: start1,
                            workEnd: end1,
                            skillId: skill.id,
                            IsBlock: true,
                            level: -1,
                            id: `${o.day}-1-${skill.id}`
                        });
                    });

                }
            });

        }
        return NotOperatingTime;

    }


    componentDidMount = async () => {
        await this.loadDemandDatas();
        // 
    }

    componentDidUpdate = async (prevProps, prevState, snapshot) => {
        if (prevProps.weekScheduleId != this.props.weekScheduleId && this.props.skillSrc) {
            await this.loadDemandDatas();
        }
    }

    //----------------
    setWorkStart = (workStart) => {
        this.PreInsertObj.workStart = workStart;
    }
    setWorkEnd = (workEnd) => {
        this.PreInsertObj.workEnd = workEnd;
    }
    setQuantity = (quantity) => {
        this.PreInsertObj.quantity = quantity;
    }
    setSkillId = (skillId) => {
        this.PreInsertObj.skillId = skillId;
    }
    setLevel = (level) => {
        this.PreInsertObj.level = level;
    }

    //-----------------------
    editorTemplate = (props) => {
        return ((props !== undefined) ?
            <DemandEditor
                parentProps={props}
                setWorkStart={this.setWorkStart}
                setWorkEnd={this.setWorkEnd}
                setSkillId={this.setSkillId}
            /> : <div></div>);
    }

    popupClose = (args) => {
        if (args.type === 'Editor' && !isNullOrUndefined(args.data)) {

            //(args.data).Position = "Bartender";

            (args.data).workStart = this.PreInsertObj.workStart;
            (args.data).workEnd = this.PreInsertObj.workEnd;
            (args.data).skillId = this.PreInsertObj.skillId;

            let levelElement = args.element.querySelector('#input-level');
            if (levelElement) {
                (args.data).level = levelElement.value ? levelElement.value : "";
            }
            let quantityElement = args.element.querySelector('#input-quantity');
            if (quantityElement) {
                (args.data).quantity = quantityElement.value ? quantityElement.value : "";
            }


            // 

        }
    }

    onActionBegin = async (args) => {



        if (args.requestType == "eventChange") {
            let updateObj = convertDemandData(args.changedRecords[0]);
            updateDemand(updateObj);
        } else if (args.requestType === 'eventCreate' && args.data.length > 0) {
            let newObj = convertDemandData(args.data[0]);
            //  
            let responseData = await createDemand(
                newObj, this.props.weekScheduleId
            );
            console.log(responseData);
            args.data[0].id = responseData[0].id;

            if (!args.cancel) {
                // const newShiftRef = this.refScheduleCurrentCollection.doc();
                // args.data[0].Id = newShiftRef.id;
                // 
                // const data = convertShiftToFireBaseObj(args.data[0]);
                // 
                // newShiftRef.set(data);
            }


        } else if (args.requestType == "eventRemove") {
            // this.refScheduleCurrentCollection.doc(args.deletedRecords[0].Id).delete();
            deleteDemand(args.deletedRecords[0].id);

        }

        // this.updateTotalHoursPersWeek();
    }

    onEventRendered = (args) => {
        if (args.data.level != -1) {
            let levelColor = levels.find(e => e.value == args.data.level).color;
            args.element.style.backgroundColor = levelColor;
        }

    }

    render() {

        const classes = this.props.classes;

        return (
            <div className={classes.root} >
                {
                    this.props.skillSrc ? (
                        <Paper>
                            <CardHeader title="Demand" action={
                                <Grid container justify="flex-end" spacing={1} direction="row">
                                    <Grid item>

                                        <ToggleButtonGroup
                                            value={this.state.byDate}
                                            exclusive
                                            size="small"
                                            color="primary"
                                            onChange={
                                                (event, newValue) => {
                                                    this.setState({ byDate: newValue });
                                                }
                                            }
                                            aria-label="text alignment"
                                        >
                                            <ToggleButton value={true} aria-label="left aligned">
                                                Date
                                            </ToggleButton>
                                            <ToggleButton value={false} aria-label="centered">
                                                Skill
                                            </ToggleButton>
                                        </ToggleButtonGroup>
                                    </Grid>
                                </Grid>
                            } />

                            <ScheduleComponent
                                currentView="Week" selectedDate={this.currentDate}
                                cssClass="schedule-custom"
                                eventSettings={{
                                    fields: {
                                        id: 'id',
                                        subject: { name: "quantity" },
                                        startTime: { name: 'workStart' },
                                        endTime: { name: 'workEnd' },

                                    }
                                }}
                                timeScale={{ enable: true, interval: 120, slotCount: 2 }}
                                eventRendered={this.onEventRendered}
                                ref={schedule => this.scheduleObj = schedule}
                                editorTemplate={this.editorTemplate}
                                actionBegin={this.onActionBegin}
                                popupClose={this.popupClose}
                                firstDayOfWeek={1}
                                group={{ byDate: this.state.byDate, resources: ['Skill'] }}
                                showQuickInfo={false}
                                minDate={new Date(this.props.dateStart)}
                                maxDate={addDays((new Date(this.props.dateStart)), 6)}
                            >

                                <ResourcesDirective>
                                    <ResourceDirective
                                        field="skillId"
                                        title="Skill"
                                        name="Skill"
                                        allowMultiple={true}
                                        idField="id"
                                        textField="name"
                                        dataSource={this.props.skillSrc}


                                    >
                                    </ResourceDirective>
                                </ResourcesDirective>
                                <ViewsDirective>
                                    <ViewDirective option='Day' />
                                    <ViewDirective option='Week' />

                                </ViewsDirective>
                                <Inject services={[Day, Week, DragAndDrop, Resize]} />
                                {/* <Inject services={[Day, Week, WorkWeek, Month, TimelineViews, TimelineMonth]} /> */}
                            </ScheduleComponent>
                        </Paper>) : "...Loading"
                }
            </div >
        );
    }


}
const mapStateToProps = (state) => {
    return {
        skillSrc: state.schedule.skillSrc,
        defaultConfig: state.schedule.defaultConfig
    }
}

export default connect(
    mapStateToProps, {

}
)(withStyles(styles, { withTheme: true })(DemandPage));



