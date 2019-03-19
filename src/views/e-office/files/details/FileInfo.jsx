/*
import React, {Component} from "react";
import {Tab, Tabs} from "@material-ui/core";
import DraftList from "../draft/DraftList";
import NotesheetList from "../notesheet/NotesheetList";
import FileMovement from "../movements/FileMovement";

import FileAttribute from "./FileAttribute";

import {withStyles} from '@material-ui/core/styles';
import Divider from "@material-ui/core/Divider";

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
    }
});

class FileInfo extends Component {
    state = {
        applicationTabValue: 'report',
        draftTabValue: 'draft'
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

        return (
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
    }
}

export default withStyles(styles)(FileInfo);*/
