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

import FileAttribute from "./FileAttribute";


class FileMenu extends Component {
    state = {
        right: false,
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

        const rightList = (
            <>
                <FileAttribute classes={classes}/>
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
            <div>
                <Button variant="contained" size="small" color="primary" onClick={this.toggleDrawer('right', true)}
                        style={{float: "right", margin: 8}}>
                    Open Actions
                </Button>

                <Drawer anchor="right" open={this.state.right} onClose={this.toggleDrawer('right', false)}>
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer('right', false)}
                        onKeyDown={this.toggleDrawer('right', false)}
                    >
                        {sideList}
                    </div>
                </Drawer>
            </div>
        );
    }
}

export default FileMenu;
