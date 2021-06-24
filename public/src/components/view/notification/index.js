import { Button, Card, CardContent, CardHeader, Chip, Divider, FormControl, FormLabel, Grid, Input, InputBase, makeStyles, MenuItem, OutlinedInput, Paper, Select, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography, useTheme } from '@material-ui/core';
import React from 'react';
import { CardCustom } from '../../CardCustom';
import _ from 'lodash';
import { RequestCard } from './RequestCard';
import { ActivityCard } from './ActivityCard';
import { CloseOutlined, CalendarTodayOutlined, QueryBuilderOutlined, Timeline } from '@material-ui/icons';



const useStyles = makeStyles((theme) => ({
    container: {
        height: '100%'
    },
    containerContent: {
        padding: "20px 20px"
    },
    input: {

    },
    rejectBtn: {
        backgroundColor: theme.palette.error.main,
        color: theme.palette.common.white,
        "&:hover": {
            backgroundColor: theme.palette.error.dark,
        }
    },
    approveBtn: {
        backgroundColor: theme.palette.success.main,
        color: theme.palette.common.white,
        "&:hover": {
            backgroundColor: theme.palette.success.dark,
        }

    },
}));


export default function RequestPage() {

    const classes = useStyles();
    const [openRightContent, setOpenRightContent] = React.useState(false);
    const theme = useTheme();
    return (
        <Paper className={classes.container}>
            <CardHeader title={
                <Typography variant="h2">
                    Request
                </Typography>
            } disableTypography={false}
            />
            <Divider />
            <CardContent className={classes.containerContent}>
                <Grid container spacing={2} direction="row" >
                    <Grid item container spacing={2} zeroMinWidth style={{ flexBasis: 0, flexGrow: 1, padding: 20 }}>
                        <RequestCard onClick={() => { setOpenRightContent(true) }} />
                        <RequestCard />
                        <RequestCard />
                        <ActivityCard />
                    </Grid>

                    {
                        openRightContent === true ? <Grid item  >
                            <Card style={{ width: 540 }} elevation={0}>
                                <CardHeader title={<Typography variant="h3"> Time-Off Request</Typography>}
                                    action={<Button onClick={() => { setOpenRightContent(false) }}><CloseOutlined /></Button>} disableTypography={false}>

                                </CardHeader>
                                <Divider />
                                <CardContent>
                                    <Typography variant="subtitle1">Cuong ly want to have time off
                                    </Typography>
                                    <Typography variant="body1">
                                      10 May 2021 2:00 pm To 10 May 2021 4:00 pm </Typography>
                                      <Typography variant="body1">
                                      Hey Iam lazy</Typography>
                                    <TextField
                                        placeholder="Leave a comment..."
                                        variant="outlined"
                                        multiline
                                        rows={4}

                                        style={{ width: "100%" }}
                                    />
                                    <Grid container style={{ width: "100%", marginTop: 20 }} justify="flex-end" spacing={1} direction="row">
                                        <Grid item xs={12}>
                                            <Button style={{ width: "100%" }} variant="contained" className={classes.approveBtn}>Approve</Button>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button style={{ width: "100%" }} variant="outlined" className={classes.rejectBtn}>Reject</Button>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid> : null
                    }
                </Grid>

            </CardContent>
        </Paper >
    );
}