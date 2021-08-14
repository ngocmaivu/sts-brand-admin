import React from 'react';
import './schedule.css';
import { loadSkills, getStaffs, getWeekSchedule, triggerCompute, checkCompute, unpublishSchedule, publishSchedule } from "../../../_services";
import { weekScheduleStatus } from "../weekSchedulePlan/status";
import {
    ScheduleComponent, Inject, Day, Week,
    TimelineViews, TimelineMonth, ViewsDirective, ViewDirective, Resize, DragAndDrop, ResourcesDirective, ResourceDirective, addDays

} from "@syncfusion/ej2-react-schedule";
import { extend, isNullOrUndefined, L10n } from '@syncfusion/ej2-base';

import { Card, CardHeader, Grid, Paper, Button, withStyles, Modal, createStyles, Divider, CardContent, LinearProgress, Typography, Box } from '@material-ui/core';
import { ShiftEditor } from './ShiftEditor';
import firebase from "../../../firebase";
import { getFirstDayOfWeek, isSameDay, convertShift, convertShiftToFireBaseObj, getTotalHoursPerWeek, getSchedulesDataFromFirebase } from "../../../ultis/scheduleHandle";
import { getScheduleDataInput } from "../../../_actions";
import { connect } from 'react-redux';
import AlertDialog from '../../AlertDialog';
import format from 'date-fns/format';

L10n.load({
    'en-US': {
        'schedule': {
            'saveButton': 'Add',
            'cancelButton': 'Close',
            'deleteButton': 'Remove',
            'newEvent': 'New Shift',
            'editEvent': "Edit Shift"
        }
    }
});

const styles = (theme) => createStyles({
    modal: {
        display: 'flex',
        padding: theme.spacing(1),
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContent: {
        width: 400,


        boxShadow: theme.shadows[5],

    },

});

class ScheduleMain extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            employeeData: null,
            openWaitingComputeModal: false,
            openAlertDialog: false,
            disabledButton: false,
            startHour: 0,
            endHout: 46,
        }
        this.SkillColors = [
            "#c7adff", "#ecb677", "#e28bb4", "#cbf9d9"
        ];

        this.rootRef = React.createRef(null);

        this.PreInsertObj = {
            StartTime: null,
            EndTime: null,
            SkillName: null,
            SKillId: null,
            StaffId: null,
            Description: null
        };

        const user = JSON.parse(localStorage.getItem("jwt_decode"));
        this.BrandId = user.brandId;
        this.StoreId = user.storeId;

        this.currentDate = new Date();
        const ref = firebase.firestore().collection("brands");

        //Check Brand-Store on firebase
        ref.doc(`${this.BrandId}-${this.StoreId}`).get().then((doc) => {
            if (!doc.exists) {
                //Set doc
                const data = {
                    BrandId: this.BrandId,
                    StoreId: this.StoreId,
                };

                ref.doc(`${this.BrandId}-${this.StoreId}`)
                    .set(data)
                    .then(() => {
                        console.log("Document successfully written!");
                    })
                    .catch((error) => {
                        console.error("Error writing document: ", error);
                    });

                //set sub collection
                var startDate = getFirstDayOfWeek(this.currentDate);
                startDate.setHours(0, 0, 0);
                console.log("NEW SCHEDULE");
                ref.doc(`${this.BrandId}-${this.StoreId}`).collection("schedules").add({
                    StartDate: startDate,
                    Id: this.props.weekScheduleId
                }).then((docRef) => {
                    console.log("Document successfully written!");
                    this.refScheduleCurrentCollection = docRef.collection("shifts");
                }).catch((error) => {
                    console.error("Error writing document: ", error);
                });

            }

            //Check Week Schedule
            //ref.doc(`${this.BrandId}-${this.StoreId}`).collection("schedules").get

        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }



    componentDidUpdate = (prevState) => {
        if (this.updateResourceHeaderTemplate) {
            this.scheduleObj.resourceHeaderTemplate = this.resourceHeaderTemplate;
        }

        if (!this.state.employeeData) {
            this.loadData();
        }

    }



    loadData = async () => {

        var staffs = await getStaffs();
        console.log(staffs);
        staffs = staffs.map(staff => ({ Name: `${staff.firstName} ${staff.lastName}`, Id: staff.username }));

        this.props.getScheduleDataInput(this.props.weekScheduleId);

        this.setState({
            employeeData: staffs
        });


    }

    handleCloseAlertDialog = () => {
        this.setState({ openAlertDialog: false });
    }
    componentDidMount = async () => {

        await this.loadData();
        if (this.props.skillSrc && this.state.employeeData) {
            this.getDataSource();
        }
    }

    componentWillUnmount = () => {
        if (this.unSub)
            this.unSub();

        if (this.checkResultInterval) {
            clearInterval(this.checkComputeResult);
        }
    }

    //----------------
    getDataSource = async () => {
        const ref = firebase.firestore().collection("brands");

        //Get datasource
        await ref.doc(`${this.BrandId}-${this.StoreId}`).collection("schedules").get().then((snapshot) => {
            let isExistWeekSchedule = false;
            snapshot.forEach((doc) => {

                let schedule = doc.data();
                console.log("UPdate");

                if (schedule.Id == this.props.weekScheduleId) {
                    isExistWeekSchedule = true;
                    //get
                    console.log("UPdate");
                    this.refScheduleCurrentCollection = ref.doc(`${this.BrandId}-${this.StoreId}`)
                        .collection("schedules")
                        .doc(doc.id)
                        .collection("shifts");

                    this.unSub = ref.doc(`${this.BrandId}-${this.StoreId}`)
                        .collection("schedules")
                        .doc(doc.id)
                        .collection("shifts")
                        .onSnapshot((querySnapshot) => {
                            //Get DataSource
                            console.log(querySnapshot.docs);
                            //  let src = [];
                            if (!querySnapshot.docs.exists) {
                                console.log("Not Exist");

                            }
                            let src = querySnapshot.docs.map(shift => {

                                let obj = convertShift(shift);
                                // console.log(shift);
                                return obj;
                            });

                            if (this.scheduleObj) {
                                this.scheduleObj.eventSettings.dataSource = src;
                                this.updateTotalHoursPersWeek();
                            }

                        });
                }
            });

            if (!isExistWeekSchedule) {
                let startDate = new Date(this.props.dateStart);
                startDate.setHours(0, 0, 0);
                ref.doc(`${this.BrandId}-${this.StoreId}`).collection("schedules").add({
                    StartDate: startDate,
                    Id: this.props.weekScheduleId
                }).then((docRef) => {
                    this.refScheduleCurrentCollection = docRef.collection("shifts");
                    this.unSub = docRef.collection("shifts")
                        .onSnapshot((querySnapshot) => {
                            let src = querySnapshot.docs.map(shift => {
                                let obj = convertShift(shift);
                                console.log(shift);
                                return obj;
                            });

                            this.scheduleObj.eventSettings.dataSource = src;
                        });
                });

            }
        });
    }

    unSubDataSource = () => {
        this.unSub();
    }


    //----------------

    setStartTime = (StartTime) => {
        this.PreInsertObj.StartTime = StartTime;
    }
    setEndTime = (EndTime) => {
        this.PreInsertObj.EndTime = EndTime;
    }
    setStaffId = (staffId) => {
        this.PreInsertObj.StaffId = staffId;
    }
    setDescription = (Description) => {
        this.PreInsertObj.Description = Description;
    }
    setSkillId = (skillId) => {
        this.PreInsertObj.SKillId = skillId;
    }
    //-----------------------


    onEventRendered = (args) => {
        console.log(this.props.skillSrc);
        let skillColor = this.SkillColors[this.props.skillSrc.findIndex(skill => skill.id == args.data.SkillId)];
        console.log(skillColor);
        args.element.style.border = "2px solid #4e4f73";
        args.element.style.backgroundColor = skillColor;
        args.element.style.borderRadius = "4px";
        // args.element.style.padding = "4px";
        args.element.style.height = "62px";
        args.element.style.color = "#4e4f73";
        // args.element.style.fontsize = "0.875rem";
    }

    eventTemplate = (props) => {
        console.log(props);
        return (<div style={{ padding: 4, width: "100%" }}>
            <Grid container direction="column" spacing={1}>
                <Grid item >
                    <Typography style={{ color: "#4e4f73" }} variant="subtitle1">
                        {`${props.Skill} `}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography style={{ color: "#4e4f73" }} variant="subtitle2" noWrap={false} className="time">
                        {`${format(new Date(props.StartTime), "HH:mm a")} - ${format(new Date(props.EndTime), "HH:mm a")}`}
                    </Typography>
                </Grid>
            </Grid>

        </div>);
    }

    resourceHeaderTemplate = (props) => {
        console.log(props);
        //this.getTotalHoursPerWeek(props.resourceData.Id);
        return (
            <div className="template-wrap" style={{ height: 72 }}><div className="employee-category">
                <div className="employee-name">
                    <Typography variant="subtitle1">
                        {this.getEmployeeName(props)}</Typography></div>
                <div id={`total-hours-${props.resourceData.Id}`}>{`0 hrs/week`}</div>
            </div></div>
        );
    }

    cellTemplate = (props) => {
        return (<div className="templatewrap" style={{ height: 72 }} ></div>);
        // return (<div></div>);
    }


    editorTemplate = (props) => {
        return ((props !== undefined) ?
            <ShiftEditor parentProps={props}
                setStartTime={this.setStartTime}
                setEndTime={this.setEndTime}
                setStaffId={this.setStaffId}
                setDescription={this.setDescription}
                skillSrc={this.props.skillSrc}
            /> : <div></div>);
    }

    popupClose = (args) => {
        if (args.type === 'Editor' && !isNullOrUndefined(args.data)) {

            //(args.data).Position = "Bartender";

            (args.data).StartTime = this.PreInsertObj.StartTime;
            (args.data).EndTime = this.PreInsertObj.EndTime;
            (args.data).StaffId = this.PreInsertObj.StaffId;

            let descriptionElement = args.element.querySelector('#Description');
            if (descriptionElement) {
                (args.data).Description = descriptionElement.value ? descriptionElement.value : "";
            }
            let skillElement = args.element.querySelector('#Skill');
            if (skillElement) {
                (args.data).SkillId = skillElement.value;
                (args.data).Skill = this.props.skillSrc.find(e => e.id == skillElement.value)?.name;

            }


        }
    }


    triggerComputeSchedule = async () => {
        const data = await triggerCompute(this.props.weekScheduleId);
        if (data == null) {
            this.setState({ openAlertDialog: true });
            return null;
        }
        return data.id;
    }

    checkComputeResult = async (shiftScheduleResultId) => {
        let result = await checkCompute(shiftScheduleResultId);
        return result;
    }

    clearEvent = () => {
        var batch = firebase.firestore().batch();
        console.log(this.refScheduleCurrentCollection);

        this.refScheduleCurrentCollection.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                console.log(doc);
                batch.delete(doc.ref);
            });

            batch.commit();
            // this.getTotalHoursPerWeek();
        });

    }


    // navigatingEvent = (args) => {
    //     console.log(args);
    //     if (args.action === "view") return;

    //     if (!isSameDay(getFirstDayOfWeek(this.currentDate), getFirstDayOfWeek(args.currentDate))) {
    //         this.currentDate = args.currentDate;
    //         console.log('Change Week');
    //         this.unSub();
    //         this.getDataSource();


    //     } else {
    //         //Update Ref Schedule
    //         this.currentDate = args.currentDate;
    //     }

    // }

    onActionBegin = async (args) => {
        console.log(args);
        if (args.requestType == "eventChange") {
            this.refScheduleCurrentCollection.doc(args.changedRecords[0].Id).update(convertShiftToFireBaseObj(args.changedRecords[0]));
            this.updateTotalHoursPersWeek();
        } else if (args.requestType === 'eventCreate' && args.data.length > 0) {

            let eventData = args.data[0];
            let eventField = this.scheduleObj.eventFields;
            let startDate = eventData[eventField.startTime];
            let endDate = eventData[eventField.endTime];

            //if a specific time slot already contains an shift, then no more shift can be added to that cell
            // args.cancel = !this.scheduleObj.isSlotAvailable(new Date(startDate), new Date(endDate));
            console.log(!args.cancel);
            if (!args.cancel) {
                console.log(this.refScheduleCurrentCollection);
                const newShiftRef = this.refScheduleCurrentCollection.doc();
                args.data[0].Id = newShiftRef.id;
                console.log('new shift Id:' + newShiftRef.id);
                const data = convertShiftToFireBaseObj(args.data[0]);

                newShiftRef.set(data);
                this.updateTotalHoursPersWeek();
            }


        } else if (args.requestType == "eventRemove") {
            this.refScheduleCurrentCollection.doc(args.deletedRecords[0].Id).delete();
            this.updateTotalHoursPersWeek();
        }


    }

    computeSchedule = async () => {
        //Load scheduleId
        this.setState({ openWaitingComputeModal: true });
        let shiftScheduleResultId = await this.triggerComputeSchedule();
        if (!shiftScheduleResultId) {
            return;
        }
        this.checkResultInterval = setInterval(async () => {
            let result = await this.checkComputeResult(shiftScheduleResultId);
            if (result)
                if (result.shiftAssignments) {
                    clearInterval(this.checkResultInterval);
                    this.setState({ openWaitingComputeModal: false });
                    if (result.shiftAssignments.length != 0) {

                        console.log("Feasible");

                        result.shiftAssignments.forEach(e => {

                            let Data = {
                                Skill: this.props.skillSrc.find(skill => skill.id == e.skillId).name,
                                SkillId: e.skillId,
                                EndTime: new Date(e.timeEnd),
                                StartTime: new Date(e.timeStart),
                                StaffId: e.username,
                                Description: ""
                            };

                            const newShiftRef = this.refScheduleCurrentCollection.doc();
                            Data.Id = newShiftRef.id;
                            console.log('new shift Id:' + newShiftRef.id);
                            const data = convertShiftToFireBaseObj(Data);
                            console.log(data);
                            newShiftRef.set(data);
                            //this.scheduleObj.addEvent(Data);
                        });

                    } else {
                        console.log("Infeasible");
                        this.setState({ openAlertDialog: true });
                    }
                } {
                console.log("...Waiting");
            }

        }, 5000);

    }



    getEmployeeName(props) {
        return props.resourceData.Name;
    }

    updateTotalHoursPersWeek() {
        var arr = this.scheduleObj.eventSettings.dataSource;
        var employeeDatas = this.state.employeeData;
        if (arr.length != 0) {

            employeeDatas.forEach(
                staff => {
                    let timeWorks = arr.filter(shift => shift.StaffId == staff.Id);
                    console.log(timeWorks);
                    let totalHours = getTotalHoursPerWeek(timeWorks, "StartTime", 'EndTime');
                    staff.TotalHours = totalHours;

                    document.getElementById(`total-hours-${staff.Id}`).textContent = `${totalHours} hrs/week`;
                }
            );
        } else {
            employeeDatas.forEach(
                staff => {
                    document.getElementById(`total-hours-${staff.Id}`).textContent = `${0} hrs/week`;
                }

            );
        }
        // clearInterval(this.getTotalHoursPerWeekInterval);
    }

    publishSchedule = () => {
        let weekScheduleId = this.props.currentSchedule.id;
        this.setState({ disabledButton: true });
        const getScheduleCallback = async (shifts) => {
            await publishSchedule(weekScheduleId, shifts);
            this.setState({ disabledButton: false });
            this.props.refreshSchedule();
        }

        getSchedulesDataFromFirebase(weekScheduleId, this.StoreId, this.BrandId, getScheduleCallback);
    }

    unpublishSchedule = async () => {
        this.setState({ disabledButton: true });
        await unpublishSchedule(this.props.currentSchedule.id);
        this.setState({ disabledButton: false });
        this.props.refreshSchedule();
    }

    renderPublishUnpublishButton = () => {
        switch (this.props.currentSchedule?.status) {
            case weekScheduleStatus.PUBLISHED:
                return (
                    <Button variant="outlined" color="primary" disabled={this.state.disabledButton}
                        onClick={() => { this.unpublishSchedule() }}>unpublish</Button>
                )
            case weekScheduleStatus.UNPUBLISHED:
                return (
                    <Button variant="outlined" color="primary" onClick={() => { this.publishSchedule() }}
                        disabled={this.state.disabledButton}>publish</Button>
                );
        }
    }

    render() {
        return (
            <Paper style={{ width: "100%" }}>
                <CardHeader title="Schedule" action={
                    <Grid container justify="flex-end" spacing={1} direction="row">
                        <Grid item >
                            <Button variant="contained" color="primary" onClick={this.clearEvent}>Clear schedule</Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="primary" onClick={this.computeSchedule}>Compute schedule</Button>
                        </Grid>
                        <Grid item>
                            {this.renderPublishUnpublishButton()}
                        </Grid>
                    </Grid>
                } />
                <Divider />
                <Grid container style={{ height: 40, }}
                    direction="row"

                    wrap="nowrap"
                    justify="center"

                    alignContent="center"
                >

                    {this.props.skillSrc ? this.props.skillSrc.map((skill, index) => {

                        return (<Grid item container alignContent="center" alignItems="baseline"
                            justify="center" key={skill.id}>
                            <Grid item >
                                <Box style={{ backgroundColor: this.SkillColors[index], borderRadius: 50, height: 12, width: 12, marginRight: 10 }}></Box>
                            </Grid>
                            <Grid item>
                                {skill.name}
                            </Grid>
                        </Grid>);
                    }) : null}
                </Grid>

                {this.props.skillSrc && this.state.employeeData ?
                    (<ScheduleComponent

                        height="69vh"
                        currentView="TimelineWeek" selectedDate={this.currentDate}
                        eventSettings={{
                            fields: {
                                subject: { name: "Skill" },
                            }
                        }}
                        rowAutoHeight={true}
                        cellTemplate={this.cellTemplate}
                        ref={schedule => this.scheduleObj = schedule}
                        firstDayOfWeek={1}
                        group={{ resources: ['Staff'] }}
                        showQuickInfo={false}
                        editorTemplate={this.editorTemplate}
                        eventRendered={this.onEventRendered}
                        popupClose={this.popupClose}
                        // navigating={this.navigatingEvent}
                        actionBegin={this.onActionBegin}
                        resourceHeaderTemplate={this.resourceHeaderTemplate}
                        minDate={new Date(this.props.dateStart)}
                        maxDate={addDays((new Date(this.props.dateStart)), 6)}
                    >

                        <ResourcesDirective>
                            <ResourceDirective field="StaffId"
                                title="Staff name"
                                name="Staff"
                                allowMultiple={true}
                                idField="Id"
                                textField="Name"

                                colorField="Color"
                                dataSource={this.state.employeeData} >
                            </ResourceDirective>
                        </ResourcesDirective>
                        <ViewsDirective>
                            {/* <ViewDirective option='Day' eventTemplate={this.eventTemplate}/>
                            <ViewDirective option='Week' eventTemplate={this.eventTemplate}/> */}
                            <ViewDirective option='TimelineDay' eventTemplate={this.eventTemplate} />
                            <ViewDirective option='TimelineWeek' eventTemplate={this.eventTemplate} timeScale={{ enable: false }} />
                        </ViewsDirective>
                        <Inject services={[Day, TimelineViews, Week, TimelineMonth, DragAndDrop]} />
                        {/* <Inject services={[Day, Week, WorkWeek, Month, TimelineViews, TimelineMonth]} /> */}
                    </ScheduleComponent>)
                    :
                    "Loading..."
                }
                <Modal
                    disablePortal
                    disableEnforceFocus
                    disableAutoFocus
                    open={this.state.openWaitingComputeModal}
                    aria-labelledby="server-modal-title"
                    aria-describedby="server-modal-description"
                    className={this.props.classes.modal}
                    container={() => this.rootRef.current}
                >
                    <Card className={this.props.classes.modalContent}>
                        <CardHeader title="Auto build" />
                        <Divider />
                        <CardContent>
                            <LinearProgress />
                        </CardContent>
                    </Card>
                </Modal>
                <AlertDialog open={this.state.openAlertDialog} handleClose={this.handleCloseAlertDialog} />
            </Paper>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        currentSchedule: state.schedule.currentSchedule,
        skillSrc: state.schedule.skillSrc,
    }
}

export default connect(
    mapStateToProps,
    {
        getScheduleDataInput
    }
)(withStyles(styles)(ScheduleMain));
