import React from "react";
import clsx from "clsx";
import { NavLink, useLocation } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ListItem from "@material-ui/core/ListItem";
import { Chip, Drawer, Icon, useMediaQuery } from "@material-ui/core";
import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined';
import EventNoteOutlined from '@material-ui/icons/EventNoteOutlined';
import ProfileIcon from "@material-ui/icons/Person";


import ProfileSection from "./ProfileSection";
import { Store } from "@material-ui/icons";


const drawerWidth = 253;
const appBarHeight = '5em';
const useStyles = makeStyles((theme) => ({
  app: {
    display: "flex"
  },
  grow: {
    flexGrow: 1,
  },
  appBar: {
    height: appBarHeight,
    backgroundColor: theme.palette.background.default,
    boxShadow: '0px 0px 28px 0px rgb(86 61 124 / 13%)',
    // borderBottom: '0.5px'
  },
  appBarWidth: {
    height: appBarHeight,
    transition: theme.transitions.create('width'),
    backgroundColor: theme.palette.background.default,
    boxShadow: '0px 0px 28px 0px rgb(86 61 124 / 13%)'
  },
  menuButton: {
    color: theme.palette.primary.main,
    marginRight: theme.spacing(2)
  },

  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,

  },
  drawerPaper: {
    width: drawerWidth,
    top: appBarHeight,
    zIndex: 0,
    boxShadow: '0px 0px 28px 0px rgb(86 61 124 / 13%)',
    border: 'none',
    paddingLeft: 16,
    paddingRight: 16
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    minHeight: `calc(100vh - ${appBarHeight})`,
    overflow: 'hidden',
    borderRadius: 12,
    marginTop: appBarHeight,
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#e3f2fd',
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    minHeight: `calc(100vh - ${appBarHeight})`,
    marginTop: appBarHeight,
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },

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
  },
}));

const INIT_DATA = {
  items: [
    {
      title: 'Store',
      url: '/stores',
      icon: <Store />
    },
    {
      title: 'Staff',
      url: '/staffs',
      icon: <GroupOutlinedIcon />
    },
    {
      title: 'Profile',
      url: "/profile",
      icon: <ProfileIcon />
    }
  ]
};

export default function MainLayout(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [openSideBar, setOpenSideBar] = React.useState(false);
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));

  const handleDrawerToggle = () => {
    setOpenSideBar(!openSideBar);
  };

  const handleDrawerClose = () => {
    setOpenSideBar(false);
  };

  return (
    <div className={classes.app}>
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={1}
        className={openSideBar ? classes.appBarWidth : classes.appBar}
        color="primary"
      >
        <Toolbar style={{height: '100%'}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            className={clsx(classes.menuButton, openSideBar)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" noWrap color="textPrimary" >
            STS Brand Manager
          </Typography>
          <div className={classes.grow} />
          <div>
            <ProfileSection />

          </div>
        </Toolbar>
      </AppBar>


      <Drawer
        className={classes.drawer}
        elevation={0}
        variant={matchUpMd ? 'persistent' : 'temporary'}
        anchor="left"
        open={openSideBar}
        ModalProps={{ keepMounted: true }}
        classes={{
          paper: classes.drawerPaper
        }}
      >


        <List subheader={
          <Typography variant="caption" className={classes.menuCaption} style={{ marginTop: 10 }} display="block" gutterBottom>
            Dashboard
           </Typography>
        }>
          {INIT_DATA.items.map(({ title, url, icon }) => (
            <ListItem button key={title} className={classes.sidebarItem} component={NavLink} to={url}
              activeStyle={{
                fontWeight: "bold",
                color: "blue",
                backgroundColor: "#ede7f6"
              }}>
              <span><Icon className={classes.sidebarItemIcon}>{icon}</Icon> </span>
              <Typography variant="h5" color="inherit">{title}</Typography>
              {/* <ListItemText primary={text}  className={classes.sidebarItemIconText}/> */}
              {/* link để ở đây nè */}
              {/* <NavLink to={ INIT_DATA.path[index]}
                activeClassName="active"
                key={index} /> */}
            </ListItem>
          ))}
        </List>
        <Divider />
        {/* <Logout /> */}
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: openSideBar,
        })}
      >
        {/* <div className={classes.drawerHeader} /> */}
        {props.children}
      </main>

    </div>
  );
}
