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
            width: theme.spacing.unit * 9 + 1,
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
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
});

class LeftMenu extends React.Component {
    state = {
        open: false,
    };

    componentDidMount() {
        let open = localStorage.getItem("open_drawer");
        this.setState({open: JSON.parse(open)})
    }

    toogleDrawer = () => {
        this.setState({open: !this.state.open});
        localStorage.setItem("open_drawer", this.state.open)
    };

    render() {
        const {classes} = this.props;
        const menuItem = [
            {name: "notesheet", label: "Notesheet", icon: "chat"},
            {name: "draft", label: "Draft", icon: "create"},
            {name: "report", label: "Site Verification", icon: "report"},
            {name: "permit", label: "Draft Permit", icon: "how_to_reg"},
            {name: "reject", label: "Draft Reject Letter", icon: "block"},
            {name: "send", label: "Forward File", icon: "send"},
        ];
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
                        <IconButton onClick={this.toogleDrawer}>
                            {!this.state.open ? <MenuIcon/> : <ChevronLeftIcon/>}
                        </IconButton>
                    </div>
                    <List>
                        {menuItem.map((item) => (
                            <>
                                <ListItem button key={item.name} onClick={() => this.props.click(item.name)}>
                                    <ListItemIcon><Icon>{item.icon}</Icon></ListItemIcon>
                                    <ListItemText primary={item.label}/>
                                </ListItem>
                            </>
                        ))}
                    </List>
                    <Divider/>
                </Drawer>
            </>
        );
    }
}

LeftMenu.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(LeftMenu);