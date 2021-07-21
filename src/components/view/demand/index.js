import { createStyles, Tab, Tabs, withStyles, Grid, CardHeader, CardContent, Card, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Select, MenuItem, FormControl, FormLabel, TextField, FormHelperText } from '@material-ui/core';
import React from 'react';

import { loadSkills, getWeekScheduleDemand, updateDemand, deleteDemand, createDemand } from "../../../_services";
import { addDays, differenceInDays, format } from 'date-fns';
import { levelInit, levels } from "../../../_constants/levelData";
import { convertDemandData, } from "../../../ultis/scheduleHandle";
import {
    ScheduleComponent, Inject, Day, Week,
    TimelineViews, TimelineMonth, ViewsDirective, ViewDirective, Resize, DragAndDrop, ResourcesDirective, ResourceDirective

} from "@syncfusion/ej2-react-schedule";
import { extend, isNullOrUndefined, L10n } from '@syncfusion/ej2-base';
import { DemandEditor } from './DemandEditor';
import "./demand.css";
import { connect } from 'react-redux';

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

        }

        this.rootRef = React.createRef(null);

        this.PreInsertObj = {
            workStart: null,
            workEnd: null,
            quantity: null,
            level: null,
            skillId: null,
        };

        this.dataSource = [
            {
                id: 33,
                weekScheduleId: 2,
                weekSchedule: null,
                skillId: 20,
                skill: null,
                level: 1,
                quantity: 2,
                workStart: "2021-07-15T06:29:00",
                workEnd: "2021-07-15T12:00:00",
                status: 1
            },
            // {
            //     Id: 33,
            //     skillId: 20,
            //     WorkStart: new Date("2021-07-15T06:29:00"),
            //     WorkEnd: new Date("2021-07-15T12:00:00"),

            // },
        ];
    }


    loadDemandDatas = async () => {
        if (this.scheduleObj) {
            var demandDatas = await getWeekScheduleDemand(this.props.weekScheduleId);
            console.log(demandDatas);
            this.scheduleObj.eventSettings.dataSource = demandDatas;
        }
    }

    componentDidMount = async () => {
        await this.loadDemandDatas();
        // console.log(this.scheduleObj?.eventSettings);
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
            let quantityElement = args.element.querySelector('#input-level');
            if (quantityElement) {
                (args.data).quantity = quantityElement.value ? quantityElement.value : "";
            }
            console.log(args.data);

            // console.log(this.scheduleObj.eventSettings.dataSource);

        }
    }

    onActionBegin = async (args) => {
        console.log(args);


        if (args.requestType == "eventChange") {
            let updateObj = convertDemandData(args.changedRecords[0]);
            updateDemand(updateObj);
        } else if (args.requestType === 'eventCreate' && args.data.length > 0) {
            let newObj = convertDemandData(args.data[0]);
            //  console.log(dateDest);
            createDemand(
                newObj, this.props.weekScheduleId
            );

            if (!args.cancel) {
                // const newShiftRef = this.refScheduleCurrentCollection.doc();
                // args.data[0].Id = newShiftRef.id;
                // console.log('new shift Id:' + newShiftRef.id);
                // const data = convertShiftToFireBaseObj(args.data[0]);
                // console.log(data);
                // newShiftRef.set(data);
            }


        } else if (args.requestType == "eventRemove") {
            // this.refScheduleCurrentCollection.doc(args.deletedRecords[0].Id).delete();
            deleteDemand(args.deletedRecords[0].id);
            console.log(args.deletedRecords[0]);
        }

        // this.updateTotalHoursPersWeek();
    }

    onEventRendered = (args) => {
        //this.applyCategoryColor(args);
        let levelColor = levels.find(e => e.value == args.data.level).color;
        args.element.style.backgroundColor = levelColor;
    }

    render() {

        const classes = this.props.classes;

        return (
            <div className={classes.root} >
                {
                    this.props.skillSrc ? (
                        <ScheduleComponent
                            currentView="Week" selectedDate={this.currentDate}
                            cssClass="schedule-custom"
                            eventSettings={{
                                dataSource: this.dataSource,
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
                            group={{ byDate: false, resources: ['Skill'] }}
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
                            <Inject services={[Day, Week, DragAndDrop]} />
                            {/* <Inject services={[Day, Week, WorkWeek, Month, TimelineViews, TimelineMonth]} /> */}
                        </ScheduleComponent>) : "...Loading"
                }
            </div >
        );
    }


}
const mapStateToProps = (state) => {
    return {
        skillSrc: state.schedule.skillSrc
    }
}

export default connect(
    mapStateToProps, {

}
)(withStyles(styles, { withTheme: true })(DemandPage));



