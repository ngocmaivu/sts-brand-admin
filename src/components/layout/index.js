import React from "react";
import clsx from "clsx";
import { Link, NavLink, useLocation } from "react-router-dom";
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
import { Button, Chip, Drawer, Icon, useMediaQuery } from "@material-ui/core";
import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined';
import EventNoteOutlined from '@material-ui/icons/EventNoteOutlined';
import ProfileIcon from "@material-ui/icons/Person";
import jwt_decode from "jwt-decode";
// import Logout from "../auth/Logout";
import ProfileSection from "./ProfileSection";
import { CalendarTodayOutlined, SettingsOutlined, FiberManualRecord, Home, NotificationsNoneOutlined, Settings, Store } from "@material-ui/icons";
import NavItem from "./NavItem";
import NavCollapse from "./NavCollapse";


const drawerWidth = 240;
const appBarHeight = '4.5em';
const user = JSON.parse(localStorage.getItem("jwt_decode"))
const useStyles = makeStyles((theme) => ({
  root: {
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

    padding: 10,
    backgroundColor: '#e3f2fd',
    padding: theme.spacing(2),
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
var webName = "STS Store Manager"
const INIT_DATA = {
  items: [
  ]
};
if (user === null) {
  INIT_DATA.items.push(
    {
      id: 'store',
      title: 'Store',
      type: 'item',
      url: '/stores',
      icon: <Store />
    },
    {
      id: 'staffs',
      title: 'Staff',
      type: 'item',
      url: '/staffs',
      icon: <GroupOutlinedIcon />
    },
    {
      id: 'schedule',
      title: 'Schedule',
      url: '/schedule',
      type: 'item',
      icon: <EventNoteOutlined />
    },
    {
      id: 'timekeeping',
      title: 'Timekeeping',
      url: '/timekeeping',
      type: 'item',
      icon: <CalendarTodayOutlined />
    },
    {
      id: 'profile',
      title: 'Profile',
      type: 'item',
      url: "/profile",
      icon: <ProfileIcon />
    })
} else {
  if (user.role === "brand manager") webName = "STS Brand Manager"
  if (user.role === "brand manager") INIT_DATA.items.push(
    {
      id: 'brandhome',
      title: 'Home',
      type: 'item',
      url: '/brandhome',
      icon: <Home />
    },
    {
      id: 'store',
      title: 'Stores',
      type: 'item',
      url: '/stores',
      icon: <Store />
    },
    {
      id: 'staffs',
      title: 'Staffs',
      type: 'item',
      url: '/staffs',
      icon: <GroupOutlinedIcon />
    },
    {
      id: 'timekeeping',
      title: 'Timekeeping',
      url: '/timekeeping',
      type: 'item',
      icon: <CalendarTodayOutlined />
    },
    {
      id: 'brandskills',
      title: 'Setting Brand Skill',
      url: '/settingSkill',
      type: 'item',
      icon: <Settings />
    },
    {
      id: 'profile',
      title: 'Profile',
      type: 'item',
      url: "/profile",
      icon: <ProfileIcon />
    })
  else if (user.role === "store manager") INIT_DATA.items.push(
    {
      id: 'home',
      title: 'Home',
      type: 'item',
      url: '/storehome',
      icon: <Home />
    },
    {
      id: 'schedule',
      title: 'Schedule',
      url: '/schedule',
      type: 'collapse',
      icon: <EventNoteOutlined />,
      children: [
        // {
        //   type: 'item',
        //   id: 'view',
        //   title: 'View',
        //   url: '/schedule/view',
        //   icon: <FiberManualRecord style={{ width: 6, height: 6 }} />,
        // },
        {
          type: 'item',
          id: 'available',
          title: 'Register',
          url: '/schedule/available',
          icon: <FiberManualRecord style={{ width: 6, height: 6 }} />,
        },
        {
          type: 'item',
          id: 'unpublish',
          title: 'Plan',
          url: '/schedule/plans/unpublished',
          icon: <FiberManualRecord style={{ width: 6, height: 6 }} />,
        },
        {
          type: 'item',
          id: 'publish',
          title: 'Published',
          url: '/schedule/plans/published',
          icon: <FiberManualRecord style={{ width: 6, height: 6 }} />,
        },
        // {
        //   type: 'item',
        //   id: 'setting',
        //   title: 'Setting',
        //   url: '/schedule/setting',
        //   icon: <FiberManualRecord style={{ width: 6, height: 6 }} />,
        // },

      ]
    },
    {
      id: 'timekeeping',
      title: 'Timekeeping',
      url: '/storeTimekeeping',
      type: 'collapse',
      icon: <CalendarTodayOutlined />,
      children: [
        {
          type: 'item',
          id: 'attandance',
          title: 'Attandance',
          url: '/storeTimekeeping/attandance',
          icon: <FiberManualRecord style={{ width: 6, height: 6 }} />,
        },
        {
          type: 'item',
          id: 'work-hours',
          title: 'Shift',
          url: '/storeTimekeeping/shift',
          icon: <FiberManualRecord style={{ width: 6, height: 6 }} />,
        },
      ]
    },
    {
      id: 'staffs',
      title: 'Staff',
      type: 'item',
      url: '/staffs',
      icon: <GroupOutlinedIcon />
    },
    {
      type: 'collapse',
      id: 'notify',
      title: 'Notification',
      url: '/notify/1',
      icon: <NotificationsNoneOutlined />,
      children: [
        {
          type: 'item',
          id: 'request',
          title: 'Request',
          url: '/notify/request',
          icon: <FiberManualRecord style={{ width: 6, height: 6 }} />,
        },
        {
          type: 'item',
          id: 'activity',
          title: 'Activity',
          url: '/notify/activity',
          icon: <FiberManualRecord style={{ width: 6, height: 6 }} />,
        }
      ]
    },
    {
      id: 'configure',
      title: 'Configure',
      url: '/configure',
      type: 'collapse',
      icon: <SettingsOutlined />,
      children: [
        {
          type: 'item',
          id: 'store-info',
          title: 'Store Info',
          url: '/configure/store-info',
          icon: <FiberManualRecord style={{ width: 6, height: 6 }} />,
        },
        {
          type: 'item',
          id: 'work-hours',
          title: 'Schedule config',
          url: '/configure/schedule',
          icon: <FiberManualRecord style={{ width: 6, height: 6 }} />,
        },
      ]
    },
    {
      id: 'profile',
      title: 'Profile',
      type: 'item',
      url: "/profile",
      icon: <ProfileIcon />
    }
  )
}

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



  const menus = INIT_DATA.items.map((item) => {
    switch (item.type) {
      case 'collapse':
        return (<NavCollapse key={item.id} item={item} level={1} />)
      case 'item':
        return (<NavItem key={item.id} item={item} level={1} />);
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={1}
        className={openSideBar ? classes.appBarWidth : classes.appBar}
        color="primary"
      >
        <Toolbar style={{ height: '100%' }}>
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
            {webName}
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
          {menus}
        </List>


        <Divider />
        <Button component={Link} to="/login">Logout</Button>
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
