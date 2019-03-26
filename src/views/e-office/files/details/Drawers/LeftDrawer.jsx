import React from 'react';
import {Drawer, Tab, Tabs} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Divider from "@material-ui/core/Divider";
import DraftList from "../../draft/DraftList";
import NotesheetList from "../../notesheet/NotesheetList";
import FileMovementList from "../../movements/FileMovement";


const leftDrawer = (props) => {
    const leftList = (
        <>
            <Tabs
                variant="scrollable"
                value={props.applicationTabValuevalue}
                fullWidth={true}
                style={{background: "white", paddingTop: 20}}
                indicatorColor={"primary"}
                textColor={"primary"}
                onChange={props.applicationChange.bind(this)}>
                <Tab value={"application"}
                     classes={{labelContainer: props.classes.tabLabelContainer}} label={"Applications"}/>
                <Tab value={"proposal"}
                     classes={{labelContainer: props.classes.tabLabelContainer}}
                     label={"Proposals"}/>
                <Tab value={"report"}
                     classes={{labelContainer: props.classes.tabLabelContainer}}
                     label={"Reports"}/>
            </Tabs>
            <div>
                {props.applicationTabValue === "application" && <DraftList/>}
                {props.applicationTabValue === "proposal" && <NotesheetList/>}
                {props.applicationTabValue === "report" && <FileMovementList/>}
            </div>
            <Divider/>
            <Tabs
                variant="scrollable"
                value={props.draftTabValue}
                fullWidth={true}
                style={{background: "white", paddingTop: 20}}
                indicatorColor={"primary"}
                textColor={"primary"}
                onChange={props.draftChange.bind(this)}>
                <Tab classes={{labelContainer: props.classes.tabLabelContainer}} value={"draft"} label={"Draft"}/>
                <Tab classes={{labelContainer: props.classes.tabLabelContainer}} value={"notesheet"} label={"NoteSheet"}/>
                <Tab classes={{labelContainer: props.classes.tabLabelContainer}} value={"movement"} label={"Movement"}/>
            </Tabs>
            <div>
                {props.draftTabValue === "draft" && <DraftList/>}
                {props.draftTabValue === "notesheet" && <NotesheetList/>}
                {props.draftTabValue === "movement" && <FileMovementList/>}
            </div>
        </>
    );
    return (
        <Drawer
            className={props.classes.drawer}
            variant="persistent"
            anchor="left"
            open={props.open}
            classes={{
                paper: props.classes.drawerPaper,
            }}
        >
            <div className={props.classes.drawerLeftHeader}>
                <IconButton onClick={() => props.drawer('left', false)}>
                    <ChevronLeftIcon/>
                </IconButton>
            </div>
            <Divider/>
            {leftList}
        </Drawer>
    );
};

export default leftDrawer;