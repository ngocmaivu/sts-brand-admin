import React from 'react';
import './schedule.css';

import {
    ScheduleComponent, Inject, Day, Week,
    TimelineViews, TimelineMonth, ViewsDirective, ViewDirective, Resize, DragAndDrop, ResourcesDirective, ResourceDirective

} from "@syncfusion/ej2-react-schedule";
import { extend, isNullOrUndefined, L10n } from '@syncfusion/ej2-base';

import { Card, CardHeader, Grid, Paper, Button } from '@material-ui/core';
import { ShiftEditor } from './ShiftEditor';
import firebase from "../../../firebase";
import { getFirstDayOfWeek, isSameDay, convertShift, convertShiftToFireBaseObj } from "../../../ultis/scheduleHandle";



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

class ScheduleMain extends React.Component {
    constructor() {
        super(...arguments);

        this.employeeData = [
            { Name: 'Alice', Id: 1, GroupId: 1, Color: '#bbdc00', Designation: 'Content writer' },
            { Name: 'Nancy', Id: 2, GroupId: 2, Color: '#9e5fff', Designation: 'Designer' },
            { Name: 'Robert', Id: 3, GroupId: 1, Color: '#bb0c00', Designation: 'Software Engineer' },
            { Name: 'Robson', Id: 4, GroupId: 2, Color: '#9e5fff', Designation: 'Support Engineer' },
            { Name: 'Laura', Id: 5, GroupId: 1, Color: '#bbdc00', Designation: 'Human Resource' },
            { Name: 'Margaret', Id: 6, GroupId: 2, Color: '#9e5fff', Designation: 'Content Analyst' }
        ];

        this.PreInsertObj = {
            StartTime: null,
            EndTime: null,
            SkillName: null,
            SKillId: null,
            StaffId: null,
            Description: null
        };

        this.skillDataSrc = [
            { id: 0, name: "Bartender" },
            { id: 1, name: "Waiter" },
            { id: 2, name: "Cashier" },
            { id: 3, name: "Security" }
        ];

        this.BrandId = "br1";
        this.StoreId = "st3";
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
                ref.doc(`${this.BrandId}-${this.StoreId}`).collection("schedules").add({
                    StartDate: getFirstDayOfWeek(this.currentDate).setHours(0, 0, 0)
                }).then(() => {
                    console.log("Document successfully written!");
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


    componentDidMount = () => {
        this.getDataSource();
    }
    componentWillUnmount() {
        if (this.unSub)
            this.unSub();
    }


    getDataSource = async () => {
        const ref = firebase.firestore().collection("brands");
        let unSub = null;
        //Get datasource
        await ref.doc(`${this.BrandId}-${this.StoreId}`).collection("schedules").get().then((snapshot) => {
            let isExistWeekSchedule = false;
            snapshot.forEach((doc) => {
                let schedule = doc.data();
                console.log("UPdate");
                if (isSameDay(schedule.StartDate.toDate(), getFirstDayOfWeek(this.currentDate))) {
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
                                console.log(shift);
                                return obj;
                            });


                            //this.dataSource = src;
                            // let schObj = document.querySelector('.e-schedule').ej2_instances[0];
                            this.scheduleObj.eventSettings.dataSource = src;
                            //schObj.eventSettings.dataSource = src;

                        });
                    //  console.log(doc.collection("shifts"));
                }
            });

            if (!isExistWeekSchedule) {
                let startDate = getFirstDayOfWeek(this.currentDate);
                startDate.setHours(0, 0, 0);
                ref.doc(`${this.BrandId}-${this.StoreId}`).collection("schedules").add({
                    StartDate: startDate
                }).then((docRef) => {
                    this.refScheduleCurrentCollection = docRef.collection("shifts");
                    this.unSub = docRef.collection("shifts")
                        .onSnapshot((querySnapshot) => {
                            let src = querySnapshot.docs.map(shift => {
                                let obj = convertShift(shift);
                                console.log(shift);
                                return obj;
                            });

                            //this.dataSource = src;
                            // let schObj = document.querySelector('.e-schedule').ej2_instances[0];
                            // schObj.eventSettings.dataSource = src;
                            this.scheduleObj.eventSettings.dataSource = src;
                        });
                });

                // this.refScheduleCurrentCollection = tmpRef.collection("shifts");

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
                skillDataSrc={this.skillDataSrc}
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
                (args.data).Skill = this.skillDataSrc.find(e => e.id == skillElement.value).name;

            }
            console.log(this.scheduleObj.eventSettings.dataSource);

        }
    }
    addEvent = () => {

        const Data = [{
            Id: 12,
            Skill: 'Cashier',
            SkillId: 1,
            EndTime: new Date(2021, 5, 20, 9, 0),
            StartTime: new Date(2021, 5, 20, 7, 0),
            StaffId: 6
        }];
        this.scheduleObj.addEvent(Data);
        console.log(this.scheduleObj);
    }
    onAction

    navigatingEvent = (args) => {
        console.log(args);
        if (args.action === "view") return;

        if (!isSameDay(getFirstDayOfWeek(this.currentDate), getFirstDayOfWeek(args.currentDate))) {
            this.currentDate = args.currentDate;
            console.log('Change Week');
            this.unSub();
            this.getDataSource();
        } else {
            //Update Ref Schedule
            this.currentDate = args.currentDate;
        }

    }

    onActionBegin = async (args) => {
        console.log(args);
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
    }
    render() {

        return (
            <Paper >

                <CardHeader title="Schedule" action={
                    <Grid container justify="flex-end" spacing={1} direction="row">
                        <Grid item >
                            <Button variant="contained" color="primary">Compute schedule</Button>
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" color="primary">Pushlish</Button>
                        </Grid>
                    </Grid>
                } />

                <ScheduleComponent currentView="TimelineWeek" selectedDate={this.currentDate}
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
                    navigating={this.navigatingEvent}
                    actionBegin={this.onActionBegin}
                >

                    <ResourcesDirective>
                        <ResourceDirective field="StaffId"
                            title="Staff name"
                            name="Staff"
                            allowMultiple={true}
                            idField="Id"
                            textField="Name"
                            colorField="Color"
                            dataSource={this.employeeData} >
                        </ResourceDirective>
                    </ResourcesDirective>
                    <ViewsDirective>
                        <ViewDirective option='Day' />
                        <ViewDirective option='Week' />
                        <ViewDirective option='TimelineDay' startHour="7" />
                        <ViewDirective option='TimelineWeek' timeScale={{ enable: false }} />
                    </ViewsDirective>
                    <Inject services={[Day, TimelineViews, Week, TimelineMonth, Resize, DragAndDrop]} />
                    {/* <Inject services={[Day, Week, WorkWeek, Month, TimelineViews, TimelineMonth]} /> */}
                </ScheduleComponent>
            </Paper>
        );
    }
}

export default ScheduleMain;
