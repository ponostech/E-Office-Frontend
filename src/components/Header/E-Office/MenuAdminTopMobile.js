import React from "react";
import { Icon } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
// @material-ui/icons
import Assessment from "@material-ui/icons/Assessment";
import * as OfficeRoute from "../../../config/routes-constant/OfficeRoutes";
import { LoginService } from "../../../services/LoginService";
import withStyles from "@material-ui/core/es/styles/withStyles";
import PropTypes from "prop-types";

const styles = theme => ({
  root: {
    padding: 8,
    display: "flex",
    alignItems: "stretch",
    flexDirection: "column",
    minWidth: 350,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  }
});

class MenuAdminTopMobile extends React.Component {
  state = {
    menuItems: [
      {
        name: "file", open: false, icon: "close", label: "File", menus: [
          { name: "New File", icon: "check", route: OfficeRoute.NEW_FILE },
          { name: "Created File", icon: "check", route: OfficeRoute.NEW_FILE },
          { name: "Sent File", icon: "check", route: OfficeRoute.NEW_FILE },
          { name: "Closed File", icon: "check", route: OfficeRoute.NEW_FILE }
        ]
      }, {
        name: "receipt", open: false, icon: "close", label: "Receipt", menus: [
          { name: "New Receipt", open: false, route: OfficeRoute.NEW_RECEIPT },
          { name: "List of new receipt", open: false, route: OfficeRoute.RECEIPT_NEW_LIST }
        ]
      }, {
        name: "hoarding", open: false, icon: "close", label: "Hoarding Application", menus: [
          { name: "New Applications", open: false, route: OfficeRoute.NEW_HOARDINGS },
          { name: "Under-Process Applications", open: false, route: OfficeRoute.UNDER_PROCESS_HOARDINGS },
          { name: "Approved Applications", open: false, route: OfficeRoute.APPROVED_HOARDINGS },
          { name: "Rejected Applications", open: false, route: OfficeRoute.REJECTED_HOARDINGS }
        ]
      },{
            name: "shop", open: false, icon: "close", label: "Shop Applications", menus: [
                { name: "New Applications", open: false, route: OfficeRoute.NEW_SHOPLICENSE },
                { name: "Under-Process Applications", open: false, route: OfficeRoute.UNDER_PROCESS_SHOPLICENSE },
                { name: "Sent Back Applications", open: false, route: OfficeRoute.SENT_BACK_SHOPLICENSE },
                { name: "Resubmitted Applications", open: false, route: OfficeRoute.RE_SUBMIT_SHOPLICENSE },
                { name: "Cancelled Applications", open: false, route: OfficeRoute.CANCELLED_SHOPLICENSE },
                { name: "Approved Applications", open: false, route: OfficeRoute.APPROVED_SHOPLICENSE },
                { name: "Rejected Applications", open: false, route: OfficeRoute.REJECTED_SHOPLICENSE }
            ]
        }
    ]
  };

  expandMenuItem = (index) => {
    const { menuItems } = this.state;
    let selectedItem = menuItems[index];
    selectedItem.open = !selectedItem.open;
    menuItems[index] = selectedItem;
    this.setState({ menuItems });

  };

  render() {
    const { menuItems } = this.state;
    const { classes, history, closeDrawer } = this.props;
    return (
      <List className={classes.root}>
        {
          menuItems.map((item, i) =>
            <>
              <ListItem key={i} name={item.name} button onClick={event => this.expandMenuItem(i)}>
                <ListItemIcon>
                  <Icon color={"action"} fontSize={"small"}>{item.icon}</Icon>
                </ListItemIcon>
                <ListItemText inset primary={item.label}/>
                {item.open ? <ExpandLess/> : <ExpandMore/>}
              </ListItem>
              {
                item.menus.map((nested, index) =>
                  <Collapse key={index} in={item.open} timeout="auto" unmountOnExit>
                    <List>
                      <NavLink to={nested.route}>
                        <ListItem onClick={event => closeDrawer()} className={classes.nested}>
                          <ListItemText inset primary={nested.name}/>
                        </ListItem>
                      </NavLink>
                    </List>
                  </Collapse>
                )
              }

            </>
          )
        }

        <ListItem onClick={e =>
          new LoginService().logout(error => console.log("error"), success => history.push(OfficeRoute.LOGIN))}
                  className={classes.listItem}>
          <ListItemIcon className={classes.listItemIcon}>
            <Assessment/>
          </ListItemIcon>
          <ListItemText
            primary={"Log out"}
            disableTypography={true}
            className={classes.listItemText}
          />
        </ListItem>

      </List>
    );
  }
}

MenuAdminTopMobile.propTypes = {
  closeDrawer: PropTypes.func.isRequired
};

export default withStyles(styles)(MenuAdminTopMobile);
