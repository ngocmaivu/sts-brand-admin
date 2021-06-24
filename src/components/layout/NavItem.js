import React from 'react';
import { Icon, ListItem, makeStyles, Typography } from "@material-ui/core";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    sidebarItem: {
        margin: 8,
        padding: "10px 16px 10px 23px",
        opacity: 0.8,
        display: 'flex',
        alignItems: 'center',
        height: 52,
        borderRadius: 16
    },
    sidebarItemIcon: {
        fontSize: 18,
        marginRight: 8,
        width: 20,
        height: 20,

    },
    sidebarItemText: {
        lineHeight: 16
    },
    menuCaption: {
        ...theme.typography.menuCaption
    }, listItem: {
        marginBottom: '8px',
        padding: "10px 16px 10px 20px",
        opacity: 0.8,
        display: 'flex',
        alignItems: 'center',
        height: 52,
        borderRadius: 16
    },
    listItemNoBack: {
        marginBottom: '5px',
        backgroundColor: 'transparent !important',
        paddingTop: '8px',
        paddingLeft: 33,
        paddingBottom: '8px',
        alignItems: 'center',
        borderRadius: 16,

    },
}));
export default function NavItem({ item, level }) {
    const classes = useStyles();
    return (<ListItem button key={item.title} c className={level > 1 ? classes.listItemNoBack : classes.listItem} component={NavLink} to={item.url}
        activeStyle={{
            fontWeight: "bold",
            color: "blue",
            backgroundColor: "#ede7f6"
        }}>
        <span><Icon className={classes.sidebarItemIcon}>{item.icon}</Icon> </span>
        <Typography variant="h5" color="inherit">{item.title}</Typography>
    </ListItem>);
}