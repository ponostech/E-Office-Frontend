import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import {NavLink, withRouter} from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";

import MenuIcon from "@material-ui/icons/Menu";

// core components
import pagesHeaderStyle from "assets/jss/material-dashboard-pro-react/components/pagesHeaderStyle.jsx";
import {IconButton, Typography} from "@material-ui/core";
import GridContainer from "../Grid/GridContainer";
import Button from "../CustomButtons/Button";

import {OfficeRoutes} from "../../config/routes-constant/OfficeRoutes";
import TopMenu from "./E-Office/TopMenu";
import MobileTopMenu from "./E-Office/MobileTopMenu";

class OfficePageHeader extends React.Component {
    state = {
        openFile: false,
        openDesk: false,
        openReceipt: false,
        openApplication: false,
        anchorEl: null
    };

    handleLinkClick  = (link) => {
        const { history } = this.props;
        history.push(link);
    };

    handleDrawerToggle = () => {
        this.setState({open: !this.state.open});
    };

    activeRoute (routeName) {
        return this.props.location.pathname.indexOf(routeName) > -1 ? true : false;
    };

    closeMenu = (e) => {
        this.setState({anchorEl: null, openFile: false, openReceipt: false, openApplication: false});
    };

    render() {
        const {classes, color} = this.props;
        const {anchorEl} = this.state;
        const appBarClasses = cx({
            [" " + classes[color]]: color
        });

        return (
            <AppBar position="fixed" color={"inherit"}>
                <Toolbar>
                    <Hidden mdUp>
                        <div className={classes.flex}>
                            <Button href="#" className={classes.title} color="transparent">
                                AMC-OFFICE
                            </Button>
                        </div>
                    </Hidden>
                    <Hidden smDown>
                        <GridContainer justify={"space-between"}>
                            <TopMenu routes={OfficeRoutes} linkClick={this.handleLinkClick}/>
                        </GridContainer>
                    </Hidden>
                    <Hidden mdUp>
                        <IconButton
                            className={classes.sidebarButton}
                            justIcon
                            aria-label="open drawer"
                            onClick={this.handleDrawerToggle}
                        >
                            <MenuIcon/>
                        </IconButton>
                    </Hidden>
                    <Hidden mdUp>
                        <Hidden mdUp>
                            <Drawer
                                variant="temporary"
                                anchor={"right"}
                                open={this.state.open}
                                classes={{
                                    paper: classes.drawerPaper
                                }}
                                onClose={this.handleDrawerToggle}
                                ModalProps={{
                                    keepMounted: true // Better open performance on mobile.
                                }}
                            >
                                <MobileTopMenu classes={classes}/>
                            </Drawer>
                        </Hidden>
                    </Hidden>
                </Toolbar>
            </AppBar>
        );
    }
}

OfficePageHeader.propTypes = {
    classes: PropTypes.object.isRequired,
    color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"])
};


/*handleMenuItem = (event) => {
    const {name} = event;
    const {history} = this.props;

    switch (name) {
        case "new-file":
            history.push("/e-office/file/new");
            break;
        case "created-file":
            history.push("/e-office/file/created");
            break;
        case "sent-file":
            history.push("/e-office/file/sent");
            break;
        case "new-receipt":
            history.push("/e-office/receipt/new");
            break;
        case "created-receipt":
            history.push("/e-office/receipt/created");
            break;
        case "sent-receipt":
            history.push("/e-office/receipt/sent");
            break;
        case "obpas":
            history.push(OfficeRoutes.OBPAS);
            break;
        case "hoardings":
            history.push(OfficeRoutes.OBPAS);
            break;
        case "":
            history.push(OfficeRoutes.OBPAS);
            break;
        case "obpas":
            history.push(OfficeRoutes.OBPAS);
            break;
        default:
            break;
    }
};*/

/*handleMenu = (event) => {
    const name = event.target.name;
    this.setState({anchorEl: event.currentTarget});
    switch (name) {
        case "file":
            this.setState({openFile: true});
            break;
        case "receipt":
            this.setState({openReceipt: true});
            break;
        case "application":
            this.setState({openApplication: true});
            break;
        default:
            break;
    }
};*/

/*handleDesk = (e) => {
    const {history} = this.props;
    history.push("/e-office/desk");
};*/

/*handleFile = (e) => {
    const {history} = this.props;
    switch (e) {
        case "Create New":
            history.push(OfficeRoutes.NEW_FILE);
            break;
        case "List Created":
            history.push(OfficeRoutes.CREATED_FILES);
            break;
        case "List Sent":
            history.push(OfficeRoutes.SENT_FILE);
            break;
        default:
            break;

    }
};*/

/*handleReceipt = (e) => {
    const {history} = this.props;
    switch (e) {
        case "Create New":
            history.push(OfficeRoutes.NEW_RECEIPT);
            break;
        case "List Created":
            history.push(OfficeRoutes.CREATED_RECEIPT);
            break;
        case "List Sent":
            history.push(OfficeRoutes.SENT_RECEIPT);
            break;
        default:
            break;

    }
};*/

/*handleReport = (e) => {
    console.log(e);
};*/

/*handleApplication = (e) => {
    const {history} = this.props;
    switch (e) {
        case "OBPAS":
            history.push(OfficeRoutes.OBPAS);
            break;
        case "Hoarding":
            history.push(OfficeRoutes.HOARDINGS);
            break;
        case "Shop Licensing":
            history.push(OfficeRoutes.SHOP_LICENSES);
            break;
        case "Kiosk":
            history.push(OfficeRoutes.KIOSKS);
            break;
        case "Banners":
            history.push(OfficeRoutes.BANNERS);
            break;
        case "Advertiser":
            history.push(OfficeRoutes.ADVERTISERS);
            break;
        default:
            break;

    }
};*/

/* handleUser = (e) => {

 };*/


export default withRouter(withStyles(pagesHeaderStyle)(OfficePageHeader));
