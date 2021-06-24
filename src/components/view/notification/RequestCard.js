import React from 'react';
import { Avatar, Box, Button, Grid, makeStyles, Paper, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    approveBtn: {
        backgroundColor: theme.palette.success.main,
        color: theme.palette.common.white,
        "&:hover": {
            backgroundColor: theme.palette.success.dark,
        }

    },
    rejectBtn: {
        backgroundColor: theme.palette.error.main,
        color: theme.palette.common.white,
        "&:hover": {
            backgroundColor: theme.palette.error.dark,
        }
    },
    cardContainer: {
        borderBottom: `${theme.palette.grey[300]} 1px solid`,
        // borderColor: ,
        padding: "20px",
        width: '100%',
        backgroundColor: theme.palette.background.paper
    }
}));


export function RequestCard({onClick}) {

    const classes = useStyles();

    return (
        <Box className={classes.cardContainer} onClick={onClick}>
            <Grid item container direction="row" justify="space-between" >
                <Grid item container xs={4} md={6} lg={8}>
                    <Grid item   md={2} lg={1}>
                        <Avatar />
                    </Grid>
                    <Grid item container  direction="column"  style={{flexGrow:1, flexBasis:0, maxWidth: 200}}>
                        <Grid item>
                            <Typography variant="subtitle1">
                                Name
                    </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle2">
                                Dec 06, 2019, 00:06 AM
                    </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={6} zeroMinWidth >
                        <Typography variant="body2">
                            Time-Off Request
                    </Typography>
                    </Grid>
                </Grid>
                <Grid item container xs={4} style={{ width: 200 }} justify="flex-end" spacing={1} direction="row">
                    <Grid item  >
                        <Button variant="contained" className={classes.approveBtn}>Approve</Button>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" className={classes.rejectBtn}>Reject</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}