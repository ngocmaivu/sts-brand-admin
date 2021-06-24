import { Collapse, Icon, List, ListItem, ListItemText, makeStyles, Typography } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import React from "react";
import { NavLink } from "react-router-dom";
import NavItem from "./NavItem";

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
    listItem: {
        marginBottom: '8px',
        padding: "10px 16px 10px 20px",
        opacity: 0.8,
        display: 'flex',
        alignItems: 'center',
        height: 52,
        borderRadius: 16,
        '&.Mui-selected':{
            opacity: 1,
        }
    },
    listItemNoBack: {
        marginBottom: '5px',
        backgroundColor: 'transparent !important',
        paddingTop: '8px',
        paddingBottom: '8px',
        alignItems: 'flex-start'
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
    },
    collapseWrapper: {
        position: 'relative',

    }
}));
export default function NavCollapse({ item, level }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [selected, setSelected] = React.useState(null);
    const handleClick = () => {
        setOpen(!open);
        setSelected(!selected ? item.id : null);
    };


    const menus = item.children.map((item) => {
        switch (item.type) {
            case 'collapse':
                return <NavCollapse key={item.id} menu={item} level={level + 1} />;
            case 'item':
                return <NavItem key={item.id} item={item} level={level + 1} />;
            default:
                return (
                    <Typography key={item.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    });

    return (
        <React.Fragment><ListItem button key={item.title} className={level > 1 ? classes.listItemNoBack : classes.listItem} onClick={handleClick}
        selected={selected===item.id}>
            <span><Icon className={classes.sidebarItemIcon}>{item.icon}</Icon> </span>
            <ListItemText>
                <Typography variant="h5" color="inherit">{item.title}</Typography>
            </ListItemText>
            {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding className={classes.collapseWrapper}>
                    {menus}
                </List>
            </Collapse>
        </React.Fragment>);
}