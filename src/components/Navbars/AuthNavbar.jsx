import React from "reactn";
import PropTypes from "prop-types";
import { NavLink, withRouter } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
// @material-ui/icons
import LoginIcon from "@material-ui/icons/ArrowRight";

import Home from "@material-ui/icons/Home";
import Person from "@material-ui/icons/PersonAdd";

import authNavbarStyle from "assets/jss/material-dashboard-pro-react/components/authNavbarStyle.jsx";
import { Button, Fab, Icon, LinearProgress } from "@material-ui/core";
import {
  APPLY_ADVERTISER,
  LOGIN,
  ROOT
} from "../../config/routes-constant/OfficeRoutes";
import IconButton from "@material-ui/core/IconButton";

// core components

class AuthNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      showLogin: false
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
    const { classes, brandText, history, onMenuClick } = this.props;
    // const currentUser = JSON.parse(localStorage.getItem("current_user"));

    // const linkEOffice = (
    //   <ListItem className={classes.listItem}>
    //     <NavLink
    //       to={OfficeRoutes.E_OFFICE}
    //       className={cx(classes.navLink, {
    //         [classes.navLinkActive]: this.activeRoute(OfficeRoutes.E_OFFICE)
    //       })}
    //     >
    //       <Home className={classes.listItemIcon}/>
    //       <ListItemText
    //         primary={"E-Office"}
    //         disableTypography={true}
    //         className={classes.listItemText}
    //       />
    //     </NavLink>
    //   </ListItem>
    // );

    let list = (
      <List className={classes.list}>
        <ListItem className={classes.listItem}>
          <NavLink to={"/"} className={classes.navLink}>
            <Home className={classes.listItemIcon} />
            <ListItemText
              primary={"Home"}
              disableTypography={true}
              className={classes.listItemText}
            />
          </NavLink>
        </ListItem>
        <ListItem className={classes.listItem}>
          <NavLink to={APPLY_ADVERTISER} className={classes.navLink}>
            <Person className={classes.listItemIcon} />
            <ListItemText
              primary={"Advertiser Registration"}
              disableTypography={true}
              className={classes.listItemText}
            />
          </NavLink>
        </ListItem>
      </List>
    );
    return (
      <AppBar elevation={5} position="fixed" color={"primary"}>
        <Toolbar>
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
            <div>
              <IconButton
                href={"#"}
                onClick={event => history.push(APPLY_ADVERTISER)}
              >
                <Icon className={classes.menuIcon}>person</Icon>
              </IconButton>
            </div>
          </Hidden>
          <Hidden smDown>{list}</Hidden>
          <Hidden only={["md", "lg", "xl"]}>
            <IconButton onClick={event => onMenuClick()}>
              <Icon className={classes.menuIcon}>menu</Icon>
            </IconButton>
          </Hidden>
          <Hidden only={["sm", "xs"]}>
            {this.state.showLogin ? (
              <Fab
                onClick={e => {
                  history.push(ROOT);
                  this.setState({ showLogin: false });
                }}
                style={{ marginleft: 10, paddingLeft: 20, paddingRight: 20 }}
                size={"large"}
                color={"primary"}
                variant={"extended"}
              >
                Home <Icon fontSize={"small"}>home</Icon>
              </Fab>
            ) : (
              <Fab
                onClick={e => {
                  history.push(LOGIN);
                  this.setState({ showLogin: true });
                }}
                style={{ marginleft: 10, paddingLeft: 20, paddingRight: 20 }}
                size={"large"}
                color={"primary"}
                variant={"extended"}
              >
                Login <LoginIcon fontSize={"small"} />
              </Fab>
            )}
          </Hidden>
        </Toolbar>
        {this.global.loading ? (
          <LinearProgress variant={"indeterminate"} color={"secondary"} />
        ) : (
          undefined
        )}
      </AppBar>
    );
  }
}

AuthNavbar.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  brandText: PropTypes.string
};

export default withRouter(withStyles(authNavbarStyle)(AuthNavbar));
