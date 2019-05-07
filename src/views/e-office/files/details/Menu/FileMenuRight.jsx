import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from "@material-ui/core/Icon";

const drawerWidth = 240;

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
    content: {
    //     flexGrow: 1,
    //     padding: theme.spacing.unit * 3,
    },
});

class FileMenuRight extends React.Component {
    state = {
        open: false,
    };

    componentDidMount() {
        let open = localStorage.getItem("open_right_drawer");
        this.setState({open: JSON.parse(open)})
    }

    toogleDrawer = () => {
        this.setState(
            state => {
                localStorage.setItem("open_right_drawer", !state.open);
                return {open: !state.open}
            });
    };

    render() {
        const {classes, menus} = this.props;

        return (
            <>
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
                    <div className={classes.toolbar}>
                        <IconButton onClick={this.toogleDrawer}>
                            {!this.state.open ? <MenuIcon/> : <ChevronRightIcon/>}
                        </IconButton>
                    </div>
                    <Divider/>
                    <List>
                        {menus.create ? menus.create.map((item) => (
                            <>
                                <ListItem button key={item.name} onClick={() => this.props.click(item.url)}>
                                    <ListItemIcon><Icon>{item.icon ? item.icon : 'edit'}</Icon></ListItemIcon>
                                    <ListItemText primary={item.name}/>
                                </ListItem>
                            </>
                        )) : null}
                    </List>
                    <Divider/>
                    <List>
                        {menus.action ? menus.action.map((item) => (
                            <>
                                <ListItem button key={item.name} onClick={() => this.props.click(item.url)}>
                                    <ListItemIcon><Icon>{item.icon ? item.icon : 'send'}</Icon></ListItemIcon>
                                    <ListItemText primary={item.name}/>
                                </ListItem>
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

FileMenuRight.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(FileMenuRight);