import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles, Drawer, List, Divider, ListItem, ListItemIcon, ListItemText, Icon} from '@material-ui/core';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const drawerWidth = 220;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9 + 1,
    },
    left: 0,
    backgroundColor: 'white',
    color: "gray",
    boxShadow: "none",
    borderRight: "1px solid rgba(0, 0, 0, 0.12)",
    top: 66
  },
  appBarShift: {
    display: "none",
    marginRight: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  // drawer: {
  //     width: drawerWidth,
  //     flexShrink: 0,
  //     whiteSpace: 'nowrap',
  // },
  drawerOpen: {
    // width: drawerWidth,
    //     transition: theme.transitions.create('width', {
    //         easing: theme.transitions.easing.sharp,
    //         duration: theme.transitions.duration.enteringScreen,
    //     }),
    top: 66
  },
  drawerClose: {
    //     transition: theme.transitions.create('width', {
    //         easing: theme.transitions.easing.sharp,
    //         duration: theme.transitions.duration.leavingScreen,
    //     }),
    //     overflowX: 'hidden',
    //     width: theme.spacing.unit * 7 + 1,
    //     [theme.breakpoints.up('sm')]: {
    //         width: theme.spacing.unit * 9 + 1,
    //     },
    top: 66
  },
  toolbar: {
    //     display: 'flex',
    //     alignItems: 'center',
    //     justifyContent: 'flex-end',
    //     padding: '0 8px',
    //     ...theme.mixins.toolbar,
  },
  menuIcon: {
    padding: 0,
    margin: 0,
  },
  menuName: {
    fontSize: 14
  },
  content: {
    //     flexGrow: 1,
    //     padding: theme.spacing.unit * 3,
  },
  listHead: {
    paddingLeft: 16
  }
});

class FileMenuRight extends React.Component {
  state = {
    open: false,
  };

  componentDidMount() {
    let open = localStorage.getItem("open_right_drawer");
    this.setState({open: JSON.parse(open)})
  }

  render() {
    const {classes, menus} = this.props;

    return (
        <Drawer
            anchor="right"
            variant="permanent"
            className={classNames(classes.drawer, {
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open,
            })}
            classes={{
              paper: classNames({
                [classes.drawerOpen]: this.state.open,
                [classes.drawerClose]: !this.state.open,
              }),
            }}
            open={this.state.open}
        >
          <List className={classes.toolbar + " " + classes.listHead}>
            <ListItemText classes={{primary: classes.menuName}} primary="CREATE"/>
          </List>
          <Divider/>
          <List>
            {menus.create ? menus.create.map((item) => (
                <ListItem button key={item.name} onClick={() => this.props.click(item.url, 'modal', item.name)}>
                  <ListItemIcon
                      classes={{root: classes.menuIcon}}><Icon>{item.icon ? item.icon : 'edit'}</Icon></ListItemIcon>
                  <ListItemText classes={{primary: classes.menuName}} primary={item.name}/>
                </ListItem>
            )) : null}
          </List>
          <Divider/>
          <List className={classes.toolbar + " " + classes.listHead}>
            <ListItemText classes={{primary: classes.menuName}} primary="ACTION"/>
          </List>
          <Divider/>
          <List>
            {menus.action ? menus.action.map((item) => (
                <ListItem button key={item.name} onClick={() => this.props.click(item.url, 'modal', item.name)}>
                  <ListItemIcon
                      classes={{root: classes.menuIcon}}><Icon>{item.icon ? item.icon : 'send'}</Icon></ListItemIcon>
                  <ListItemText classes={{primary: classes.menuName}} primary={item.name}/>
                </ListItem>
            )) : null}
          </List>
        </Drawer>
    );
  }
}

FileMenuRight.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(FileMenuRight);