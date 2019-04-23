import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import {NavLink, withRouter} from "react-router-dom";

// @material-ui/core components
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import {withStyles} from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import { Grid, LinearProgress } from "@material-ui/core";

// core components
import {IconButton} from "@material-ui/core";
import Button from "../CustomButtons/Button";

import * as OfficeRoutes from "../../config/routes-constant/OfficeRoutes";
import TopMenu from "./E-Office/TopMenu";
import MobileTopMenu from "./E-Office/MobileTopMenu";

const styles = theme => {

};

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
        const {classes, color,loading} = this.props;
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
                        <Grid container justify={"space-between"}>
                            <TopMenu routes={OfficeRoutes} linkClick={this.handleLinkClick}/>
                        </Grid>
                    </Hidden>
                    <Hidden mdUp>
                        <IconButton
                            className={classes.sidebarButton}
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
                {
                    loading ? <LinearProgress color={"primary"} variant={"indeterminate"}/> : undefined
                }
            </AppBar>
        );
    }
}

OfficePageHeader.propTypes = {
    classes: PropTypes.object.isRequired,
    color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"])
};

export default withRouter(withStyles(styles)(OfficePageHeader));
