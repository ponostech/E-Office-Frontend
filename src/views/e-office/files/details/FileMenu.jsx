import React, {Component} from "react";
import {Button, Drawer, Icon, Tab, Tabs} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DraftList from "../draft/DraftList";
import NotesheetList from "../notesheet/NotesheetList";
import FileMovement from "../movements/FileMovement";
import {withStyles} from '@material-ui/core/styles';
import FileAttribute from "./FileAttribute";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';


const styles = theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        paddingTop: 6,
        paddingBottom: 6
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
        paddingTop: 6,
        paddingBottom: 6
    },
    icon: {
        verticalAlign: 'bottom',
        height: 20,
        width: 20,
    },
    details: {
        alignItems: 'center',
    },
    column: {
        flexBasis: '20%',
    },
    noPadding: {
        padding: "0!important"
    },
    noTopPadding: {
        paddingTop: "0!important",
        marginTop: "-20px!important"
    },
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
    tabLabelContainer: {
        padding: 0,
        margin: 0
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        justifyContent: 'flex-start',
    },
    drawerLeftHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        justifyContent: 'flex-end',
    }
});

class FileMenu extends Component {
    state = {
        right: false,
        left: false,
        applicationTabValue: 'report',
        draftTabValue: 'draft'
    };

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };

    handleApplicationTabChange = (event, value) => {
        this.setState({applicationTabValue: value})
    };

    handleDraftTabChange = (event, value) => {
        this.setState({draftTabValue: value})
    };

    render() {

        const {applicationTabValue, draftTabValue} = this.state;
        const {classes} = this.props;

        const leftList = (
            <>
                {/*<FileAttribute classes={classes}/>*/}
                <Tabs
                    variant="scrollable"
                    value={this.state.applicationTabValue}
                    fullWidth={true}
                    style={{background: "white", paddingTop: 20}}
                    indicatorColor={"primary"}
                    textColor={"primary"}
                    onChange={this.handleApplicationTabChange.bind(this)}>
                    <Tab value={"application"} value={"application"}
                         classes={{labelContainer: classes.tabLabelContainer}} label={"Applications"}/>
                    <Tab
                        classes={{labelContainer: classes.tabLabelContainer}} value={"proposal"}
                        label={"Proposals"}/>
                    <Tab
                        classes={{labelContainer: classes.tabLabelContainer}} value={"report"}
                        label={"Reports"}/>
                </Tabs>
                <div>
                    {applicationTabValue === "application" && <DraftList/>}
                    {applicationTabValue === "proposal" && <NotesheetList/>}
                    {applicationTabValue === "report" && <FileMovement/>}
                </div>
                <Divider/>
                <Tabs
                    variant="scrollable"
                    value={this.state.draftTabValue}
                    fullWidth={true}
                    style={{background: "white", paddingTop: 20}}
                    indicatorColor={"primary"}
                    textColor={"primary"}
                    onChange={this.handleDraftTabChange.bind(this)}>
                    <Tab classes={{labelContainer: classes.tabLabelContainer}} value={"draft"} label={"Draft"}/>
                    <Tab classes={{labelContainer: classes.tabLabelContainer}} value={"notesheet"} label={"NoteSheet"}/>
                    <Tab classes={{labelContainer: classes.tabLabelContainer}} value={"movement"} label={"Movement"}/>
                </Tabs>
                <div>
                    {draftTabValue === "draft" && <DraftList/>}
                    {draftTabValue === "notesheet" && <NotesheetList/>}
                    {draftTabValue === "movement" && <FileMovement/>}
                </div>
            </>
        );
        const sideList = (
            <div className={classes.list}>
                <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <Icon>inbox</Icon> : <Icon>mail</Icon>}</ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItem>
                    ))}
                </List>
                <Divider/>
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <Icon>inbox</Icon> : <Icon>mail</Icon>}</ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItem>
                    ))}
                </List>
            </div>
        );

        return (
            <div style={{ flex: 1 }}>
                <Button variant="contained" size="small" color="primary" onClick={this.toggleDrawer('left', true)}
                        style={{float: "left", margin: 8}}>
                    Open File Info
                </Button>
                <Button variant="contained" size="small" color="primary" onClick={this.toggleDrawer('right', true)}
                        style={{float: "right", margin: 8}}>
                    Open File Action
                </Button>

                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={this.state.left}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerLeftHeader}>
                        <IconButton onClick={this.toggleDrawer('left', false)}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    {leftList}
                </Drawer>

                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="right"
                    open={this.state.right}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={this.toggleDrawer('right', false)}>
                           <ChevronRightIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    {sideList}
                </Drawer>
            </div>
        );
    }
}

export default withStyles(styles)(FileMenu);
