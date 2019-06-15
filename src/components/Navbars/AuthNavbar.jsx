import React from "reactn";
import cx from "classnames";
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
import { Button, Fab, LinearProgress } from "@material-ui/core";
import { LOGIN, ROOT, APPLY_ADVERTISER } from "../../config/routes-constant/OfficeRoutes";

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
    const { classes, brandText, OfficeRoutes, history, loading } = this.props;
    const currentUser = JSON.parse(localStorage.getItem("current_user"));
    const linkLogin = (
      <Fab onClick={(e) => history.push(OfficeRoutes.ADVERTISER_LOGIN)}
           style={{ marginleft: 10, paddingLeft: 20, paddingRight: 20 }} size={"large"} color={"primary"}
           variant={"extended"}>
        Login <LoginIcon fontSize={"small"}/>
      </Fab>
    );
    const linkLogout = (
      <Fab onClick={(e) => history.push(OfficeRoutes.LOGOUT_ROUTE)}
           style={{ marginleft: 10, paddingLeft: 20, paddingRight: 20 }} size={"large"} color={"primary"}
           variant={"extended"}>
        Logout <LoginIcon fontSize={"small"}/>
      </Fab>
    );
    const linkEOffice = (
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
    );

    let list = (
      <List className={classes.list}>
        <ListItem className={classes.listItem}>
          <NavLink to={"/"} className={classes.navLink}>
            <Home className={classes.listItemIcon}/>
            <ListItemText
              primary={"Home"}
              disableTypography={true}
              className={classes.listItemText}
            />
          </NavLink>
        </ListItem>
        <ListItem className={classes.listItem}>
          <NavLink to={APPLY_ADVERTISER} className={classes.navLink}>
            <Person className={classes.listItemIcon}/>
            <ListItemText
                primary={"Advertiser Registration"}
                disableTypography={true}
                className={classes.listItemText}
            />
          </NavLink>
        </ListItem>
        {currentUser ? linkEOffice : ""}
        {currentUser ? linkLogout : linkLogin}
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
            {
              this.state.showLogin ?
                <Button
                  className={classes.sidebarButton}
                  color="inherit"
                  aria-label="open home"
                  onClick={e => {
                    history.push(ROOT);
                    this.setState({ showLogin: false });
                  }}
                >
                  HOME
                </Button>
                :
                <Button
                  className={classes.sidebarButton}
                  color="inherit"
                  aria-label="open login"
                  onClick={e => {
                    history.push(LOGIN);
                    this.setState({ showLogin: true });
                  }}
                >
                  Login
                </Button>
            }

          </Hidden>
        </Toolbar>
        {
          this.global.loading ? <LinearProgress variant={"indeterminate"} color={"secondary"}/> : undefined
        }
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
