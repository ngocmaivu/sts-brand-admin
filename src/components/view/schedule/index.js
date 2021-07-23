import React from 'react';
import './schedule.css';
import { loadSkills, getStaffs, getWeekSchedule, triggerCompute, checkCompute } from "../../../_services";
import {
    ScheduleComponent, Inject, Day, Week,
    TimelineViews, TimelineMonth, ViewsDirective, ViewDirective, Resize, DragAndDrop, ResourcesDirective, ResourceDirective, addDays

} from "@syncfusion/ej2-react-schedule";
import { extend, isNullOrUndefined, L10n } from '@syncfusion/ej2-base';

import { Card, CardHeader, Grid, Paper, Button, withStyles, Modal, createStyles, Divider, CardContent, LinearProgress, Typography } from '@material-ui/core';
import { ShiftEditor } from './ShiftEditor';
import firebase from "../../../firebase";
import { getFirstDayOfWeek, isSameDay, convertShift, convertShiftToFireBaseObj, getTotalHoursPerWeek } from "../../../ultis/scheduleHandle";
import { getScheduleDataInput } from "../../../_actions";
import { connect } from 'react-redux';

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
        }


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
        console.log(staffs);

        this.setState({
            employeeData: staffs
        })

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
                                this.getTotalHoursPerWeek();
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
            // console.log(this.scheduleObj.eventSettings.dataSource);

        }
    }


    triggerComputeSchedule = async () => {
        const WeekSchedule = await getWeekSchedule(getFirstDayOfWeek(this.currentDate));
        let wId = WeekSchedule.id;
        console.log("ID:" + wId)
        const data = await triggerCompute(wId);
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
        //console.log(args);


        if (args.requestType == "eventChange") {
            this.refScheduleCurrentCollection.doc(args.changedRecords[0].Id).update(convertShiftToFireBaseObj(args.changedRecords[0]));
        } else if (args.requestType === 'eventCreate' && args.data.length > 0) {

            //if a specific time slot already contains an shift, then no more shift can be added to that cell
            let eventData = args.data[0];
            let eventField = this.scheduleObj.eventFields;
            let startDate = eventData[eventField.startTime];
            let endDate = eventData[eventField.endTime];
            args.cancel = !this.scheduleObj.isSlotAvailable(startDate, endDate);

            console.log(args.cancel);

            if (!args.cancel) {
                const newShiftRef = this.refScheduleCurrentCollection.doc();
                args.data[0].Id = newShiftRef.id;
                console.log('new shift Id:' + newShiftRef.id);
                const data = convertShiftToFireBaseObj(args.data[0]);
                console.log(data);
                newShiftRef.set(data);
            }


        } else if (args.requestType == "eventRemove") {
            this.refScheduleCurrentCollection.doc(args.deletedRecords[0].Id).delete();
        }

        // this.updateTotalHoursPersWeek();
    }

    computeSchedule = async () => {
        //Load scheduleId
        this.setState({ openWaitingComputeModal: true });
        let shiftScheduleResultId = await this.triggerComputeSchedule();

        let checkResultInterval = setInterval(async () => {
            let result = await this.checkComputeResult(shiftScheduleResultId);
            if (result.shiftAssignments) {
                clearInterval(checkResultInterval);
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
                }
            } {
                console.log("...Waiting");
            }

        }, 5000);

    }

    resourceHeaderTemplate = (props) => {
        console.log(props);
        //this.getTotalHoursPerWeek(props.resourceData.Id);
        return (
            <div className="template-wrap"><div className="employee-category">

                <div className="employee-name">
                    <Typography variant="subtitle1">
                        {this.getEmployeeName(props)}</Typography></div>
                <div id={`total-hours-${props.resourceData.Id}`}>{`0 hrs/week`}</div>
            </div></div>
        );
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
            console.log(employeeDatas);

            //this.updateResourceHeaderTemplate = true;
            //this.setState({ employeeData: employeeDatas });
        } else {
            employeeDatas.forEach(
                staff => {
                    document.getElementById(`total-hours-${staff.Id}`).textContent = `${0} hrs/week`;
                }

            );
        }
    }

    getTotalHoursPerWeek = (trigger) => {

        this.getTotalHoursPerWeekInterval = setInterval(() => {
            console.log("getTotalHoursPerWeek ");

            if (this.scheduleObj) {
                this.updateTotalHoursPersWeek();
                clearInterval(this.getTotalHoursPerWeekInterval);
            }

        }, 1000);


    }

    render() {
        return (
            <Paper style={{ minHeight: "80vh" }}>
                <CardHeader title="Schedule" action={
                    <Grid container justify="flex-end" spacing={1} direction="row">
                        <Grid item >
                            <Button variant="contained" color="primary" onClick={this.clearEvent}>Clear schedule</Button>
                        </Grid>
                        <Grid item >
                            <Button variant="contained" color="primary" onClick={this.computeSchedule}>Compute schedule</Button>
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" color="primary">Pushlish</Button>
                        </Grid>
                    </Grid>
                } />
                {this.props.skillSrc && this.state.employeeData ?
                    (<ScheduleComponent currentView="TimelineWeek" selectedDate={this.currentDate}
                        eventSettings={{
                            fields: {
                                subject: { name: "Skill" },
                            }
                        }}

                        ref={schedule => this.scheduleObj = schedule}
                        firstDayOfWeek={1}
                        group={{ resources: ['Staff'] }}
                        showQuickInfo={false}
                        editorTemplate={this.editorTemplate}
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
                            <ViewDirective option='Day' />
                            <ViewDirective option='Week' />
                            <ViewDirective option='TimelineDay' startHour="7" />
                            <ViewDirective option='TimelineWeek' timeScale={{ enable: false }} />
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
            </Paper>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        currentSchedule: state.schedule.currentSchedule,
        skillSrc: state.schedule.skillSrc
    }
}

export default connect(
    mapStateToProps,
    {
        getScheduleDataInput
    }
)(withStyles(styles)(ScheduleMain));
