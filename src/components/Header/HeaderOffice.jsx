import React from "react";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
// @material-ui/core components
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import {withStyles} from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
// core components
import {Grid, IconButton, LinearProgress} from "@material-ui/core";
import Button from "../CustomButtons/Button";
import MenuAdminTop from "./E-Office/MenuAdminTop";
import MenuOfficerTop from "./E-Office/MenuOfficerTop";
import MenuInspectorTop from "./E-Office/MenuInspectorTop";
import MenuClerkTop from "./E-Office/MenuClerkTop";
import MenuAdminTopMobile from "./E-Office/MenuAdminTopMobile";
import {LoginService} from "../../services/LoginService";

const styles = {
    drawerPaper: {
        width: "60%",
    },
};

class HeaderOffice extends React.Component {
    state = {
        open: false
    };

    handleLinkClick = (link) => {
        const {history} = this.props;
        history.push(link);
    };

    handleDrawerToggle = () => {
        this.setState({open: !this.state.open});
    };

    render() {
        const {classes, loading} = this.props;
        let menu = null;
        let role = LoginService.getRole();

        switch (role) {
            case 'administrator':
                menu = <MenuAdminTop linkClick={this.handleLinkClick}/>;
                break;
            case 'officer':
                menu = <MenuOfficerTop linkClick={this.handleLinkClick}/>;
                break;
            case 'inspector':
                menu = <MenuInspectorTop linkClick={this.handleLinkClick}/>;
                break;
            case 'clerk':
                menu = <MenuClerkTop linkClick={this.handleLinkClick}/>;
                break;
            default:
                menu = <p>Menu not Found!</p>;
                break;
        }

        return (
            <AppBar position="fixed" color={"inherit"}>
                <Toolbar>
                    <Hidden mdUp>
                        <div style={{flex: 1}}>
                            <Button href="#" color="transparent">
                                E-AMC-OFFICE
                            </Button>
                        </div>
                    </Hidden>
                    <Hidden smDown>
                        <Grid container justify={"space-between"}>
                            {menu}
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
                                    keepMounted: true
                                }}
                            >
                                <MenuAdminTopMobile closeDrawer={() => this.setState({open: false})} classes={classes}/>
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

HeaderOffice.propTypes = {
    classes: PropTypes.object.isRequired,
    color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"])
};

export default withRouter(withStyles(styles)(HeaderOffice));
