import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

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
import Dashboard from "@material-ui/icons/Dashboard";
import Menu from "@material-ui/icons/Menu";
import PersonAdd from "@material-ui/icons/PersonAdd";
import Fingerprint from "@material-ui/icons/Fingerprint";
import LockOpen from "@material-ui/icons/LockOpen";
import MonetizationOn from "@material-ui/icons/MonetizationOn";
import Home from "@material-ui/icons/Home";

// core components
import Button from "components/CustomButtons/Button";

import authNavbarStyle from "assets/jss/material-dashboard-pro-react/components/authNavbarStyle.jsx";
import {OfficeRoutes} from "../../config/routes-constant/OfficeRoutes";

class AuthNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }
  handleDrawerToggle = () => {
    this.setState({ open: !this.state.open });
  };
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? true : false;
  }
  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.setState({ open: false });
    }
  }
  render() {
    const { classes, color, brandText, OfficeRoutes } = this.props;
    const appBarClasses = cx({
      [" " + classes[color]]: color
    });
    var list = (
      <List className={classes.list}>
        <ListItem className={classes.listItem}>
          <NavLink to={"/home"} className={classes.navLink}>
            <Home className={classes.listItemIcon} />
            <ListItemText
                primary={"Home"}
                disableTypography={true}
                className={classes.listItemText}
            />
          </NavLink>
        </ListItem>
        <ListItem className={classes.listItem}>
          <NavLink to={"/e-office"} className={classes.navLink}>
            <Dashboard className={classes.listItemIcon} />
            <ListItemText
              primary={"Dashboard"}
              disableTypography={true}
              className={classes.listItemText}
            />
          </NavLink>
        </ListItem>
        <ListItem className={classes.listItem}>
          <NavLink
            to={"/faq"}
            className={cx(classes.navLink, {
              [classes.navLinkActive]: this.activeRoute("/faq")
            })}
          >
            <MonetizationOn className={classes.listItemIcon} />
            <ListItemText
              primary={"FAQ"}
              disableTypography={true}
              className={classes.listItemText}
            />
          </NavLink>
        </ListItem>
        <ListItem className={classes.listItem}>
          <NavLink
            to={"/staff/new"}
            className={cx(classes.navLink, {
              [classes.navLinkActive]: this.activeRoute("/staff/new")
            })}
          >
            <PersonAdd className={classes.listItemIcon} />
            <ListItemText
              primary={"Register Staff"}
              disableTypography={true}
              className={classes.listItemText}
            />
          </NavLink>
        </ListItem>
        <ListItem className={classes.listItem}>
          <NavLink
            to={OfficeRoutes.APPLY_ADVERTISER}
            className={cx(classes.navLink, {
              [classes.navLinkActive]: this.activeRoute(OfficeRoutes.APPLY_ADVERTISER)
            })}
          >
            <PersonAdd className={classes.listItemIcon} />
            <ListItemText
              primary={"Register Advertiser"}
              disableTypography={true}
              className={classes.listItemText}
            />
          </NavLink>
        </ListItem>
        <ListItem className={classes.listItem}>
          <NavLink
            to={"/login"}
            className={cx(classes.navLink, {
              [classes.navLinkActive]: this.activeRoute("/login")
            })}
          >
            <Fingerprint className={classes.listItemIcon} />
            <ListItemText
              primary={"Login"}
              disableTypography={true}
              className={classes.listItemText}
            />
          </NavLink>
        </ListItem>
        <ListItem className={classes.listItem}>
          <NavLink
            to={"/auth/lock-screen-page"}
            className={cx(classes.navLink, {
              [classes.navLinkActive]: this.activeRoute(
                "/auth/lock-screen-page"
              )
            })}
          >
            <LockOpen className={classes.listItemIcon} />
            <ListItemText
              primary={"Lock"}
              disableTypography={true}
              className={classes.listItemText}
            />
          </NavLink>
        </ListItem>
      </List>
    );
    return (
      <AppBar position="static" className={classes.appBar + appBarClasses}>
        <Toolbar className={classes.container}>
          <Hidden smDown>
            <div className={classes.flex}>
              <Button href="#" className={classes.title} color="transparent">
                {brandText}
              </Button>
            </div>
          </Hidden>
          <Hidden mdUp>
            <div className={classes.flex}>
              <Button href="#" className={classes.title} color="transparent">
                AMC
              </Button>
            </div>
          </Hidden>
          <Hidden smDown>{list}</Hidden>
          <Hidden mdUp>
            <Button
              className={classes.sidebarButton}
              color="transparent"
              justIcon
              aria-label="open drawer"
              onClick={this.handleDrawerToggle}
            >
              <Menu />
            </Button>
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
                {list}
              </Drawer>
            </Hidden>
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

export default withStyles(authNavbarStyle)(AuthNavbar);
