import { createStyles, Tab, Tabs, withStyles, Grid, CardHeader, CardContent, Card, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Select, MenuItem, FormControl, FormLabel, TextField, FormHelperText, Paper, FormControlLabel, Box } from '@material-ui/core';
import React from 'react';

import { loadSkills, getWeekScheduleDemand, updateDemand, deleteDemand, createDemand, createDemands } from "../../../_services";
import { addDays, compareAsc, differenceInDays, format } from 'date-fns';
import { levelInit, levels } from "../../../_constants/levelData";
import { convertDemandData, convertDateFromTemplate, convertToJSONDateWithoutChangeValue } from "../../../ultis/scheduleHandle";
import {
    ScheduleComponent, Inject, Day, Week,
    TimelineViews, TimelineMonth, ViewsDirective, ViewDirective, Resize, DragAndDrop, ResourcesDirective, ResourceDirective

} from "@syncfusion/ej2-react-schedule";
import { extend, isNullOrUndefined, L10n } from '@syncfusion/ej2-base';
import DemandEditor from './DemandEditor';
import firebase from "../../../firebase";
import "./demand.css";
import { connect } from 'react-redux';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import GetDemandTemplateDialog from './GetDemandTemplateDialog';
import _ from 'lodash';

const styles = (theme) => createStyles({

    root: {
        //  flexGrow: 1,
        //  backgroundColor: theme.palette.background.div,
        // display: 'flex',
        height: "100%",

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

L10n.load({
    'en-US': {
        'schedule': {
            'saveButton': 'Save',
            'cancelButton': 'Close',
            'deleteButton': 'Remove',
            'newEvent': 'New',
            'editEvent': "Edit"
        }
    }
});

class DemandPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            byDate: false,
            selectedSkillId: -1,
            demandTemplates: null,
            openGetDemandTemplateDialog: false
        }

        this.rootRef = React.createRef(null);

        this.PreInsertObj = {
            workStart: null,
            workEnd: null,
            quantity: null,
            level: null,
            minHour: 0,
            skillId: null,
        };

        const user = JSON.parse(localStorage.getItem("jwt_decode"));
        this.BrandId = user.brandId;
        this.StoreId = user.storeId;
    }

    handleChangeSelectedSkill = (e) => {
        let skillId = e.target.value;
        if (this.state.selectedSkillId !== -1) {
            this.scheduleObj.removeResource(this.state.selectedSkillId, "Skill");
        }
        let resourceData = this.props.skillSrc.find(skill => skill.id == skillId);
        this.scheduleObj.addResource(resourceData, "Skill", 1);

        this.setState({ selectedSkillId: e.target.value });
    }
    loadDemandDatas = async () => {

        var demandDatas = await getWeekScheduleDemand(this.props.weekScheduleId);
        var NotOperatingTime = this.loadOperatingTimes();
        // console.log([...demandDatas, ...NotOperatingTime]);
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
            let minHour = 24;
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

                    if (o.from / 2 < minHour) {
                        minHour = o.from / 2;
                    }

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
            // this.scheduleObj.startHour = minHour;
            this.setState({ minHour: minHour });
        }

        return NotOperatingTime;

    }


    componentDidMount = async () => {
        if (this.props.skillSrc) {
            this.setState({ selectedSkillId: this.props.skillSrc[0].id });
            if (this.scheduleObj) {
                let resource = this.props.skillSrc.find(skill => skill.id == this.props.skillSrc[0].id);
                // this.scheduleObj.addResource(resource, "Skill", 1);
            }
        }
        this.getDemandTemplates();
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
                skillSrc={this.props.skillSrc}
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

    checkValidDate = (newObj) => {
        // get demand have same skill, level, date
        let dataSrc = this.scheduleObj.eventSettings.dataSource.filter(e => {
            let compareDate = new Date(e.workStart);
            let newDate = new Date(newObj.workStart);

            let c1 = compareAsc(new Date(e.workStart), new Date(newObj.workEnd));
            let c2 = compareAsc(new Date(newObj.workStart), new Date(e.workEnd));

            let c3 = true;
            if (newObj.id) {
                c3 = newObj.id !== e.id;
            }

            return e.skillId == newObj.skillId
                && e.level == newObj.level
                && compareDate.getDate() == newDate.getDate()
                && !(c1 >= 0 || c2 >= 0) && c3;
        }

        );
        console.log(dataSrc);
        if (!_.isEmpty(dataSrc)) {

            return false;
        }

        return true;
    }

    onActionBegin = async (args) => {
        if (args.requestType == "eventChange") {

            let updateObj = args.changedRecords[0];
            args.cancel = !this.checkValidDate(updateObj);

            if (!args.cancel) {
                updateObj = convertDemandData(args.changedRecords[0]);
                updateDemand(updateObj);
            }
            console.log(args);

        } else if (args.requestType === 'eventCreate' && args.data.length > 0) {

            let newObj = args.data[0];

            args.cancel = !this.checkValidDate(newObj);


            if (!args.cancel) {
                let newObj1 = convertDemandData(args.data[0]);
                let responseData = await createDemand(
                    newObj1, this.props.weekScheduleId
                );
                console.log(responseData);
                args.data[0].id = responseData[0].id;
                
                console.log(args);
                this.scheduleObj.refreshEvents();
            }


        } else if (args.requestType == "eventRemove") {
            // this.refScheduleCurrentCollection.doc(args.deletedRecords[0].Id).delete();
            // deleteDemand(args.deletedRecords[0].id);
            args.deletedRecords.forEach(demand => {
                deleteDemand(demand.id);
            });
        }

        // this.updateTotalHoursPersWeek();
    }

    cellTemplate = (props) => {
        return (<div className="templatewrap" style={{ paddingTop: 8 }} ></div>);
        // return (<div></div>);
    }

    onEventRendered = (args) => {
        if (args.data.level != -1) {
            let levelColor = levels.find(e => e.value == args.data.level).color;
            args.element.style.backgroundColor = levelColor;
            args.element.style.border = "1px solid #4e4f73";
            args.element.style.borderRadius = "4px";
            // args.element.style.height = 100;
            // args.element.style.margin = "5px";
        } else {
            args.element.style.backgroundColor = "#b9b9b96b";
        }

    }

    eventTemplate = (props) => {

        if (!props.quantity) {
            return (<div style={{ padding: 8, }}>
                <Typography style={{ color: "#4e4f73" }} variant="h4">
                    {`unavailable`}
                </Typography>
            </div>);
        }
        return (<div style={{ padding: 8, }}>
            <Grid container direction="column" spacing={2}>
                <Grid item >
                    <Typography style={{ color: "#4e4f73" }} variant="h4">
                        {`${props.quantity} staff`}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography style={{ color: "#4e4f73" }} variant="h5" noWrap={false} className="time">
                        {`${format(new Date(props.workStart), "HH:mm a")} - ${format(new Date(props.workEnd), "HH:mm a")}`}
                    </Typography>
                </Grid>
                <Grid item >
                    <Typography style={{ color: "#4e4f73" }} variant="h4">
                        {`Level `}&#8805; {`${props.level}`}
                    </Typography>
                </Grid>
            </Grid>

        </div>);
    }

    getDateHeaderText(value) {
        return this.instance.formatDate(value, { skeleton: 'Ed' });
    }
    dateHeaderTemplate = (props) => {
        return (<div>
            <Typography variant="subtitle1" >{format(new Date(props.date), "E d")}</Typography>
        </div>);
    }

    resourceHeaderTemplate = (props) => {
        console.log(props);
        return (
            <div className="template-wrap"> <Typography variant="h4" >{props.resourceData.name}</Typography></div>
        );
    }
    componentWillUnmount() {
        if (this.unSubGetDemandTempates)
            this.unSubGetDemandTempates();
    }

    getDemandTemplates = () => {
        const ref = firebase.firestore().collection("brands");
        this.unSubGetDemandTempates = ref.doc(`${this.BrandId}-${this.StoreId}`).collection("demandTemplates").onSnapshot((snapshot) => {
            console.log(snapshot.empty);
            if (snapshot.empty) {
            } else {
                let tmp = [];
                snapshot.forEach((doc) => {
                    let demandTemplate = doc.data();
                    console.log(demandTemplate);
                    tmp.push(demandTemplate);
                });
                this.setState({ demandTemplates: tmp });
            }
        });
    }

    renderGetDemandTemplateDialog = () => {
        const handleClose = () => {
            this.setState({ openGetDemandTemplateDialog: false });
        }
        return (<GetDemandTemplateDialog
            handleClose={handleClose}
            handleSubmit={this.handleSubmitGetDemandTemplate}
            open={this.state.openGetDemandTemplateDialog}
            demandTemplates={this.state.demandTemplates} />);
    }

    handleSubmitGetDemandTemplate = (templateId) => {
        const ref = firebase.firestore().collection("brands");
        ref.doc(`${this.BrandId}-${this.StoreId}`)
            .collection("demandTemplates")
            .doc(templateId)
            .collection("demands")
            .get().then(async (snapshot) => {

                let src = snapshot.docs.map(e => {
                    return {
                        ...e.data(),
                        id: undefined,
                        workStart: convertDateFromTemplate(e.data().workStart.toDate(), this.props.dateStart),
                        workEnd: convertDateFromTemplate(e.data().workEnd.toDate(), this.props.dateStart),
                        weekScheduleId: this.props.weekScheduleId
                    }
                });

                let filterSrc = src.filter(demand => {
                    return this.checkValidDate(demand);
                });

                if (_.isEmpty(filterSrc)) return;

                filterSrc = filterSrc.map(e => {
                    return {
                        ...e,
                        workStart: convertToJSONDateWithoutChangeValue(e.workStart),
                        workEnd: convertToJSONDateWithoutChangeValue(e.workEnd),
                    }
                });

                let responseData = await createDemands(filterSrc);

                this.loadDemandDatas();


            });
    }



    render() {
        const classes = this.props.classes;

        return (
            <div className={classes.root} >
                {
                    this.props.skillSrc && this.props.skillSrc.length != 0 ? (
                        <Box>
                            <CardHeader title="" action={
                                <Grid container justify="flex-end" alignItems="center" spacing={1} direction="row">
                                    <Grid item>
                                        <Button color="primary" variant="outlined"
                                            onClick={() => { this.setState({ openGetDemandTemplateDialog: true }) }}>
                                            Get from template
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <FormControl >
                                            <FormLabel>Select Skill</FormLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={this.state.selectedSkillId}
                                                label="Select Skill"
                                                variant="outlined"
                                                onChange={this.handleChangeSelectedSkill}
                                            >
                                                {
                                                    this.props.skillSrc.map(skill => {
                                                        return (<MenuItem value={skill.id} key={skill.id}>{skill.name}</MenuItem>);
                                                    })
                                                }
                                            </Select>
                                        </FormControl>
                                        {/* <ToggleButtonGroup
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
                                        </ToggleButtonGroup> */}
                                    </Grid>
                                </Grid>
                            } />

                            <ScheduleComponent
                                resourceHeaderTemplate={this.resourceHeaderTemplate}
                                currentView="Week" selectedDate={this.currentDate}
                                cssClass="schedule-custom"
                                height="70vh"
                                cellTemplate={this.cellTemplate}
                                showTimeIndicator={false}
                                startHour={`${this.state.minHour}:00`}
                                // dateHeaderTemplate={this.dateHeaderTemplate}
                                showHeaderBar={false}
                                eventSettings={{
                                    fields: {
                                        id: 'id',
                                        subject: { name: "quantity" },
                                        startTime: { name: 'workStart' },
                                        endTime: { name: 'workEnd' },

                                    }
                                }}
                                timeScale={{ enable: true, interval: 60, slotCount: 1 }}
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
                                        dataSource={[this.props.skillSrc[0]]}
                                    >
                                    </ResourceDirective>
                                </ResourcesDirective>
                                <ViewsDirective >
                                    <ViewDirective option='Day' eventTemplate={this.eventTemplate} />
                                    <ViewDirective option='Week' eventTemplate={this.eventTemplate} />

                                </ViewsDirective>
                                <Inject services={[Day, Week, DragAndDrop, Resize]} />
                                {/* <Inject services={[Day, Week, WorkWeek, Month, TimelineViews, TimelineMonth]} /> */}
                            </ScheduleComponent>
                        </Box>) : "...Loading"
                }
                {
                    this.state.demandTemplates ?
                        (this.renderGetDemandTemplateDialog()) : null
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



