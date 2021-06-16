import { Card, CardContent, Chip, ClickAwayListener, Divider, Fade, Grid, List, ListItem, ListItemIcon, ListItemText, makeStyles, Paper, Popper } from '@material-ui/core';
import { AccountCircle, ExitToApp, Translate } from '@material-ui/icons';
import Typography from "@material-ui/core/Typography";
import React from 'react';


const useStyles = makeStyles((theme) => ({
    navContainer: {
        width: '100%',
        maxWidth: '350px',
        minWidth: '300px',
        backgroundColor: theme.palette.background.paper,
        borderRadius: '10px',
        [theme.breakpoints.down('sm')]: {
            minWidth: '100%'
        }
    },
    headerAvtar: {
        cursor: 'pointer',
        ...theme.typography.mediumAvatar,
        color: theme.palette.primary.main,
        margin: '8px 0 8px 8px !important',

        '&:hover': {
            background: theme.palette.primary,

        }
    },
    profileChip: {
        height: '43px',
        alignItems: 'center',
        borderRadius: '27px',
        transition: 'all .2s ease-in-out',
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.primary,
        color: theme.palette.primary.main,
        '&:hover': {
            borderColor: theme.palette.primary.main,
            background: theme.palette.primary.main + '!important',
            color: '#fff',
            '& svg': {
                stroke: theme.palette.primary.light,
                color: '#fff',
            }
        }
    },
    profileLabel: {
        lineHeight: 0,
        padding: '12px'
    },
    listItem: {
        marginTop: '5px'
    },
    paper: {
        position: 'relative',
        top: 15
    },
    cardContent: {
        padding: '16px !important'
    },
    card: {
        backgroundColor: theme.palette.primary.light,
        marginBottom: '16px',
        marginTop: '16px'
    },
    searchControl: {
        width: '100%',
        paddingRight: '8px',
        paddingLeft: '16px',
        marginBottom: '16px',
        marginTop: '16px'
    },
    startAdornment: {
        fontSize: '1rem',
        color: theme.palette.grey[500]
    },
    flex: {
        display: 'flex'
    },
    name: {
        marginLeft: '2px',
        fontWeight: 400
    },
    ScrollHeight: {
        height: '100%',
        maxHeight: 'calc(100vh - 250px)',
        overflowX: 'hidden'
    },
    badgeyellow: {
        backgroundColor: theme.palette.warning.dark,
        color: '#fff'
    }
}));

const ProfileSection = () => {
    const classes = useStyles();
    const anchorRef = React.useRef(null);
    const [open, setOpen] = React.useState(false);
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <React.Fragment>
            <Chip icon={<AccountCircle
                ref={anchorRef}
                className={classes.headerAvtar} />}
                className={classes.profileChip}
                variant="outlined"
                ref={anchorRef}
                onClick={handleToggle}
                //User Name get lên hiện ở đây Hello Vu Thi Ngoc Mai
                label={<Typography >Hello Vu Thi Ngoc Mai</Typography>} />
            <Popper
                placement="bottom-end"
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 14]
                            }
                        }
                    ]
                }}
            >
                {({ TransitionProps, placement }) => (
                    <Fade {...TransitionProps}>
                        <Paper className={classes.paper} elevation={0}>
                            <ClickAwayListener onClickAway={handleClose}>
                                <Card >
                                    <CardContent className={classes.cardContent}>
                                        <List component="nav" className={classes.navContainer}>
                                            <ListItem
                                                className={classes.listItem}
                                                button
                                            >
                                                <ListItemIcon>
                                                    <ExitToApp stroke={1.5} size="1.3rem" />
                                                </ListItemIcon>
                                                <ListItemText primary={<Typography variant="body2">Profile</Typography>} />
                                            </ListItem>
                                            <ListItem
                                                className={classes.listItem}
                                                button
                                            >
                                                <ListItemIcon>
                                                    <ExitToApp stroke={1.5} size="1.3rem" />
                                                </ListItemIcon>
                                                <ListItemText primary={<Typography variant="body2">Logout</Typography>} />
                                            </ListItem>
                                        </List>

                                    </CardContent>
                                </Card>
                            </ClickAwayListener>
                        </Paper>
                    </Fade>
                )}
            </Popper>
        </React.Fragment>
    );
};

export default ProfileSection;
