import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from "@material-ui/core/Icon";
import Tooltip from "@material-ui/core/Tooltip";

const drawerWidth = 228;

const styles = theme => ({
  root: {
    display: 'flex',
    fontSize: '10px'
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
    marginLeft: drawerWidth,
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
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    top: 66
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 7 + 1,
    },
    top: 66
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  menuIcon: {},
  menuName: {
    fontSize: 14,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  "@media print": {
    hide: {
      display: "none",
    },
  },
});

class FileMenuLeft extends React.Component {
  state = {
    open: true,
  };

  componentDidMount() {
    let open = localStorage.getItem("open_drawer");
    if (open) this.setState({open: JSON.parse(open)})
  }

  toggleDrawer = () => {
    this.setState(
        state => {
          localStorage.setItem("open_drawer", !state.open);
          return {open: !state.open}
        });
  };

  render() {
    const {classes, menus} = this.props;
    // console.log("Menus s: ", menus);
    // api_method: "POST", api_url: "file/4/send", icon: "", name: "Send", url: "send"
    return (
        <>
          <Drawer
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
            <div className={classes.toolbar}>
              <span style={{flex: 1, paddingLeft: '10px', color: 'black', fontSize: 15}}>VIEW</span>
              <IconButton onClick={this.toggleDrawer}>
                {!this.state.open ? <MenuIcon/> : <ChevronLeftIcon/>}
              </IconButton>
            </div>
            <Divider/>
            <List>
              {menus.view ? menus.view.map((item) => (
                  <>
                    <Tooltip title={"View " + item.name}>
                      <ListItem button key={item.name} onClick={() => this.props.click(item.url,null,null,item.module)}>
                        <ListItemIcon classes={{root: classes.menuIcon}}>
                          <Icon>{item.icon ? item.icon : 'remove_red_eye'}</Icon>
                        </ListItemIcon>
                        <ListItemText classes={{primary: classes.menuName}} primary={item.name}/>
                      </ListItem>
                    </Tooltip>
                  </>
              )) : null}
            </List>
            <Divider/>
            <br/>
          </Drawer>
        </>
    );
  }
}

FileMenuLeft.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(FileMenuLeft);