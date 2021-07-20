import React from 'react';
import { withRouter } from "react-router";
import { createStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, CardContent, CardHeader, Chip, Divider, FormControl, FormLabel, Grid, IconButton, Tab, Tabs, Typography } from '@material-ui/core';
import WeekPicker from '../../WeekPicker';
import { format, isSameDay, startOfWeek, } from 'date-fns';
import { getStaffs, getShiftRegisterDatas, getWeekSchedule, } from '../../../_services';
import { getTotalHoursPerWeek } from '../../../ultis/scheduleHandle';
import { Skeleton } from '@material-ui/lab';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
const styles = (Theme) => createStyles({
    container: {
        height: '100%',
        padding: 16
    },
    containerContent: {
        padding: "20px 20px"
    },

});

class WeekPlanManage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            dateStart: startOfWeek(new Date(), {
                weekStartsOn: 1
            }),
            weekScheduleId: null,
            tabIndex: 0,
            
        };
    }

    handleWeekChange = async (date) => {
        if (isSameDay(startOfWeek(date, {
            weekStartsOn: 1
        }), this.state.dateStart)) return;

        this.setState({
            dateStart: startOfWeek(date, {
                weekStartsOn: 1
            })
        });
    }
    getTitleHeader=()=>{
        let status =  this.props.match.params.status;
        if(status)
        {
            if(status == "publish") return "Publish Schedule";
            if(status == "unpublish") return "Unublish Schedule";
        }
    }

    handleChange = (event, newValue) => {
        console.log(event);
        this.setState({ tabIndex: newValue });
    }
    render() {
        return (<div>
            <Paper style={{ padding: 16, marginBottom: 32 }} elevation={0}>  <Typography variant="h2">
                Schedule Plan
            </Typography>
                <FormControl margin="normal" variant="outlined" >
                    <FormLabel >Select Week</FormLabel>
                    <WeekPicker onChange={this.handleWeekChange} value={this.state.dateStart} />
                </FormControl>
            </Paper>

            <Paper className={this.props.classes.container}>
                <CardHeader title={this.getTitleHeader()} titleTypographyProps={{variant: "h3"}} style={{paddingTop:10}} />
                
                {/* <Typography variant="h4">{this.getTitleHeader()} </Typography> */}
                <Divider />
                <CardContent className={this.props.classes.containerContent}>

                    <TableContainer>
                        <Table aria-label="simple table" >
                            <TableHead>
                                <TableRow >
                                    <TableCell align="center">Id</TableCell>
                                    <TableCell align="left" variant="head" >Plan name</TableCell>
                                    <TableCell align="center">Date Create</TableCell>

                                    <TableCell align="center">Last result</TableCell>
                                    <TableCell align="center">Actions</TableCell>
                                    <TableCell align="center">Publish</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody style={{ width: "100%", height: "700px" }}>
                                <TableRow hover>
                                    <TableCell align="center">1</TableCell>
                                    <TableCell align="left" variant="head" >First Schedule</TableCell>

                                    <TableCell align="center">20/10/2022</TableCell>

                                    <TableCell align="center">
                                        <Chip
                                            label="Successfull"
                                            variant="outlined"
                                        /></TableCell>
                                    <TableCell align="center">
                                        {/* <IconButton>
                                            <VisibilityOutlinedIcon />
                                        </IconButton> */}
                                        <IconButton>
                                            <FileCopyOutlinedIcon />
                                        </IconButton>
                                        <IconButton>
                                            <DeleteOutlineOutlinedIcon />
                                        </IconButton>

                                    </TableCell>
                                    <TableCell align="center"><Button>Publish</Button></TableCell>
                                </TableRow>
                                <TableRow hover>
                                    <TableCell align="center">2</TableCell>
                                    <TableCell align="left" variant="head" >Two Schedule</TableCell>

                                    <TableCell align="center">20/10/2022</TableCell>

                                    <TableCell align="center">
                                        <Chip
                                            label="Successfull"
                                            variant="outlined"
                                        /></TableCell>
                                    <TableCell align="center">
                                        {/* <IconButton>
                                            <VisibilityOutlinedIcon />
                                        </IconButton> */}
                                        <IconButton>
                                            <FileCopyOutlinedIcon />
                                        </IconButton>
                                        <IconButton>
                                            <DeleteOutlineOutlinedIcon />
                                        </IconButton>

                                    </TableCell>
                                    <TableCell align="center"><Button>Publish</Button></TableCell>
                                </TableRow>
                            </TableBody>

                        </Table>
                    </TableContainer>
                </CardContent>
            </Paper>
        </div >
        );
    }
}
export default withRouter(withStyles(styles)(WeekPlanManage));