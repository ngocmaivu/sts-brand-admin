import React, { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { connect } from 'react-redux';
import { Button, createStyles, Dialog, DialogContent, TableCell, DialogContentText, DialogTitle, DialogActions, InputAdornment, TextField, withStyles, Paper, Card, Grid, TableContainer, Table, TableHead, TableRow, TableBody, IconButton, Collapse, Typography, FormControl, FormLabel } from '@material-ui/core';

import MuiAlert from '@material-ui/lab/Alert';
import { Delete, Edit, ImageSearch, ImageSearchTwoTone, SearchTwoTone, ViewAgenda, ViewStreamOutlined, VisibilityOutlined } from '@material-ui/icons';
import { Skeleton } from '@material-ui/lab';
import { DateRangePicker, DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';
import { TimeKeepingRow } from './TimeKeepingRow';
import { loadSkills } from "../../_services";
import { ShiftUserTable } from './ShiftUserTable';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const styles = (Theme) => createStyles({
    root: {
        '& .header-table': {
            backgroundColor: 'rgba(255, 7, 0, 0.55)',
        },
    },

    button: {
        minWidth: 46,
        fontSize: '1em',
        padding: 0,
        marginRight: 5,
        '&:hover': {
            boxShadow: 'none',
        },
    },
    deleteButton: {
        color: "#FA0000",
        borderColor: '#fa000080',
    },
    searchButton: {
        borderColor: Theme.palette.primary.main,
        borderWidth: 1,
        color: Theme.palette.primary.main,
        backgroundColor: Theme.palette.common.white,
        fontWeight: 500,
        height: '2.7em',
        // padding: '10px 30px',
        textAlign: 'center',
        '&:hover': {
            color: "#FFFFFF",
            backgroundColor: Theme.palette.primary.main,
            // borderColor: '#FFFFFF',
            boxShadow: 'none',
        },

    },
    searchInput: {
        height: '3em',
        width: '40%',
        '& input': {
            padding: '13px 10px',
        }
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        // width: '100%',
        marginBottom: '0.5em',
        padding: '5px 12px'
    },
    container: {
        padding: 20
    },
    theadCell: {
        color: "#fff"
    }
});

const dataSrc = [
    {
        username: "lycuong99",
        firstName: "Ly",
        lastName: "Cuong",
        attendances: [
            {
                shiftAssignmentId: 1,
                timeCheckIn: "2021-07-13T08:04:34",
                timeCheckOut: "2021-07-13T17:04:34",
                shiftAssignment: {
                    id: 1,
                    timeStart: "2021-07-13T08:00:34",
                    timeEnd: "2021-07-13T17:00:34",
                    skillId: 18,
                }
            },
            {
                shiftAssignmentId: 2,
                timeCheckIn: "2021-07-14T08:00:34",
                timeCheckOut: "2021-07-14T16:59:34",
                shiftAssignment: {
                    id: 2,
                    timeStart: "2021-07-14T08:00:34",
                    timeEnd: "2021-07-13T17:00:34",
                    skillId: 18,
                }
            },
            {
                shiftAssignmentId: 3,
                timeCheckIn: "2021-07-15T08:00:34",
                timeCheckOut: "2021-07-15T17:10:34",
                shiftAssignment: {
                    id: 3,
                    timeStart: "2021-07-15T08:00:34",
                    timeEnd: "2021-07-15T17:00:34",
                    skillId: 18,
                }
            },
            {
                shiftAssignmentId: 4,
                timeCheckIn: null,
                timeCheckOut: null,
                shiftAssignment: {
                    id: 5,
                    timeStart: "2021-07-15T08:00:34",
                    timeEnd: "2021-07-15T17:00:34",
                    skillId: 18,
                }
            },
            {
                shiftAssignmentId: 5,
                timeCheckIn: "2021-07-16T08:00:34",
                timeCheckOut: "2021-07-16T16:59:34",
                shiftAssignment: {
                    id: 5,
                    timeStart: "2021-07-16T08:00:34",
                    timeEnd: "2021-07-16T17:00:34",
                    skillId: 18,
                }
            }
        ]
    },
    {
        username: "dpDao",
        firstName: "Pham",
        lastName: "Dao",
        attendances: [
            {
                shiftAssignmentId: 1,
                timeCheckIn: "2021-07-13T08:04:34",
                timeCheckOut: "2021-07-13T17:04:34",
                shiftAssignment: {
                    id: 1,
                    timeStart: "2021-07-13T08:00:34",
                    timeEnd: "2021-07-13T17:00:34",
                    skillId: 18,
                }
            },
            {
                shiftAssignmentId: 2,
                timeCheckIn: "2021-07-14T08:00:34",
                timeCheckOut: "2021-07-14T16:59:34",
                shiftAssignment: {
                    id: 2,
                    timeStart: "2021-07-14T08:00:34",
                    timeEnd: "2021-07-13T17:00:34",
                    skillId: 18,
                }
            },
            {
                shiftAssignmentId: 3,
                timeCheckIn: "2021-07-15T08:00:34",
                timeCheckOut: "2021-07-15T17:10:34",
                shiftAssignment: {
                    id: 3,
                    timeStart: "2021-07-15T08:00:34",
                    timeEnd: "2021-07-15T17:00:34",
                    skillId: 18,
                }
            },
            {
                shiftAssignmentId: 4,
                timeCheckIn: null,
                timeCheckOut: null,
                shiftAssignment: {
                    id: 4,
                    timeStart: "2021-07-15T08:00:34",
                    timeEnd: "2021-07-15T17:00:34",
                    skillId: 18,
                }
            },
            {
                shiftAssignmentId: 5,
                timeCheckIn: "2021-07-16T17:00:34",
                timeCheckOut: "2021-07-16T22:59:34",
                shiftAssignment: {
                    id: 5,
                    timeStart: "2021-07-16T08:00:34",
                    timeEnd: "2021-07-16T17:00:34",
                    skillId: 18,
                }
            }
        ]
    }
]

class StoreTimekeeping extends React.Component {


    state = {
        searchValue: '', openDeleteDialog: false, deleteUserId: null, openAttendanceDialog: false,
        pageSize: 10, rowCount: 0, pageIndex: 1, open: true, setOpen: false,
        selectedDate: '2014-08-18T21:11:54', selectedUser: null,
    };
    constructor(props) {
        super(props);
        this.dataSrc = dataSrc;
    }
    initData = async () => {
        var skills = await loadSkills();

        this.setState({
            skillSrc: skills,
        });
    }
    componentDidMount = async () => {
        await this.initData();
    }
    renderToolbar = () => {
        return (
            <div className={this.props.classes.toolbar}>
                <TextField style={{ height: '40px', width: '600px' }} placeholder="search" size='small' variant="outlined"
                />
                {/* <SearchOutlinedIcon style={{marginLeft: '-350px', color: '#50A625'}} /> */}
                <Button style={{ marginLeft: '-350px', color: '#009966' }}> <SearchTwoTone fontSize='small' /></Button>
                {/* <Button variant="outlined" className={this.props.classes.searchButton} component={Link}
                    to="/StoreTimekeeping/new"> <AddIcon />Add Store</Button> */}
            </div>
        );
    }
    renderRows = () => {
        return this.dataSrc.map((user, index) => {

            return (
                <TimeKeepingRow user={user} skillSrc={this.state.skillSrc} index={index} onRowClick={() => {
                    this.handleRowClick(user);
                }} />);
        });
    };

    handleRowClick = (user) => {
        this.setState({ selectedUser: user, openAttendanceDialog: true });

    }
    renderAttandanceDialog = () => {

        const handleClose = () => { this.setState({ openAttendanceDialog: false }); };

        return (
            <Dialog
                onClose={handleClose}
                fullWidth={true}
                maxWidth="lg"
                open={this.state.openAttendanceDialog}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    <Typography variant="h3">{`Scheduled Hours - ${this.state?.selectedUser?.firstName} ${this.state?.selectedUser?.lastName}`}</Typography>
                </DialogTitle>
                <DialogContent dividers>
                    {
                        this.state.selectedUser ? (
                            <ShiftUserTable user={this.state.selectedUser} skillSrc={this.state.skillSrc} />
                        ) : "No Content"
                    }

                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>);
    }
    render() {

        const { classes } = this.props;

        return (
            <React.Fragment>
                <Card style={{ padding: '10px', marginBottom: '15px' }} elevation={0}>
                    <div> <h1>Timekeeping</h1> {this.renderToolbar()}</div>
                    <FormControl>
                        <FormLabel>Select Date</FormLabel>
                        <DateRangePickerComponent />
                    </FormControl>
                </Card>
                <Paper className={this.props.classes.container} elevation={0}>
                    <div style={{ height: 480, width: '100%' }}>
                        {false ? (

                            <Grid container spacing={2} direction="column" style={{ padding: 20 }}>
                                <Grid item xs>
                                    <Skeleton animation="wave" variant="rect" height="175" />
                                </Grid>
                                <Grid item xs>
                                    <Skeleton animation="wave" variant="rect" height="120" />
                                </Grid>
                                <Grid item xs>
                                    <Skeleton animation="wave" variant="rect" height="70px" />
                                </Grid>
                                <Grid item xs>
                                    <Skeleton animation="wave" variant="rect" height="40px" />
                                </Grid>
                                <Grid item xs>
                                    <Skeleton animation="wave" variant="rect" height="20px" />
                                </Grid>
                            </Grid>

                        ) :
                            <TableContainer>
                                <Table aria-label="simple table" >
                                    <TableHead style={{ backgroundColor: "#111936" }}>
                                        <TableRow>
                                            <TableCell align="left" variant="head"  >
                                                <Typography variant="h4" className={classes.theadCell}>#</Typography>
                                            </TableCell>
                                            <TableCell align="left" variant="head" style={{ color: "#fff" }} >
                                                <Typography variant="h4" className={classes.theadCell}>Username</Typography>
                                            </TableCell>
                                            <TableCell align="left" variant="head" style={{ color: "#fff" }}>
                                                <Typography variant="h4" className={classes.theadCell}>
                                                    Fullname</Typography></TableCell>
                                            <TableCell align="center"><Typography variant="h4" className={classes.theadCell}>
                                                Total Hours</Typography></TableCell>
                                            <TableCell align="center"><Typography className={classes.theadCell} variant="h4">Total Shift</Typography></TableCell>
                                            <TableCell align="center"><Typography className={classes.theadCell} variant="h4">Attendance</Typography></TableCell>


                                        </TableRow>
                                    </TableHead>
                                    {

                                        <TableBody>
                                            {
                                                this.renderRows()
                                            }
                                        </TableBody>

                                    }

                                </Table>
                            </TableContainer>}

                    </div>

                    {this.renderAttandanceDialog()}
                </Paper>
            </React.Fragment>


        );


    }
}
function mapState(state) {
    // const { StoreTimekeeping, deleting } = state;
    return {};
}

export default connect(mapState, {
    // getAllByPage: storeActions.getAllByPage,
    // deleteStore: storeActions.delete

})(withStyles(styles, { withTheme: true })(StoreTimekeeping));

// } from "@syncfusion/ej2-react-schedule";
// import { extend, isNullOrUndefined, L10n } from '@syncfusion/ej2-base';

// import { Card, CardHeader, Grid, Paper, Button } from '@material-ui/core';
// // import { ShiftEditor } from './ShiftEditor';
// import firebase from "../../firebase";
// import { getFirstDayOfWeek, isSameDay, convertShift, convertShiftToFireBaseObj } from "../../ultis/scheduleHandle";
// import scheduleData from './scheduleData.json';


// L10n.load({
//     'en-US': {
//         'schedule': {
//             'saveButton': 'Add',
//             'cancelButton': 'Close',
//             'deleteButton': 'Remove',
//             'newEvent': 'New Shift',
//             'editEvent': "Edit Shift"
//         }
//     }
// });

// class StoreTimekeeping extends React.Component {
//     constructor() {
//         super(...arguments);

//         // this.employeeData = [
//         //     { Name: 'Alice', Id: 1, GroupId: 1, Color: '#bbdc00',},
//         //     { Name: 'Nancy', Id: 2, GroupId: 2, Color: '#9e5fff', },
//         //     { Name: 'Robert', Id: 3, GroupId: 1, Color: '#bb0c00',  },
//         //     { Name: 'Robson', Id: 4, GroupId: 2, Color: '#9e5fff',  },
//         //     { Name: 'Laura', Id: 5, GroupId: 1, Color: '#bbdc00', },
//         //     { Name: 'Margaret', Id: 6, GroupId: 2, Color: '#9e5fff', }
//         // ];



//         this.PreInsertObj = {
//             StartTime: null,
//             EndTime: null,
//             SkillName: null,
//             SKillId: null,
//             StaffId: null,
//             Description: null
//         };

//         const user = JSON.parse(localStorage.getItem("jwt_decode"));
//         this.BrandId = user.brandId;
//         this.StoreId = user.storeId;

//         this.currentDate = new Date();
//         const ref = firebase.firestore().collection("brands");

//         //Check Brand-Store on firebase
//         ref.doc(`${this.BrandId}-${this.StoreId}`).get().then((doc) => {
//             if (!doc.exists) {
//                 //Set doc
//                 const data = {
//                     BrandId: this.BrandId,
//                     StoreId: this.StoreId,
//                 };
//                 ref.doc(`${this.BrandId}-${this.StoreId}`)
//                     .set(data)
//                     .then(() => {
//                         console.log("Document successfully written!");
//                     })
//                     .catch((error) => {
//                         console.error("Error writing document: ", error);
//                     });

//                 //set sub collection
//                 var startDate = getFirstDayOfWeek(this.currentDate);
//                 startDate.setHours(0, 0, 0);
//                 console.log("NEW SCHEDULE");
//                 ref.doc(`${this.BrandId}-${this.StoreId}`).collection("schedules").add({
//                     StartDate: startDate
//                 }).then((docRef) => {
//                     console.log("Document successfully written!");
//                     this.refScheduleCurrentCollection = docRef.collection("shifts");
//                 }).catch((error) => {
//                     console.error("Error writing document: ", error);
//                 });

//             }

//             //Check Week Schedule
//             //ref.doc(`${this.BrandId}-${this.StoreId}`).collection("schedules").get

//         }).catch((error) => {
//             console.log("Error getting document:", error);
//         });



//     }

//     state = {
//         skillDataSrc: null,
//         employeeData: null
//     }
//     loadData = async () => {

//         var skills = await loadSkills();
//         if (skills != null) {
//             this.setState({
//                 skillDataSrc: skills
//             })
//             console.log(skills);
//         }
//         var staffs = await getStaffs();
//         // staffs = staffs.map(staff => ({ Name: `${staff.firstName} ${staff.lastName}`, Id: staff.username, }))

//         this.setState({
//             employeeData: staffs
//         })

//     }


//     componentDidMount = async () => {

//         await this.loadData();
//         if (this.state.skillDataSrc && this.state.employeeData) {
//             this.getDataSource();
//         }


//     }

//     componentWillUnmount = () => {
//         if (this.unSub)
//             this.unSub();

//     }


//     getDataSource = async () => {
//         const ref = firebase.firestore().collection("brands");
//         let unSub = null;
//         //Get datasource
//         await ref.doc(`${this.BrandId}-${this.StoreId}`).collection("schedules").get().then((snapshot) => {
//             let isExistWeekSchedule = false;
//             snapshot.forEach((doc) => {
//                 let schedule = doc.data();
//                 console.log("UPdate");
//                 if (isSameDay(schedule.StartDate.toDate(), getFirstDayOfWeek(this.currentDate))) {
//                     isExistWeekSchedule = true;
//                     //get
//                     console.log("UPdate");
//                     this.refScheduleCurrentCollection = ref.doc(`${this.BrandId}-${this.StoreId}`)
//                         .collection("schedules")
//                         .doc(doc.id)
//                         .collection("shifts");

//                     this.unSub = ref.doc(`${this.BrandId}-${this.StoreId}`)
//                         .collection("schedules")
//                         .doc(doc.id)
//                         .collection("shifts")
//                         .onSnapshot((querySnapshot) => {
//                             //Get DataSource
//                             console.log(querySnapshot.docs);
//                             //  let src = [];
//                             if (!querySnapshot.docs.exists) {
//                                 console.log("Not Exist");

//                             }
//                             let src = querySnapshot.docs.map(shift => {

//                                 let obj = convertShift(shift);
//                                 // console.log(shift);
//                                 return obj;
//                             });


//                             //this.dataSource = src;
//                             // let schObj = document.querySelector('.e-schedule').ej2_instances[0];
//                             if (this.scheduleObj)
//                                 this.scheduleObj.eventSettings.dataSource = src;
//                             //schObj.eventSettings.dataSource = src;

//                         });
//                     //  console.log(doc.collection("shifts"));
//                 }
//             });

//             if (!isExistWeekSchedule) {
//                 let startDate = getFirstDayOfWeek(this.currentDate);
//                 startDate.setHours(0, 0, 0);
//                 ref.doc(`${this.BrandId}-${this.StoreId}`).collection("schedules").add({
//                     StartDate: startDate
//                 }).then((docRef) => {
//                     this.refScheduleCurrentCollection = docRef.collection("shifts");
//                     this.unSub = docRef.collection("shifts")
//                         .onSnapshot((querySnapshot) => {
//                             let src = querySnapshot.docs.map(shift => {
//                                 let obj = convertShift(shift);
//                                 console.log(shift);
//                                 return obj;
//                             });

//                             //this.dataSource = src;
//                             // let schObj = document.querySelector('.e-schedule').ej2_instances[0];
//                             // schObj.eventSettings.dataSource = src;
//                             this.scheduleObj.eventSettings.dataSource = src;
//                         });
//                 });

//                 // this.refScheduleCurrentCollection = tmpRef.collection("shifts");

//             }
//         });
//     }

//     unSubDataSource = () => {
//         this.unSub();
//     }
//     //----------------

//     setStartTime = (StartTime) => {
//         this.PreInsertObj.StartTime = StartTime;
//     }
//     setEndTime = (EndTime) => {
//         this.PreInsertObj.EndTime = EndTime;
//     }
//     setStaffId = (staffId) => {
//         this.PreInsertObj.StaffId = staffId;
//     }
//     setDescription = (Description) => {
//         this.PreInsertObj.Description = Description;
//     }
//     setSkillId = (skillId) => {
//         this.PreInsertObj.SKillId = skillId;
//     }
//     //-----------------------



//     // editorTemplate = (props) => {
//     //     return ((props !== undefined) ?
//     //         <ShiftEditor parentProps={props}
//     //             setStartTime={this.setStartTime}
//     //             setEndTime={this.setEndTime}
//     //             setStaffId={this.setStaffId}
//     //             setDescription={this.setDescription}
//     //             skillDataSrc={this.state.skillDataSrc}
//     //         /> : <div></div>);
//     // }

//     popupClose = (args) => {
//         if (args.type === 'Editor' && !isNullOrUndefined(args.data)) {

//             //(args.data).Position = "Bartender";

//             (args.data).StartTime = this.PreInsertObj.StartTime;
//             (args.data).EndTime = this.PreInsertObj.EndTime;
//             (args.data).StaffId = this.PreInsertObj.StaffId;

//             let descriptionElement = args.element.querySelector('#Description');
//             if (descriptionElement) {
//                 (args.data).Description = descriptionElement.value ? descriptionElement.value : "";
//             }
//             let skillElement = args.element.querySelector('#Skill');
//             if (skillElement) {
//                 (args.data).SkillId = skillElement.value;
//                 (args.data).Skill = this.state.skillDataSrc.find(e => e.id == skillElement.value).name;

//             }
//             console.log(this.scheduleObj.eventSettings.dataSource);

//         }
//     }
//     // addEvent = async () => {

//     //     const WeekSchedule = await getWeekSchedule(getFirstDayOfWeek(this.currentDate));
//     //     let wId = WeekSchedule.id;
//     //     console.log("ID:" + wId)
//     //     // const datas = await computeSchedule(wId);
//     //     console.log(datas);
//     //     //const datas = scheduleData;
//     //     if (datas && datas.shiftAssignments && datas.shiftAssignments.length != 0)
//     //         datas.shiftAssignments.forEach(e => {
//     //             let Data = {
//     //                 Skill: this.state.skillDataSrc.find(skill => skill.id = e.skillId).name,
//     //                 SkillId: e.skillId,
//     //                 EndTime: new Date(e.timeEnd),
//     //                 StartTime: new Date(e.timeStart),
//     //                 StaffId: e.username,
//     //                 Description: ""
//     //             };

//     //             const newShiftRef = this.refScheduleCurrentCollection.doc();
//     //             Data.Id = newShiftRef.id;
//     //             console.log('new shift Id:' + newShiftRef.id);
//     //             const data = convertShiftToFireBaseObj(Data);
//     //             console.log(data);
//     //             newShiftRef.set(data);
//     //             //this.scheduleObj.addEvent(Data);
//     //         })


//     //     //console.log(this.scheduleObj);
//     // }


//     navigatingEvent = (args) => {
//         console.log(args);
//         if (args.action === "view") return;

//         if (!isSameDay(getFirstDayOfWeek(this.currentDate), getFirstDayOfWeek(args.currentDate))) {
//             this.currentDate = args.currentDate;
//             console.log('Change Week');
//             this.unSub();
//             this.getDataSource();
//         } else {
//             //Update Ref Schedule
//             this.currentDate = args.currentDate;
//         }

//     }

//     onActionBegin = async (args) => {
//         console.log(args);
//         if (args.requestType == "eventChange") {
//             this.refScheduleCurrentCollection.doc(args.changedRecords[0].Id).update(convertShiftToFireBaseObj(args.changedRecords[0]));
//         } else if (args.requestType === 'eventCreate' && args.data.length > 0) {

//             //if a specific time slot already contains an shift, then no more shift can be added to that cell
//             let eventData = args.data[0];
//             let eventField = this.scheduleObj.eventFields;
//             let startDate = eventData[eventField.startTime];
//             let endDate = eventData[eventField.endTime];
//             args.cancel = !this.scheduleObj.isSlotAvailable(startDate, endDate);

//             console.log(args.cancel);

//             if (!args.cancel) {
//                 const newShiftRef = this.refScheduleCurrentCollection.doc();
//                 args.data[0].Id = newShiftRef.id;
//                 console.log('new shift Id:' + newShiftRef.id);
//                 const data = convertShiftToFireBaseObj(args.data[0]);
//                 console.log(data);
//                 newShiftRef.set(data);
//             }


//         } else if (args.requestType == "eventRemove") {
//             this.refScheduleCurrentCollection.doc(args.deletedRecords[0].Id).delete();
//         }
//     }

//     computeSchedule = () => {
//         //Load scheduleId
//         this.addEvent();
//     }
//     render() {
//         return (
//             <Paper style={{ minHeight: "80vh" }}>
//                 <CardHeader title="Timekeeping" action={
//                     <Grid container justify="flex-end" spacing={1} direction="row">
//                         {/* <Grid item >
//                             <Button variant="contained" color="primary" onClick={this.computeSchedule}>Compute schedule</Button>
//                         </Grid> */}
//                         {/* <Grid item>
//                             <Button variant="outlined" color="primary">Pushlish</Button>
//                         </Grid> */}
//                     </Grid>
//                 } />
//                 {this.state.skillDataSrc && this.state.employeeData ?
//                     (<ScheduleComponent currentView="TimelineWeek" selectedDate={this.currentDate}
//                         eventSettings={{
//                             fields: {
//                                 subject: { name: "Skill" },
//                             }
//                         }}

//                         ref={schedule => this.scheduleObj = schedule}
//                         firstDayOfWeek={1}
//                         group={{ resources: ['Staff'] }}
//                         showQuickInfo={false}
//                         // editorTemplate={this.editorTemplate}
//                         popupClose={this.popupClose}
//                         navigating={this.navigatingEvent}
//                         actionBegin={this.onActionBegin}
//                     >

//                         <ResourcesDirective>
//                             <ResourceDirective field="StaffId"
//                                 title="Staff name"
//                                 name="Staff"
//                                 allowMultiple={true}
//                                 idField="Id"
//                                 textField="Name"
//                                 colorField="Color"
//                                 dataSource={this.state.employeeData} >
//                             </ResourceDirective>
//                         </ResourcesDirective>
//                         <ViewsDirective>
//                             <ViewDirective option='Day' />
//                             <ViewDirective option='Week' />
//                             <ViewDirective option='TimelineDay' startHour="7" />
//                             <ViewDirective option='TimelineWeek' timeScale={{ enable: false }} />
//                         </ViewsDirective>
//                         <Inject services={[Day, TimelineViews, Week, TimelineMonth, Resize, DragAndDrop]} />
//                         {/* <Inject services={[Day, Week, WorkWeek, Month, TimelineViews, TimelineMonth]} /> */}
//                     </ScheduleComponent>)
//                     :
//                     "Loading..."
//                 }

//             </Paper>
//         );
//     }
// }

// export default StoreTimekeeping;
