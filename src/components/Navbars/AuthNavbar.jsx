import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import {NavLink} from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
import PersonAdd from "@material-ui/icons/PersonAdd";
import LoginIcon from "@material-ui/icons/ArrowRight";

import Home from "@material-ui/icons/Home";
import authNavbarStyle from "assets/jss/material-dashboard-pro-react/components/authNavbarStyle.jsx";
import { Button, Fab } from "@material-ui/core";

// core components

class AuthNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    handleDrawerToggle = () => {
        this.setState({open: !this.state.open});
    };

    // verifies if routeName is the one active (in browser input)
    activeRoute(routeName) {
        return this.props.location.pathname.indexOf(routeName) > -1 ? true : false;
    }

    componentDidUpdate(e) {
        if (e.history.location.pathname !== e.location.pathname) {
            this.setState({open: false});
        }
    }

    render() {
        const {classes, color, brandText, OfficeRoutes, history} = this.props;

        var list = (
            <List className={classes.list}>
                <ListItem className={classes.listItem}>
                    <NavLink to={"/home"} className={classes.navLink}>
                        <Home className={classes.listItemIcon}/>
                        <ListItemText
                            primary={"Home"}
                            disableTypography={true}
                            className={classes.listItemText}
                        />
                    </NavLink>
                </ListItem>

                {/*<ListItem className={classes.listItem}>*/}
                {/*    <NavLink*/}
                {/*        to={OfficeRoutes.APPLY_ADVERTISER}*/}
                {/*        className={cx(classes.navLink, {*/}
                {/*            [classes.navLinkActive]: this.activeRoute(OfficeRoutes.APPLY_ADVERTISER)*/}
                {/*        })}*/}
                {/*    >*/}
                {/*        <PersonAdd className={classes.listItemIcon}/>*/}
                {/*        <ListItemText*/}
                {/*            primary={"Register Advertiser"}*/}
                {/*            disableTypography={true}*/}
                {/*            className={classes.listItemText}*/}
                {/*        />*/}
                {/*    </NavLink>*/}
                {/*</ListItem>*/}

                <ListItem className={classes.listItem}>
                    <NavLink
                        to={OfficeRoutes.E_OFFICE}
                        className={cx(classes.navLink, {
                            [classes.navLinkActive]: this.activeRoute(OfficeRoutes.E_OFFICE)
                        })}
                    >
                        <Home className={classes.listItemIcon}/>
                        <ListItemText
                            primary={"E-Office"}
                            disableTypography={true}
                            className={classes.listItemText}
                        />
                    </NavLink>
                </ListItem>

                <Fab  onClick={(e) => history.push(OfficeRoutes.ADVERTISER_LOGIN)}
                        style={{marginleft: 10, paddingLeft: 20, paddingRight: 20}} size={"large"} color={"primary"}
                        variant={"extended"}>
                    Login <LoginIcon fontSize={"small"}/>
                </Fab>

            </List>
        );
        return (
            <AppBar elevation={5} position="static" color={"primary"}>
                <Toolbar variant={"regular"}>
                    <Hidden smDown>
                        <div className={classes.flex}>
                            <Button href="#" className={classes.title} color="inherit">
                                {brandText}
                            </Button>
                        </div>
                    </Hidden>
                    <Hidden mdUp>
                        <div className={classes.flex}>
                            <Button href="#" className={classes.title} color="inherit">
                                AIZAWL MUNICIPAL CORP0RATION
                            </Button>
                        </div>
                    </Hidden>
                    <Hidden smDown>{list}</Hidden>
                    <Hidden mdUp>
                        <Button
                            className={classes.sidebarButton}
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.handleDrawerToggle}
                        >
                            <Menu/>
                        </Button>
                    </Hidden>
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
                            {list}
                        </Drawer>
                    </Hidden>
                </Toolbar>
            </AppBar>
        );
    }
}

AuthNavbar.propTypes = {
    classes: PropTypes.object.isRequired,
    color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
    brandText: PropTypes.string
};

export default  withStyles(authNavbarStyle)(AuthNavbar);
