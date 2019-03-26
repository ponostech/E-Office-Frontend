import React, {Component} from "react";
import {withStyles} from '@material-ui/core/styles';

import FileActions from "./Actions/FileActions";
import LeftDrawer from "./Drawers/LeftDrawer";
import RightDrawer from "./Drawers/RightDrawer";

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
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
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

    toggleDrawer = (side, open) => {
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

        return (
            <div style={{flex: 1}}>
                <FileActions drawer={this.toggleDrawer} classes={classes}/>
                <LeftDrawer open={this.state.left}
                            drawer={this.toggleDrawer}
                            draftChange={this.handleDraftTabChange}
                            applicationChange={this.handleApplicationTabChange}
                            classes={classes}
                            applicationTabValue={applicationTabValue}
                            draftTabValue={draftTabValue}/>
                <RightDrawer drawer={this.toggleDrawer} open={this.state.right} classes={classes} />
            </div>
        );
    }
}

export default withStyles(styles)(FileMenu);
