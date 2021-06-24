import React from 'react';
import './schedule.css';

import {
    ScheduleComponent, Inject, Day, Week, WorkWeek, Month, EventSettingsModel,
    TimelineViews, TimelineMonth, ViewsDirective, ViewDirective, Resize, DragAndDrop, ResourcesDirective, ResourceDirective
} from "@syncfusion/ej2-react-schedule";
import { extend, L10n } from '@syncfusion/ej2-base';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { Card, CardHeader, CardContent, Divider, Grid, Select, InputLabel, FormControl, MenuItem, FormLabel, Paper, TextField } from '@material-ui/core';



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

    localData = {
        dataSource: [
            {
                Id: 1,
                Position: 'Explosion of Betelgeuse Star',
                EndTime: new Date(2021, 5, 20, 12, 0),
                StartTime: new Date(2021, 5, 20, 7, 0),
                StaffId: 1
            },
            {
                Id: 2,
                Position: 'Explosion of Betelgeuse Star',
                StartTime: new Date(2021, 5, 20, 12, 0),
                EndTime: new Date(2021, 5, 20, 18, 0),
                StaffId: 2
            },
            {
                Id: 3,
                Position: 'New',
                StartTime: new Date(2021, 5, 20, 10, 0),
                EndTime: new Date(2021, 5, 20, 16, 0),
                StaffId: 3
            },
        ],
        fields: {
            subject: { name: "Position" }
        }
    };

    employeeData = [
        { Name: 'Alice', Id: 1, GroupId: 1, Color: '#bbdc00', Designation: 'Content writer' },
        { Name: 'Nancy', Id: 2, GroupId: 2, Color: '#9e5fff', Designation: 'Designer' },
        { Name: 'Robert', Id: 3, GroupId: 1, Color: '#bb0c00', Designation: 'Software Engineer' },
        { Name: 'Robson', Id: 4, GroupId: 2, Color: '#9e5fff', Designation: 'Support Engineer' },
        { Name: 'Laura', Id: 5, GroupId: 1, Color: '#bbdc00', Designation: 'Human Resource' },
        { Name: 'Margaret', Id: 6, GroupId: 2, Color: '#9e5fff', Designation: 'Content Analyst' }
    ];

    editorTemplate = (props) => {
        
        return ((props !== undefined) ? <div>
            <Divider />
            <CardContent>
                <Grid container>
                    <Grid item>
                        <FormControl >
                            <FormLabel >Skill</FormLabel>
                            <Select variant="outlined"
                            >
                                <MenuItem value={0}>Bartender</MenuItem>
                                <MenuItem value={1}>Waiter</MenuItem>
                                <MenuItem value={2}>Cashier</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item container>
                        <Grid item>
                            <FormControl >
                                <FormLabel >Form</FormLabel>
                                <TextField />
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <FormControl >
                                <FormLabel >To</FormLabel>
                                <TextField />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <FormControl >
                            <FormLabel >Skill</FormLabel>
                            <TextField
                                        placeholder="Leave a comment..."
                                        variant="outlined"
                                        multiline
                                        rows={4}

                                        style={{ width: "100%" }}
                                    />
                        </FormControl>
                    </Grid>
                </Grid>
            </CardContent>
        </div> : <div></div>);
    }

    render() {
        console.log(this.localData.dataSource);
        return (
            
            <Paper >
                <ScheduleComponent currentView="TimelineMonth" selectedDate={new Date(2021, 5, 20)}
                    eventSettings={this.localData}
                    firstDayOfWeek={1}
                    group={{ resources: ['Staff'] }}
                    showQuickInfo={false}
                    editorTemplate={this.editorTemplate}
                >
                    <ResourcesDirective>
                        <ResourceDirective field="StaffId" title="Staff name" name="Staff" allowMultiple={true} idField="Id" textField="Name" colorField="Color" dataSource={this.employeeData}>
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
