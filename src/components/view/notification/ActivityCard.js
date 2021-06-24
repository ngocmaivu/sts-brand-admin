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


export function ActivityCard() {

    const classes = useStyles();

    return (
        <Box className={classes.cardContainer}>
            <Grid item container direction="row" justify="space-between">
                <Grid item container  xs={4} md={6} lg={8}>
                    <Grid item md={2} lg={1}>
                        <Avatar />
                    </Grid>
                    <Grid item container   xs={6} md={8} direction="column" >
                        <Grid item md={8}>
                            <Typography variant="subtitle1" component="p">
                                Cuong Ly
                             </Typography>
                            <Typography variant="body1" component="p">
                                accept swap shift
                             </Typography>
                        </Grid>

                    </Grid>

                </Grid>
                <Grid item>
                    <Typography variant="subtitle2">
                        Dec 06, 2019, 00:06 AM
                            </Typography>
                </Grid>
            </Grid>
        </Box>
    );
}