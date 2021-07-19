import { ListItem, ListItemText, List, makeStyles, Popover, CardHeader, CardContent, Card, Typography, IconButton } from "@material-ui/core";

import MoreVertIcon from '@material-ui/icons/MoreVert';
import React from 'react';
import { levels, getLevelLable } from "../../../_constants/levelData";

const useStyles = makeStyles((theme) => ({
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
        height: "100%",
    },
    root: {
        //  flexGrow: 1,
        //  backgroundColor: theme.palette.background.div,
        // display: 'flex',
        height: "100%",
        padding: 10
        //  border: "none"
    },
    cardSkillDemand: {
        border: "1px solid #E3F2FD",
        // backgroundColor: "#E3F2FD",

        "&:hover": {
            border: "1px solid #2196F3"
        }
    }

}));

const timeToString = (index) => `${index < 10 ? '0' : ''}${Math.floor(index)}:${(index * 2) % 2 === 0 ? '00' : '30'}`;

function DemandCard({ start, end, quantity, level, onDelete, onEdit, demandId, skillId }) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (<Card className={classes.cardSkillDemand} elevation={0} >
        <CardHeader disableTypography={false}
            title={<Typography variant="h5" style={{ color: "#2196F3" }}>{`${timeToString(start)} - ${timeToString(end)}`}</Typography>}
            action={<IconButton onClick={handleClick}><MoreVertIcon fontSize="small" /></IconButton>} />
        <CardContent style={{ padding: 10 }}>
            <Typography variant="h6" style={{ color: "#2196F3" }}>{`${quantity} ${getLevelLable(level)} or Higher`}</Typography>
        </CardContent>

        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        >
            <List>
                <ListItem button onClick={() => { console.log(skillId); onEdit({ start, end, quantity, level, demandId, skillId }); }}>
                    <ListItemText primary="Edit" />
                </ListItem>
                <ListItem button onClick={() => { console.log(skillId); onDelete(demandId, skillId); }}>
                    <ListItemText primary="Delete" />
                </ListItem>
            </List>
        </Popover>
    </Card >);
}

export default DemandCard;